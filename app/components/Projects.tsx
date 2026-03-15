'use client';

import { useState, useRef, MouseEvent, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowUpRight } from 'react-icons/fi';
import { useLenis } from 'lenis/react';

type Project = {
    id: number;
    name: string;
    tagline: string;
    description: string;
    features: string[];
    tech: string[];
    github?: string;
    accent: string;
};

const projects: Project[] = [
    {
        id: 1,
        name: 'CUT',
        tagline: 'AI-powered nutritional analytics engine with natural language processing and real-time state estimation.',
        description: 'Engineered as a high-performance nutritional logic platform, CUT utilizes natural language processing to abstract away manual data entry. It employs a resilient, state-driven architecture via Zustand and Next.js App Router to instantly recalculate macro-nutritional distributions upon data ingestion. Built adhering to a strict "Obsidian Edge" design philosophy, focusing on depth, velocity, and an anti-gravity user experience.',
        features: [
            'Natural language parsing layer for automated dietary logging routines',
            'Concurrent, real-time macro calculation and localized HUD state updates',
            'Progress and deficit modeling relative to Total Daily Energy Expenditure (TDEE)',
            'Strict monochromatic design system emphasizing data visibility',
            'Zero-latency interface interactions powered by Framer Motion and React Server Components',
        ],
        tech: ['Next.js 15+', 'Framer Motion', 'Tailwind CSS 4', 'Zustand'],
        github: 'https://github.com/Imad-81',
        accent: '#ccff00',
    },
    {
        id: 2,
        name: 'ML_BOT_MARK5',
        tagline: 'Autonomous trade execution system driven by time-series inference and rule-based risk logic.',
        description: 'A production-grade algorithmic trading architecture trained on large-scale historical datasets (ETHUSD). It synthesizes complex technical indicators—Williams Fractals, directional EMAs, and ADX—with advanced predictive models including XGBoost and LSTMs. The pipeline strictly segregates signal generation, trade simulation, and feature engineering to ensure robust backtesting devoid of data leakage.',
        features: [
            'LSTM and XGBoost ensemble model for probability-driven trade classification',
            'Numba-optimized iterative simulation logic handling 200MB+ dataset payloads',
            'Multi-timeframe Support/Resistance and fractal breakout detection algorithms',
            'Advanced evaluation pipeline utilizing SMOTE dataset balancing and Focal Loss tuning',
            'Dynamic Stop-Loss/Take-Profit management to optimize trailing R:R ratios',
        ],
        tech: ['Python', 'TensorFlow', 'XGBoost', 'Pandas'],
        github: 'https://github.com/Imad-81',
        accent: '#f59e0b',
    },
    {
        id: 3,
        name: 'noCap',
        tagline: 'Privacy-first linguistic analysis engine utilizing localized large language models for semantic decoding.',
        description: 'An offline, secure semantic analyzer structured around Next.js and localized Mistral-7B models. noCap removes cloud dependency, processing linguistic shifts directly on local hardware via LM Studio. The frontend logic bridges to the local inference server using a custom API layer, ensuring zero-footprint data transfer while maintaining a zero-latency tactile interface.',
        features: [
            'Complete localized inference stack ensuring 100% data processing privacy',
            'RESTful bridging between a React App Router and LM Studio inference endpoints',
            'Optimized execution layer utilizing the Bun JavaScript runtime and TurboPack',
            'Premium dark-mode glassmorphism aesthetics with granular physics-based rendering',
        ],
        tech: ['Next.js', 'Bun', 'LM Studio', 'Mistral 7B'],
        github: 'https://github.com/Imad-81',
        accent: '#a855f7',
    },
    {
        id: 4,
        name: 'Smart Campus',
        tagline: 'Real-time perception system for crowd density estimation using computer vision pipelines.',
        description: 'A multi-modal perception ecosystem that pipes continuous YOLOv8 inferences from remote video streams into a unified dashboard. The Python-based vision backend asynchronously detects occupancy patterns and forwards structured payload telemetry to a FastAPI interface. The React frontend consumes this pipeline, driving dynamic predictive analytics for crowd forecasting.',
        features: [
            'YOLOv8 hardware-accelerated computer vision loop for precise spatial detection',
            'Asynchronous FastAPI backend mapping detection frames into serialized JSON REST streams',
            'Predictive routing algorithms that account for temporal anomalies and event-driven patterns',
            'Live-updating React dashboard rendering synchronous crowd state feedback and classifications',
        ],
        tech: ['YOLOv8', 'OpenCV', 'FastAPI', 'React'],
        github: 'https://github.com/Imad-81',
        accent: '#06b6d4',
    },
    {
        id: 5,
        name: 'EduNex',
        tagline: 'High-fidelity career mapping engine leveraging AI for precise academic and professional blueprinting.',
        description: 'EduNex utilizes a proprietary Student Intelligence System (SIS) to translate academic vectors, socio-economic contexts, and interest compatibility into actionable career pathways. It features real-time reactivity via Convex and AI-driven intelligence mapping hosted on a robust Next.js server-side architecture.',
        features: [
            'Student Intelligence Profiling based on multi-factor data encompassing academic, socio-economic, and risk vectors',
            'Ranked Career Engine leveraging Groq AI for granular compatibility matching',
            'Deep Blueprint Mode with strategic year-by-year modeling for entrance exams and admissions',
            'Real-time Persistent Dashboard integrated securely with Clerk auth and Convex state management',
        ],
        tech: ['Next.js', 'Convex', 'Clerk', 'Groq AI'],
        github: 'https://github.com/Imad-81/sip_edunex',
        accent: '#3b82f6',
    },
    {
        id: 6,
        name: 'CampusTasks',
        tagline: 'Distributed task fulfillment platform driven by peer-to-peer interaction and gamified incentive structures.',
        description: 'A full-stack distributed task fulfillment platform tailored for academic environments. Integrates secure request lifecycle logic, gamified contribution tracking, and complex state management to facilitate modular peer-to-peer micro-tasks within a structured virtual marketplace.',
        features: [
            'Comprehensive task state machine managing object lifecycles from creation to fulfillment',
            'Secure authenticated session handling bundled with local storage state persistence',
            'Global leaderboard utilizing gamified reputational metrics to reward system integration',
            'Deeply customized interface utilizing bespoke variable-based CSS in a React 19 / Vite environment',
        ],
        tech: ['React 19', 'Vite', 'Vanilla CSS'],
        github: 'https://github.com/Imad-81/Design_Thinking1',
        accent: '#10b981',
    },
];

function TiltCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 200, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 30 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['8deg', '-8deg']);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-8deg', '8deg']);

    function onMouseMove(e: MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);

        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ perspective: 800 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            viewport={{ once: true }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                className="group relative h-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-300"
            >
                {/* Gradient top border */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                        opacity: 0.6,
                    }}
                />

                <div className="relative bg-[var(--glass-bg)] border border-white/[0.06] rounded-2xl p-8 h-full hover:border-white/[0.12] hover:bg-[var(--glass-bg-hover)] transition-all duration-300">
                    {/* Spotlight */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                        style={{
                            background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.accent}08, transparent 40%)`,
                        }}
                    />

                    <div style={{ transform: 'translateZ(15px)' }}>
                        <div className="flex items-center justify-between mb-6">
                            <span
                                className="text-xs text-[var(--text-muted)] tracking-widest"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                0{project.id}
                            </span>
                            <FiArrowUpRight
                                size={18}
                                className="text-[var(--text-muted)] group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform"
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed line-clamp-3">
                            {project.tagline}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] text-[var(--text-muted)]"
                                    style={{ fontFamily: 'var(--font-mono)' }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const lenis = useLenis();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
        return () => {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        };
    }, [lenis]);

    return (
        <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gradient Header Bar */}
                <div
                    className="h-1"
                    style={{
                        background: `linear-gradient(90deg, ${project.accent}, var(--accent-violet))`,
                    }}
                />

                <div
                    className="bg-[#0a0a0a] border border-white/[0.06] border-t-0 rounded-b-2xl p-8 md:p-12 overflow-y-auto max-h-[85vh]"
                    style={{ boxShadow: `0 0 60px ${project.accent}15` }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-white/30 transition-all"
                    >
                        <FiX size={16} />
                    </button>

                    <div className="mb-8">
                        <span className="text-xs tracking-widest uppercase mb-2 block" style={{ color: project.accent, fontFamily: 'var(--font-mono)' }}>
                            Project Details
                        </span>
                        <h2 className="text-4xl font-bold text-white mb-4">{project.name}</h2>
                        <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{project.description}</p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4 pb-2 border-b border-white/[0.06]"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                Key Features
                            </h3>
                            <ul className="space-y-3">
                                {project.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm leading-relaxed">
                                        <span style={{ color: project.accent }} className="mt-1.5 text-xs">▸</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4 pb-2 border-b border-white/[0.06]"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                Technology
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <span key={t} className="text-xs text-[var(--text-secondary)] border border-white/[0.08] px-3 py-1.5 rounded-full" style={{ fontFamily: 'var(--font-mono)' }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.github && (
                            <div className="pt-4">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide text-black transition-all hover:opacity-90"
                                    style={{ background: project.accent }}
                                >
                                    View on GitHub <FiArrowUpRight />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section className="section" id="projects">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span
                        className="block text-xs text-[var(--text-muted)] tracking-widest uppercase mb-3"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Selected Works
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                        Projects
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((project, index) => (
                        <TiltCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
