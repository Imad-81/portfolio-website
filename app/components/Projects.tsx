'use client';

import { useState, useRef, MouseEvent, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView } from 'framer-motion';
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
};

const projects: Project[] = [
    {
        id: 1,
        name: 'CUT',
        tagline: 'Automated nutritional analytics engine driven by natural language processing and real-time state estimation.',
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
    },
];

function TiltCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x);
    const mouseY = useSpring(y);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg']);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg']);

    function onMouseMove(e: MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);

        e.currentTarget.style.setProperty('--mouse-x', `${mouseXVal}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${mouseYVal}px`);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                className="group relative h-full cursor-pointer bg-white/5 border border-white/10 p-8 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/20"
            >
                {/* Spotlight Gradient */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)'
                    }}
                />

                <div style={{ transform: 'translateZ(20px)' }}>
                    <span className="block text-xs font-mono text-gray-500 mb-4 tracking-widest">0{project.id}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-400 mb-6 font-mono">{project.tagline}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 rounded bg-black/20 text-gray-400">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div
                    className="absolute bottom-6 right-6 text-gray-600 group-hover:text-white transition-colors duration-300"
                    style={{ transform: 'translateZ(10px)' }}
                >
                    <FiArrowUpRight size={24} />
                </div>
            </motion.div>
        </motion.div>
    );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const lenis = useLenis();

    useEffect(() => {
        // Prevent scrolling on the body when the modal is open
        document.body.style.overflow = 'hidden';
        if (lenis) {
            lenis.stop();
        }

        return () => {
            document.body.style.overflow = '';
            if (lenis) {
                lenis.start();
            }
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
                className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{ boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                >
                    <FiX size={24} />
                </button>

                <div className="mb-8">
                    <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase mb-2 block">Project Details</span>
                    <h2 className="text-4xl font-bold text-white mb-4">{project.name}</h2>
                    <p className="text-gray-400 leading-relaxed text-lg">{project.description}</p>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Key Features</h3>
                        <ul className="space-y-3">
                            {project.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                                    <span className="text-indigo-500 mt-1">▹</span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Technology</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <span key={t} className="text-xs font-mono text-gray-400 border border-white/10 px-3 py-1.5 rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {project.github && (
                        <div className="pt-6">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-gray-200 transition-colors"
                            >
                                View on GitHub <FiArrowUpRight />
                            </a>
                        </div>
                    )}
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
                    <span className="block text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">Selected Works</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">Projects</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
