import { useEffect, useRef } from 'react';

/**
 * Full-viewport moving network (nodes + proximity lines). Renders on canvas only
 * — no extra gradient/HTML layers. Exposed defaults so design can tune look & perf.
 */
export const networkVisualDefaults = {
    /** Solid fill behind the mesh (brand cream) */
    backgroundColor: '#F3EAE0',
    /** RGB components for lines and dots: --olynk #2B5288 */
    strokeRgb: '43, 82, 136',
    /** 0 = derive from viewport area */
    particleCount: 0,
    maxParticles: 140,
    minParticles: 48,
    /** Pixels (CSS px); larger = more edges */
    connectionDistance: 155,
    /** Multiplier for drift velocity */
    baseSpeed: 0.42,
    maxLineOpacity: 0.2,
    nodeRadius: 1.6,
} as const;

type Particle = { x: number; y: number; vx: number; vy: number };

const InteractiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cfg = networkVisualDefaults;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let dpr = Math.min(window.devicePixelRatio ?? 1, 2);
        let particles: Particle[] = [];
        let mouse = { x: -1e6, y: -1e6 };

        const particleCount = () => {
            if (cfg.particleCount > 0) {
                return Math.min(cfg.particleCount, cfg.maxParticles);
            }
            const area = width * height;
            const n = Math.floor(area / 16500);
            return Math.min(cfg.maxParticles, Math.max(cfg.minParticles, n));
        };

        const initParticles = () => {
            const n = particleCount();
            const next: Particle[] = [];
            const speedBase = cfg.baseSpeed;
            for (let i = 0; i < n; i++) {
                const angle = Math.random() * Math.PI * 2;
                const mag = speedBase * (0.35 + Math.random() * 0.65);
                next.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: Math.cos(angle) * mag,
                    vy: Math.sin(angle) * mag,
                });
            }
            particles = next;
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio ?? 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initParticles();
        };

        resize();

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const step = () => {
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x += width;
                if (p.x > width) p.x -= width;
                if (p.y < 0) p.y += height;
                if (p.y > height) p.y -= height;
            }
        };

        let raf = 0;

        const draw = () => {
            ctx.fillStyle = cfg.backgroundColor;
            ctx.fillRect(0, 0, width, height);

            const maxD = cfg.connectionDistance;
            const maxSq = maxD * maxD;
            const rgb = cfg.strokeRgb;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 > maxSq) continue;
                    const d = Math.sqrt(d2);
                    let opacity = (1 - d / maxD) * cfg.maxLineOpacity;

                    const mdx = mouse.x - a.x;
                    const mdy = mouse.y - a.y;
                    const md2 = mdx * mdx + mdy * mdy;
                    if (md2 < 220 * 220) {
                        opacity += (1 - Math.sqrt(md2) / 220) * 0.12;
                    }

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(${rgb}, ${Math.min(opacity, 0.45)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            ctx.fillStyle = `rgba(${rgb}, 0.55)`;
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, cfg.nodeRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const loop = () => {
            step();
            draw();
            raf = requestAnimationFrame(loop);
        };

        const paintStatic = () => {
            draw();
        };

        const onResize = () => {
            resize();
            if (reducedMotion) {
                paintStatic();
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);

        if (reducedMotion) {
            paintStatic();
        } else {
            loop();
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none z-0"
            aria-hidden
        >
            <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
        </div>
    );
};

export default InteractiveBackground;
