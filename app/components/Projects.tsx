'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { FiX, FiArrowUpRight } from 'react-icons/fi';

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
        tagline: 'AI-Powered Calorie Tracker',
        description: 'A high-performance calorie tracker designed for precision and speed. CUT leverages AI to simplify food logging through natural language input and provides a streamlined, high-contrast interface.',
        features: [
            'AI-powered natural language meal logging',
            'Real-time macro HUD tracking',
            'Progress ring with instant visual feedback',
            'Analytics dashboard',
            'Monochrome high-end design system',
        ],
        tech: ['Next.js 15+', 'Framer Motion', 'Tailwind CSS 4', 'Zustand'],
        github: 'https://github.com/Imad-81',
    },
    {
        id: 2,
        name: 'ML_BOT_MARK5',
        tagline: 'Crypto Trading Algorithm',
        description: 'A real, deployable ML-based trading bot built on historical ETHUSD data. Modular system with multiple strategy prototypes and advanced LSTM-based trade classification.',
        features: [
            'Multiple strategy prototypes: Fractals + EMA',
            'Advanced LSTM model for trade classification',
            'XGBoost pipeline',
            'Stratified cross-validation',
        ],
        tech: ['Python', 'TensorFlow', 'XGBoost', 'Pandas'],
        github: 'https://github.com/Imad-81',
    },
    {
        id: 3,
        name: 'noCap',
        tagline: 'AI Slang Decoder',
        description: 'A premium AI-powered slang analyzer that decodes modern slang. Built with privacy in mind — runs entirely offline using local LLMs.',
        features: [
            'Privacy-first AI running on local LLMs',
            'Glassmorphism dark-mode interface',
            'Real-time local inference',
        ],
        tech: ['Next.js', 'Bun', 'LM Studio', 'Mistral 7B'],
        github: 'https://github.com/Imad-81',
    },
    {
        id: 4,
        name: 'Smart Campus',
        tagline: 'Crowd Management Vision',
        description: 'Real-time crowd monitoring system using YOLOv8 computer vision to detect occupancy levels and provide predictive analytics.',
        features: [
            'Real-time people detection using YOLOv8',
            'Dynamic crowd classification',
            'Predictive analytics engine',
        ],
        tech: ['YOLOv8', 'OpenCV', 'FastAPI', 'React'],
        github: 'https://github.com/Imad-81',
    },
    {
        id: 5,
        name: 'AI Humanizer',
        tagline: 'Text Humanization Pipeline',
        description: 'Robust automation pipeline that rewrites AI-generated text into natural, academic, human-like style. Optimized for local LLMs.',
        features: [
            'Human-centric rewriting',
            'Academic tone preservation',
            'Length-preserving mode',
        ],
        tech: ['Python', 'Mistral-7B', 'NLTK', 'Regex'],
        github: 'https://github.com/Imad-81',
    },
    {
        id: 6,
        name: 'CampusTasks',
        tagline: 'Student Micro-Task Market',
        description: 'Modern marketplace for university students. Facilitates peer-to-peer assistance through micro-tasks and study materials.',
        features: [
            'Dynamic task marketplace',
            'Full task lifecycle management',
            'Gamification and leaderboards',
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
