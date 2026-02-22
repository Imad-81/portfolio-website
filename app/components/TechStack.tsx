'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import {
    SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
    SiNodedotjs, SiPandas, SiNumpy, SiScipy, SiGit,
    SiTensorflow, SiPytorch, SiDocker, SiTailwindcss, SiMongodb
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';

const icons = [
    { icon: <SiPython />, color: '#3776AB', name: 'Python', desc: 'Core language for ML logic & backend' },
    { icon: <SiJavascript />, color: '#F7DF1E', name: 'JavaScript', desc: 'Interactive frontend elements' },
    { icon: <SiTypescript />, color: '#3178C6', name: 'TypeScript', desc: 'Type-safe scalable codebases' },
    { icon: <SiReact />, color: '#61DAFB', name: 'React', desc: 'Component-based UI architecture' },
    { icon: <SiNextdotjs />, color: '#ffffff', name: 'Next.js', desc: 'Full-stack React framework' },
    { icon: <SiNodedotjs />, color: '#339933', name: 'Node.js', desc: 'Scalable backend runtime' },
    { icon: <SiPandas />, color: '#150458', name: 'Pandas', desc: 'Data manipulation & analysis' },
    { icon: <SiNumpy />, color: '#013243', name: 'NumPy', desc: 'numerical computing library' },
    { icon: <SiScipy />, color: '#8CAAE6', name: 'SciPy', desc: 'Advanced scientific computing' },
    { icon: <SiGit />, color: '#F05032', name: 'Git', desc: 'Version control system' },
    { icon: <TbBrandVscode />, color: '#007ACC', name: 'VS Code', desc: 'Primary development IDE' },
    { icon: <SiTensorflow />, color: '#FF6F00', name: 'TensorFlow', desc: 'Deep learning model training' },
    { icon: <SiPytorch />, color: '#EE4C2C', name: 'PyTorch', desc: 'Neural network research' },
    { icon: <SiDocker />, color: '#2496ED', name: 'Docker', desc: 'Containerization & deployment' },
    { icon: <SiTailwindcss />, color: '#06B6D4', name: 'Tailwind', desc: 'Utility-first styling system' },
    { icon: <SiMongodb />, color: '#47A248', name: 'MongoDB', desc: 'NoSQL database for flexibility' },
];

export default function TechStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Mouse interaction
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    // Pauses rotation when hovering an item
    const isHoveringRef = useRef(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Clamp vertical rotation to prevent flipping
            const rotateXVal = y * 0.1;
            const clampedRotateX = Math.max(-45, Math.min(45, rotateXVal));

            mouseX.set(x * 0.1);
            mouseY.set(clampedRotateX);
        }
    };

    // Automated rotation
    useEffect(() => {
        let animationFrame: number;
        let angle = 0;

        const animate = () => {
            // Slow down rotation significantly when hovering
            const speed = isHoveringRef.current ? 0.0005 : 0.003;
            angle += speed;
            // Keep y in [0, 360) to prevent unbounded growth that causes gimbal flipping
            const yDeg = (angle * (180 / Math.PI)) % 360;
            // Clamp x well within ±20° — never approaches the ±90° flip threshold
            const xDeg = Math.sin(angle * 0.3) * 15;
            setRotation({ x: xDeg, y: yDeg });
            animationFrame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <section className="section py-32 overflow-hidden" onMouseMove={handleMouseMove} ref={containerRef}>
            <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-[600px]">

                    {/* Left Column: Text */}
                    <motion.div
                        className="flex flex-col justify-center space-y-2 z-10 relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-4 block">Core Philosophy</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Exploring how machines <br />
                            <span className="text-indigo-400">perceive,</span><br />
                            <span className="text-blue-400">learn,</span><br />
                            <span className="text-purple-400">decide,</span><br />
                            and <span className="text-white">act.</span>
                        </h2>
                    </motion.div>

                    {/* Right Column: 3D Sphere */}
                    <div className="relative flex flex-col items-center justify-center w-full h-full z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <span className="text-sm font-mono text-gray-400 tracking-widest uppercase text-center block">
                                Tools used across system layers
                            </span>
                        </motion.div>

                        <div className="relative w-[300px] h-[300px]" style={{ perspective: '1000px' }}>
                            <motion.div
                                className="w-full h-full relative"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    rotateX: mouseY,
                                    rotateY: mouseX,
                                }}
                            >
                                {icons.map((item, i) => {
                                    // Spherical Distribution (Fibonacci Sphere)
                                    const phi = Math.acos(-1 + (2 * i) / icons.length);
                                    const theta = Math.sqrt(icons.length * Math.PI) * phi;

                                    const r = 180; // Radius
                                    const x = r * Math.cos(theta) * Math.sin(phi);
                                    const y = r * Math.sin(theta) * Math.sin(phi);
                                    const z = r * Math.cos(phi);

                                    const isHovered = hoveredIndex === i;

                                    return (
                                        <div
                                            key={i}
                                            className="absolute left-1/2 top-1/2 flex items-center justify-center"
                                            style={{
                                                transform: `translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, ${z.toFixed(3)}px)`,
                                            }}
                                        >
                                            <motion.div
                                                className="relative group cursor-pointer"
                                                onMouseEnter={() => {
                                                    setHoveredIndex(i);
                                                    isHoveringRef.current = true;
                                                }}
                                                onMouseLeave={() => {
                                                    setHoveredIndex(null);
                                                    isHoveringRef.current = false;
                                                }}
                                            >
                                                {/* Icon Card */}
                                                <motion.div
                                                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-3xl shadow-lg relative z-10"
                                                    animate={{
                                                        scale: isHovered ? 1.5 : 1,
                                                        borderColor: isHovered ? item.color : 'rgba(255,255,255,0.1)',
                                                        backgroundColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                                                    }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                >
                                                    <div style={{ color: item.color, filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}>
                                                        {item.icon}
                                                    </div>
                                                </motion.div>

                                                {/* Tooltip Card (Side Menu) */}
                                                <AnimatePresence>
                                                    {isHovered && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 20, pointerEvents: 'none' }}
                                                            animate={{ opacity: 1, x: 50, pointerEvents: 'auto' }}
                                                            exit={{ opacity: 0, x: 20, pointerEvents: 'none' }}
                                                            className="absolute left-1/2 top-1/2 -translate-y-1/2 w-48 bg-black/90 border border-white/20 p-4 rounded-xl backdrop-blur-xl z-20"
                                                            style={{
                                                                boxShadow: `0 0 30px ${item.color}40`,
                                                            }}
                                                        >
                                                            <div className="text-xs font-mono text-gray-500 mb-1 tracking-widest uppercase">Tech</div>
                                                            <h3 className="text-lg font-bold text-white mb-1" style={{ color: item.color }}>{item.name}</h3>
                                                            <p className="text-xs text-gray-300 leading-relaxed font-light">
                                                                {item.desc}
                                                            </p>
                                                            {/* Connecting Line */}
                                                            <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-white/20" />
                                                            <div className="absolute top-1/2 -left-8 w-1 h-1 bg-white rounded-full" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
