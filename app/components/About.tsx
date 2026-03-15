'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const domains = [
    {
        title: 'AI Systems',
        description: 'Machine learning pipelines, LSTM models, NLP systems, and applied AI architectures.',
    },
    {
        title: 'Algorithmic Trading',
        description: 'Signal engines, backtesting frameworks, ML-driven trading strategies.',
    },
    {
        title: 'Full-Stack Platforms',
        description: 'Production-grade web systems using Next.js, APIs, and scalable architectures.',
    },
    {
        title: 'Computer Vision',
        description: 'YOLO-based detection systems, OpenCV pipelines, real-time perception.',
    },
];

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
                            I build systems that
                            <br />
                            <span className="gradient-text">think</span>,{' '}
                            <span className="gradient-text">trade</span>, and{' '}
                            <span className="gradient-text">ship</span>.
                        </h2>

                        <div className="space-y-4 text-[var(--text-secondary)] text-base leading-relaxed">
                            <p>
                                I'm a B.Tech student focused on building real systems — not just studying them.
                            </p>

                            <p>
                                My work spans <span className="text-white font-medium">applied AI</span>,
                                <span className="text-white font-medium"> algorithmic trading</span>, and
                                <span className="text-white font-medium"> full-stack platforms</span>,
                                with an emphasis on scalable pipelines that process data, make decisions,
                                and execute reliably.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Engineering Domains */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {domains.map((domain, i) => (
                                <motion.div
                                    key={domain.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300"
                                >
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {domain.title}
                                    </h3>

                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                        {domain.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
