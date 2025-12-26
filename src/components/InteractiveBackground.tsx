import { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Neural Particles - BOLDER & FIXED CONFIGURATION
        const particles: Particle[] = [];
        const particleCount = Math.floor((width * height) / 12000); // 20% Denser
        const connectionDistance = 180;
        const mouseDistance = 350;

        let mouse = { x: -1000, y: -1000 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseAlpha: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8; // Faster float
                this.vy = (Math.random() - 0.5) * 0.8;
                this.size = Math.random() * 2.5 + 1.5; // Larger: 1.5px - 4px
                this.baseAlpha = Math.random() * 0.4 + 0.2; // Higher base opacity: 0.2 - 0.6
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(43, 82, 136, ${this.baseAlpha})`; // Olynk Blue
                ctx.fill();
            }
        }

        // Initialize
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles first
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw Connections (The Neural Mesh)
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                // Check distance to mouse
                const dxMouse = mouse.x - p1.x;
                const dyMouse = mouse.y - p1.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                // Highlight particle if near mouse
                if (distMouse < mouseDistance) {
                    ctx.beginPath();
                    ctx.arc(p1.x, p1.y, p1.size * 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(43, 82, 136, ${0.8 - (distMouse / mouseDistance) * 0.5})`;
                    ctx.fill();
                }

                // Connect particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        // Opacity based on distance
                        let alpha = 1 - (distance / connectionDistance);

                        // Line style
                        ctx.lineWidth = 1.5; // Bolder lines

                        // Mouse proximity boost
                        if (distMouse < mouseDistance) {
                            alpha += 0.5; // Signifcant opacity boost
                            ctx.lineWidth = 2.5; // Thicker lines near interaction
                        }

                        // Cap alpha to prevent harshness
                        if (alpha > 0.85) alpha = 0.85;

                        // Draw line
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(43, 82, 136, ${alpha * 0.4})`; // Higher visibility
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        // Event Listeners
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-init on resize could be added here for perfect responsiveness
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            // IMPORTANT: e.clientY is relative to viewport. 
            // Since canvas is fixed, this matches perfectly. 
            // DO NOT ADD window.scrollY.
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        // FIXED POSITION: Stays put relative to viewport
        // INSET-0: Covers entire screen
        // POINTER-EVENTS-NONE: Allows clicking through to content
        <div className="fixed inset-0 bg-beige overflow-hidden pointer-events-none z-0">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-beige via-transparent to-[rgba(43,82,136,0.03)]" />

            {/* The Canvas Mesh */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        </div>
    );
};

export default InteractiveBackground;
