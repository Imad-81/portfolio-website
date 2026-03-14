'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
    { value: 7, suffix: '+', label: 'Projects Shipped' },
    { value: 13, suffix: '', label: 'Person Team Led' },
    { value: 90, suffix: '%+', label: 'Academic Score' },
    { value: 2, suffix: 'nd', label: 'Semester, B.Tech' },
];

function AnimatedCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const timeout = setTimeout(() => {
            const duration = 1500;
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * value));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, delay);
        return () => clearTimeout(timeout);
    }, [isInView, value, delay]);

    return (
        <div ref={ref} className="text-center md:text-left">
            <div className="text-4xl md:text-5xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {count}
                <span className="gradient-text">{suffix}</span>
            </div>
            <div className="text-sm text-[var(--text-secondary)] tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
                {label}
            </div>
        </div>
    );
}

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section" id="about" ref={ref}>
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Narrative */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span
                            className="block text-xs text-[var(--text-muted)] tracking-widest uppercase mb-4"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            About
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-tight">
                            I build systems that{' '}
                            <span className="gradient-text">think, trade,</span>{' '}
                            and{' '}
                            <span className="gradient-text">ship.</span>
                        </h2>
                        <div className="space-y-4 text-[var(--text-secondary)] text-base leading-relaxed">
                            <p>
                                I&apos;m a B.Tech student who doesn&apos;t just study tech — I build production-grade systems with it. 
                                From ML-powered trading bots processing 200MB+ datasets to full-stack SaaS applications 
                                serving real users, I treat every project like a product.
                            </p>
                            <p>
                                My core focus lies at the intersection of{' '}
                                <span className="text-white font-medium">applied AI</span>,{' '}
                                <span className="text-white font-medium">algorithmic trading</span>, and{' '}
                                <span className="text-white font-medium">software engineering</span>.
                                I think in systems, build in iterations, and optimize for performance at every layer.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-2 gap-8">
                            {stats.map((stat, i) => (
                                <div key={stat.label} className="glass-card p-6">
                                    <AnimatedCounter
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        label={stat.label}
                                        delay={i * 150}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
