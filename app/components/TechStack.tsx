'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Float } from '@react-three/drei';
import { useRef, useState, useMemo, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
    SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
    SiNodedotjs, SiPandas, SiNumpy, SiScipy, SiGit,
    SiTensorflow, SiTailwindcss,
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import { ReactElement, useEffect } from 'react';

/* ───────── Data ───────── */
type TechNode = {
    icon: ReactElement;
    color: string;
    name: string;
    desc: string;
    category: string;
};

const techNodes: TechNode[] = [
    { icon: <SiPython size={22} />, color: '#3776AB', name: 'Python', desc: 'ML pipelines & trading systems', category: 'Languages' },
    { icon: <SiJavascript size={22} />, color: '#F7DF1E', name: 'JavaScript', desc: 'Interactive frontends', category: 'Languages' },
    { icon: <SiTypescript size={22} />, color: '#3178C6', name: 'TypeScript', desc: 'Type-safe codebases', category: 'Languages' },
    { icon: <SiReact size={22} />, color: '#61DAFB', name: 'React', desc: 'Component architecture', category: 'Frontend' },
    { icon: <SiNextdotjs size={22} />, color: '#ffffff', name: 'Next.js', desc: 'Full-stack framework', category: 'Frontend' },
    { icon: <SiTailwindcss size={22} />, color: '#06B6D4', name: 'Tailwind', desc: 'Utility-first styling', category: 'Frontend' },
    { icon: <SiPandas size={22} />, color: '#150458', name: 'Pandas', desc: 'Data manipulation', category: 'Data & ML' },
    { icon: <SiNumpy size={22} />, color: '#013243', name: 'NumPy', desc: 'Numerical computing', category: 'Data & ML' },
    { icon: <SiScipy size={22} />, color: '#8CAAE6', name: 'SciPy', desc: 'Scientific computing', category: 'Data & ML' },
    { icon: <SiTensorflow size={22} />, color: '#FF6F00', name: 'TensorFlow', desc: 'Deep learning models', category: 'Data & ML' },
    { icon: <SiNodedotjs size={22} />, color: '#339933', name: 'Node.js', desc: 'Backend runtime', category: 'Tools' },
    { icon: <SiGit size={22} />, color: '#F05032', name: 'Git', desc: 'Version control', category: 'Tools' },
    { icon: <TbBrandVscode size={22} />, color: '#007ACC', name: 'VS Code', desc: 'Primary IDE', category: 'Tools' },
];

/* Fibonacci sphere distribution for even spacing */
function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < n; i++) {
        const theta = Math.acos(1 - (2 * (i + 0.5)) / n);
        const phi = (2 * Math.PI * i) / goldenRatio;
        points.push(new THREE.Vector3(
            radius * Math.sin(theta) * Math.cos(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(theta),
        ));
    }
    return points;
}

/* ───────── Constellation Lines ───────── */
function ConstellationLines({ positions, activeIndex }: { positions: THREE.Vector3[]; activeIndex: number | null }) {
    const linesRef = useRef<THREE.Group>(null!);
    
    // Build edges between nearby nodes
    const edges = useMemo(() => {
        const result: [number, number][] = [];
        const threshold = 4.2;
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                if (positions[i].distanceTo(positions[j]) < threshold) {
                    result.push([i, j]);
                }
            }
        }
        return result;
    }, [positions]);

    return (
        <group ref={linesRef}>
            {edges.map(([a, b], idx) => {
                const isActive = activeIndex === a || activeIndex === b;
                const points = [positions[a], positions[b]];
                return (
                    <line key={idx}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial
                            color={isActive ? '#7c3aed' : '#ffffff'}
                            transparent
                            opacity={isActive ? 0.5 : 0.06}
                            linewidth={1}
                        />
                    </line>
                );
            })}
        </group>
    );
}

/* ───────── Floating particle dust ───────── */
function ParticleDust() {
    const ref = useRef<THREE.Points>(null!);
    const count = 200;

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 16;
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.02;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#7c3aed"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

/* ───────── Central glowing core ───────── */
function GlowCore() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (meshRef.current) {
            const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
            meshRef.current.scale.set(s, s, s);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.0, 1]} />
                <meshBasicMaterial
                    color="#7c3aed"
                    wireframe
                    transparent
                    opacity={0.12}
                />
            </mesh>
            {/* Inner glow sphere */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial
                    color="#4f46e5"
                    transparent
                    opacity={0.08}
                />
            </mesh>
        </Float>
    );
}

