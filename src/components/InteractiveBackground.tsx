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

        let mouse = { x: -1000, y: -1000 };

        // Brand Palette (from Olynk Identity Board)
        const DEEP_BLUE = '43, 82, 136';   // #2B5288
        const INK_NAVY = '34, 49, 72';     // #223148
        const SAND = '210, 199, 184';      // #D2C7B8

        // Brand Strategy Themes (English words in Sanskrit font style)
        const profoundPhrases = ['PREDICT · EXPLAIN · ACT', 'GROW WITH CLARITY', 'INTELLIGENCE THAT EXPLAINS ITSELF'];
        const strategyWords = ['PREDICT', 'EXPLAIN', 'ACT', 'GROW', 'CLARITY', 'CONFIDENT', 'INTELLIGENCE', 'PRECISION', 'HUMAN', 'TRUTH'];

        // Causal Flow Network (Orbiting around the central Yantra)
        class OrbitNode {
            angle: number;
            radius: number;
            speed: number;
            word: string;
            size: number;
            color: string;
            hasText: boolean;
            x: number; 
            y: number;

            constructor() {
                this.angle = Math.random() * Math.PI * 2;
                // Place them outside the central mandala to form a visible ring network
                const minRadius = Math.min(width, height) * 0.35;
                this.radius = minRadius + Math.random() * (Math.max(width, height) * 0.5);
                this.speed = (Math.random() * 0.0006 + 0.0001) * (Math.random() > 0.5 ? 1 : -1);
                
                this.hasText = Math.random() > 0.6; // Only 40% have text to prevent overlapping
                this.word = strategyWords[Math.floor(Math.random() * strategyWords.length)];
                this.size = Math.random() * 6 + 10; // 10px - 16px
                this.color = Math.random() > 0.3 ? SAND : DEEP_BLUE;
                
                this.x = 0; 
                this.y = 0;
            }

            update(centerX: number, centerY: number) {
                this.angle += this.speed;
                this.x = centerX + Math.cos(this.angle) * this.radius;
                this.y = centerY + Math.sin(this.angle) * this.radius;
            }

            draw() {
                if (!ctx) return;
                
                // Mouse interaction - gentle illumination
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let alpha = this.color === SAND ? 0.7 : 0.4; 
                
                if (dist < 250) {
                    alpha += (1 - dist / 250) * 0.5; // Highlight near mouse
                }
                if (alpha > 0.9) alpha = 0.9;

                // Draw the physical network node (dot)
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.hasText ? 2.5 : 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${alpha})`;
                ctx.fill();

                // Draw the English word in Sanskrit-style font (Yatra One)
                if (this.hasText) {
                    ctx.font = `${this.size}px "Yatra One", cursive`;
                    ctx.fillStyle = `rgba(${this.color}, ${alpha})`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(this.word, this.x, this.y - 8);
                }
            }
        }

        // Giant Geometric Mantra Circle (Yantra) precisely in the middle
        class PrecisionYantra {
            x: number;
            y: number;
            rotation: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.rotation = 0;
            }

            update(centerX: number, centerY: number) {
                this.x = centerX;
                this.y = centerY;
                // Calm, precise rotation
                this.rotation += 0.0008; 
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                const baseRadius = Math.min(width, height) * 0.3;
                
                // Outer structural ring
                ctx.strokeStyle = `rgba(${SAND}, 0.4)`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
                ctx.stroke();

                // Inner intricate encasings (Vedic geometry with analytical precision)
                ctx.strokeStyle = `rgba(${DEEP_BLUE}, 0.08)`; 
                ctx.lineWidth = 1.2;
                
                for (let i = 0; i < 4; i++) {
                    const r = baseRadius * (0.3 + i * 0.2);
                    ctx.beginPath();
                    ctx.arc(0, 0, r, 0, Math.PI * 2);
                    ctx.stroke();

                    ctx.save();
                    // Counter rotating precision components
                    ctx.rotate(this.rotation * (i % 2 === 0 ? 1.5 : -1.5)); 
                    
                    // Kamar-Taj / Yantra intersecting squares
                    for (let j = 0; j < 4; j++) {
                        ctx.rotate(Math.PI / 4);
                        ctx.strokeRect(-r * 0.707, -r * 0.707, r * 1.414, r * 1.414);
                    }
                    ctx.restore();
                }

                // Inner Mantra ring using primary strategy phrases in Yatra One font
                ctx.font = `14px "Yatra One", cursive`;
                ctx.fillStyle = `rgba(${INK_NAVY}, 0.3)`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                const mantra = profoundPhrases.join(' · ') + ' · '; 
                // Dynamically fit the text
                const text = mantra.repeat(2);
                const r = baseRadius * 0.92;
                
                const chars = text.split('');
                for (let i = 0; i < chars.length; i++) {
                    ctx.save();
                    ctx.rotate((i / chars.length) * Math.PI * 2);
                    ctx.translate(0, -r);
                    ctx.fillText(chars[i], 0, 0);
                    ctx.restore();
                }

                ctx.restore();
            }
        }

        const nodes: OrbitNode[] = [];
        // Increased density to create a highly visible, interconnected web
        const nodeCount = Math.floor((width * height) / 12000); 
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new OrbitNode());
        }

        // Center exactly in the middle of the screen
        const yantra = new PrecisionYantra(width / 2, height / 2); 

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            yantra.update(centerX, centerY);
            yantra.draw();

            // Connect nearby orbiting nodes to form the causal network around the mantra circle
            for (let i = 0; i < nodes.length; i++) {
                const nodeA = nodes[i];
                nodeA.update(centerX, centerY);
                nodeA.draw();

                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeB = nodes[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Connect close nodes (Increased distance so the network is heavily connected)
                    if (dist < 220) {
                        const dxMouse = mouse.x - nodeA.x;
                        const dyMouse = mouse.y - nodeA.y;
                        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                        
                        // Higher base visibility for the network lines
                        let baseOpacity = (1 - dist / 220) * 0.25; 
                        if (distMouse < 250) {
                            baseOpacity += (1 - distMouse / 250) * 0.35; // Brightens when hovered
                        }

                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.strokeStyle = `rgba(${DEEP_BLUE}, ${baseOpacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Instantly re-center on resize
            yantra.x = width / 2;
            yantra.y = height / 2;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
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
        <div className="fixed inset-0 bg-[#F3EAE0] overflow-hidden pointer-events-none z-0">
            {/* Extremely subtle brand gradient using FOG and BONE */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E5E0D9] via-[#F3EAE0] to-[#E5E0D9] opacity-60" />
            
            {/* The Canvas Mesh */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        </div>
    );
};

export default InteractiveBackground;
