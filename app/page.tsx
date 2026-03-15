'use client';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Contact />
        <footer className="footer">
          <p>© 2026 Shaik Imad Uddin — Built with precision.</p>
        </footer>
      </main>
    </>
  );
}