/* ───────── Single Tech Node ───────── */
function TechIconNode({
    node,
    position,
    index,
    activeIndex,
    setActiveIndex,
}: {
    node: TechNode;
    position: THREE.Vector3;
    index: number;
    activeIndex: number | null;
    setActiveIndex: (i: number | null) => void;
}) {
    const groupRef = useRef<THREE.Group>(null!);
    const isActive = activeIndex === index;

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating bob per node
            const offset = index * 0.5;
            groupRef.current.position.y =
                position.y + Math.sin(state.clock.elapsedTime * 0.6 + offset) * 0.08;
        }
    });

    const categoryColor = useMemo(() => {
        switch (node.category) {
            case 'Languages': return 'var(--accent-violet)';
            case 'Frontend': return 'var(--accent-cyan)';
            case 'Data & ML': return 'var(--accent-indigo)';
            case 'Tools': return '#339933';
            default: return '#ffffff';
        }
    }, [node.category]);

    return (
        <group ref={groupRef} position={[position.x, position.y, position.z]}>
            {/* Glow sphere behind each icon */}
            <mesh>
                <sphereGeometry args={[isActive ? 0.45 : 0.3, 16, 16]} />
                <meshBasicMaterial
                    color={node.color}
                    transparent
                    opacity={isActive ? 0.15 : 0.05}
                />
            </mesh>

            {/* HTML overlay for crisp icon + label */}
            <Html
                center
                distanceFactor={8}
                style={{ pointerEvents: 'auto' }}
                zIndexRange={[50, 0]}
            >
                <div
                    className={`tech-node-3d ${isActive ? 'tech-node-3d--active' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    style={{
                        '--node-color': node.color,
                        '--cat-color': categoryColor,
                    } as React.CSSProperties}
                >
                    <div className="tech-node-3d__icon">
                        {node.icon}
                    </div>
                    <span className="tech-node-3d__name">{node.name}</span>

                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                className="tech-node-3d__tooltip"
                                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="tech-node-3d__cat">{node.category}</span>
                                <span className="tech-node-3d__desc">{node.desc}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Html>
        </group>
    );
}

/* ───────── Slow auto-rotate wrapper ───────── */
function RotatingGroup({ children, activeIndex }: { children: React.ReactNode; activeIndex: number | null }) {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((_, delta) => {
        if (groupRef.current && activeIndex === null) {
            groupRef.current.rotation.y += delta * 0.08;
        }
    });

    return <group ref={groupRef}>{children}</group>;
}

/* ───────── Main 3D Scene ───────── */
function TechStackScene() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const positions = useMemo(() => fibonacciSphere(techNodes.length, 3.5), []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.3} />

            <RotatingGroup activeIndex={activeIndex}>
                <GlowCore />
                <ConstellationLines positions={positions} activeIndex={activeIndex} />
                {techNodes.map((node, i) => (
                    <TechIconNode
                        key={node.name}
                        node={node}
                        position={positions[i]}
                        index={i}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                ))}
            </RotatingGroup>

            <ParticleDust />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={!isMobile}
                rotateSpeed={0.4}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={(3 * Math.PI) / 4}
            />
        </>
    );
}

/* ───────── Exported Section Component ───────── */
export default function TechStack() {
    return (
        <section className="section" id="techstack">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                    {/* Left: Header text + category legend */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        <span
                            className="block text-xs text-[var(--text-muted)] tracking-widest uppercase mb-3"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            Core Philosophy
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                            Exploring how machines{' '}
                            <span className="gradient-text">perceive, learn, decide,</span>{' '}
                            and act.
                        </h2>
                        <p className="mt-4 text-sm text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                            Drag to rotate · Hover to explore
                        </p>

                        {/* Category Legend */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-wrap gap-6 mt-10"
                        >
                            {[
                                { label: 'Languages', color: 'var(--accent-violet)' },
                                { label: 'Frontend', color: 'var(--accent-cyan)' },
                                { label: 'Data & ML', color: 'var(--accent-indigo)' },
                                { label: 'Tools', color: '#339933' },
                            ].map((cat) => (
                                <div key={cat.label} className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                                    />
                                    <span
                                        className="text-xs text-[var(--text-muted)] uppercase tracking-wider"
                                        style={{ fontFamily: 'var(--font-mono)' }}
                                    >
                                        {cat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: 3D Canvas */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="tech-stack-canvas-wrapper"
                    >
                        <Canvas
                            dpr={[1, 1.5]}
                            camera={{ position: [0, 0, 8], fov: 52 }}
                            gl={{ antialias: true, alpha: true }}
                            style={{ background: 'transparent' }}
                        >
                            <Suspense fallback={null}>
                                <TechStackScene />
                            </Suspense>
                        </Canvas>

                        {/* Radial fade at edges */}
                        <div className="tech-stack-vignette" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
