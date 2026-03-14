'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import { useRef } from 'react';

const letterVariants: Variants = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: i * 0.04,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

function SplitText({ text, className }: { text: string; className?: string }) {
    return (
        <span className={className} style={{ display: 'inline-block', overflow: 'hidden', perspective: '500px' }}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                        transformOrigin: 'bottom',
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    return (
        <section
            ref={containerRef}
            className="relative flex items-center justify-center min-h-screen overflow-hidden"
            id="home"
        >
            {/* Animated Gradient Mesh Background */}
            <div className="hero-gradient-mesh" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <motion.div
                className="relative z-10 text-center flex flex-col items-center justify-center w-full max-w-[90vw]"
                style={{ y, opacity, scale }}
            >
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-10"
                >
                    <span className="status-badge">
                        <span className="pulse-dot" />
                        Open to Opportunities
                    </span>
                </motion.div>

                {/* Name */}
                <div className="mb-6 flex flex-col items-center">
                    <h1 className="text-[11vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter text-white">
                        <SplitText text="SHAIK " className="block" />
                        <SplitText text="IMAD UDDIN" className="block gradient-text" />
                    </h1>
                </div>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-4"
                >
                    <p className="text-base md:text-xl font-light tracking-widest text-[var(--text-secondary)] uppercase"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Applied AI
                        <span className="inline-block mx-3 w-1 h-1 rounded-full bg-[var(--accent-violet)] align-middle" />
                        Software Systems
                        <span className="inline-block mx-3 w-1 h-1 rounded-full bg-[var(--accent-indigo)] align-middle" />
                        Full-Stack Dev
                    </p>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    className="flex gap-4 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                >
                    <a
                        href="https://github.com/Imad-81"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                    >
                        <FiGithub size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/shaik-imaduddin-a79887390/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[#0077b5] hover:border-[#0077b5]/30 hover:bg-[#0077b5]/5 transition-all duration-300"
                    >
                        <FiLinkedin size={20} />
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{ fontFamily: 'var(--font-mono)' }}
            >
                <span>Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <FiArrowDown size={16} />
                </motion.div>
            </motion.div>
        </section>
    );
}
