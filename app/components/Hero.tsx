'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import { useRef } from 'react';

const letterVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

function SplitText({ text, className }: { text: string; className?: string }) {
    return (
        <span className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
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

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="hero-section flex items-center justify-center min-h-screen relative overflow-hidden" id="home">
            <motion.div
                className="hero-content text-center z-10 flex flex-col items-center justify-center w-full max-w-[90vw]"
                style={{ y, opacity }}
            >
                <div className="mb-8 flex flex-col items-center">
                    {/* Massive Typography */}
                    <h1 className="text-[12vw] md:text-[9vw] font-bold leading-[0.85] tracking-tighter text-white mix-blend-exclusion">
                        <SplitText text="SHAIK " className="block" />
                        <SplitText text="IMAD UDDIN" className="block" />
                    </h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-6"
                >
                    <p className="hero-tagline text-lg md:text-2xl font-light tracking-wide text-gray-300">
                        Systems Builder <span className="mx-2 text-indigo-500">//</span> ML Engineer <span className="mx-2 text-indigo-500">//</span> Algorithmic Trader
                    </p>
                </motion.div>

                <motion.div
                    className="hero-social flex gap-8 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <a href="https://github.com/Imad-81" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="magnetic-btn text-2xl md:text-3xl text-white hover:text-indigo-400 transition-colors">
                        <FiGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/shaik-imaduddin-a79887390/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="magnetic-btn text-2xl md:text-3xl text-white hover:text-indigo-400 transition-colors">
                        <FiLinkedin />
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-sm uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <span>Explore</span>
                <FiArrowDown className="animate-bounce text-lg" />
            </motion.div>
        </section>
    );
}
