'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown, FiFileText } from 'react-icons/fi';
import { useRef } from 'react';
import ChatWindow from './ChatWindow';

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
            className="relative flex items-center justify-center min-h-screen overflow-hidden pt-20 pb-10 bg-black"
            id="home"
        >
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
                className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center hero-parallax-content"
                style={{ y, opacity, scale }}
            >
                {/* Left Column: Info */}
                <div className="flex flex-col items-start text-left shrink-0 w-full mx-auto lg:mx-0 pr-0 lg:pr-8">
                    {/* Name */}
                    <div className="mb-6 flex flex-col items-start w-full">
                        <h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] xl:text-[6vw] font-bold leading-[0.9] tracking-tighter text-white">
                            <SplitText text="SHAIK" className="block" />
                            <SplitText text="IMAD" className="block gradient-text mt-1" />
                            <SplitText text="UDDIN" className="block gradient-text mt-1" />
                        </h1>
                    </div>

                    {/* Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-4"
                    >
                        <p className="text-sm md:text-base lg:text-lg font-light tracking-widest text-[var(--text-secondary)] uppercase"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            <span className="whitespace-nowrap">Applied AI</span>
                            <span className="inline-block mx-2 md:mx-3 w-1 h-1 rounded-full bg-[var(--accent-violet)] align-middle" />
                            <span className="whitespace-nowrap">Software Systems</span>
                            <span className="inline-block mx-2 md:mx-3 w-1 h-1 rounded-full bg-[var(--accent-indigo)] align-middle" />
                            <span className="whitespace-nowrap">Full-Stack Dev</span>
                        </p>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex gap-4 mt-10 md:mt-12"
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
                        <a
                            href="/Resume_Imad.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Resume"
                            className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-violet)] hover:border-[var(--accent-violet)]/30 hover:bg-[var(--accent-violet)]/5 transition-all duration-300"
                        >
                            <FiFileText size={20} />
                        </a>
                    </motion.div>
                </div>

                {/* Right Column: Chatbot */}
                <motion.div
                    className="w-full flex justify-center mt-10 lg:mt-0"
                    initial={{ opacity: 0, x: 20, rotateY: 10 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
                    style={{ perspective: '1000px' }}
                >
                    <ChatWindow />
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] text-[10px] md:text-xs uppercase tracking-[0.2em] z-20 hidden md:flex"
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
                    <FiArrowDown size={14} />
                </motion.div>
            </motion.div>
        </section>
    );
}
