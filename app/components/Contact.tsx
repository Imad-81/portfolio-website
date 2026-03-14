'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiPhone, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { sendEmail } from '../actions/sendEmail';

export default function Contact() {
    const ref = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setSending(true);
        setStatus('idle');

        try {
            const formData = new FormData(formRef.current);
            const res = await sendEmail(formData);

            if (res.error) {
                console.error(res.error);
                setStatus('error');
            } else {
                setStatus('success');
                formRef.current.reset();
            }
        } catch {
            setStatus('error');
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="section min-h-screen flex items-center justify-center py-20 px-4" id="contact" ref={ref}>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left Side: Typography & Info */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span
                        className="block text-xs text-[var(--text-muted)] tracking-widest uppercase mb-4"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Get in Touch
                    </span>
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-10 leading-[0.9]">
                        LET&apos;S <br />
                        <span className="gradient-text">WORK</span> <br />
                        TOGETHER.
                    </h2>

                    <div className="space-y-5 text-base md:text-lg text-[var(--text-secondary)]">
                        <a
                            href="mailto:shaikimaduddin10@gmail.com"
                            className="flex items-center gap-4 hover:text-white transition-colors group"
                        >
                            <span className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                                <FiMail size={16} />
                            </span>
                            <span className="text-sm">shaikimaduddin10@gmail.com</span>
                        </a>
                        <div className="flex items-center gap-4">
                            <span className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                                <FiPhone size={16} />
                            </span>
                            <span className="text-sm">+91 7032866208</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-10">
                        <a
                            href="https://github.com/Imad-81"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all text-xs tracking-widest font-bold uppercase"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/shaik-imaduddin-a79887390/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full border border-white/10 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all text-xs tracking-widest font-bold uppercase"
                        >
                            LinkedIn
                        </a>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass-card p-8 md:p-12 gradient-border"
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        <div className="group relative">
                            <input
                                type="text"
                                name="from_name"
                                required
                                className="w-full bg-transparent border-b border-white/[0.08] py-4 text-lg text-white outline-none focus:border-[var(--accent-violet)] transition-colors peer"
                                placeholder=" "
                            />
                            <label className="absolute left-0 top-4 text-[var(--text-muted)] text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[var(--accent-violet)] peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[var(--text-secondary)] pointer-events-none">
                                Your Name
                            </label>
                        </div>

                        <div className="group relative">
                            <input
                                type="email"
                                name="reply_to"
                                required
                                className="w-full bg-transparent border-b border-white/[0.08] py-4 text-lg text-white outline-none focus:border-[var(--accent-violet)] transition-colors peer"
                                placeholder=" "
                            />
                            <label className="absolute left-0 top-4 text-[var(--text-muted)] text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[var(--accent-violet)] peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[var(--text-secondary)] pointer-events-none">
                                Email Address
                            </label>
                        </div>

                        <div className="group relative">
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-transparent border-b border-white/[0.08] py-4 text-lg text-white outline-none focus:border-[var(--accent-violet)] transition-colors peer resize-none"
                                placeholder=" "
                            />
                            <label className="absolute left-0 top-4 text-[var(--text-muted)] text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[var(--accent-violet)] peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[var(--text-secondary)] pointer-events-none">
                                Message
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-[var(--accent-violet)] hover:bg-[var(--accent-violet)] hover:shadow-lg hover:shadow-[var(--accent-violet)]/20"
                        >
                            {sending ? (
                                'Sending...'
                            ) : (
                                <>Send Message <FiSend size={14} /></>
                            )}
                        </button>

                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm"
                            >
                                <FiCheck size={16} />
                                Message sent. I&apos;ll respond soon.
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm"
                            >
                                <FiAlertCircle size={16} />
                                Something went wrong. Please try again.
                            </motion.div>
                        )}
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
