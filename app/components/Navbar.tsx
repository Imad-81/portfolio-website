'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 100);
            setVisible(y > 300);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    className={`navbar ${scrolled ? 'scrolled' : ''}`}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="navbar-inner">
                        <a className="nav-logo" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                            SIU
                        </a>
                        <ul className="nav-links">
                            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>Projects</a></li>
                            <li><a href="#techstack" onClick={(e) => { e.preventDefault(); scrollTo('techstack'); }}>Stack</a></li>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
                        </ul>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
