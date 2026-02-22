'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiPhone, FiSend } from 'react-icons/fi';
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
        <section className="min-h-screen flex items-center justify-center py-20 px-4" id="contact" ref={ref}>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left Side: Typography & Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-7xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
                        LET'S <br />
                        <span className="text-gray-600">WORK</span> <br />
                        TOGETHER.
                    </h2>

                    <div className="space-y-6 text-lg md:text-xl text-gray-400 font-light">
                        <a href="mailto:shaikimaduddin10@gmail.com" className="flex items-center gap-4 hover:text-white transition-colors group">
                            <span className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <FiMail />
                            </span>
                            shaikimaduddin10@gmail.com
                        </a>
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                                <FiPhone />
                            </span>
                            +91 7032866208
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12">
                        <a href="https://github.com/Imad-81" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all uppercase text-sm tracking-widest font-bold">
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/shaik-imaduddin-a79887390/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-white/10 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all uppercase text-sm tracking-widest font-bold">
                            LinkedIn
                        </a>
                    </div>
                </motion.div>

                {/* Right Side: Interactive Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-12 rounded-3xl"
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        <div className="group relative">
                            <input
                                type="text"
                                name="from_name"
                                required
                                className="w-full bg-transparent border-b border-gray-700 py-4 text-xl text-white outline-none focus:border-white transition-colors peer"
                                placeholder=" "
                            />
                            <label className="absolute left-0 top-4 text-gray-500 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white pointer-events-none">
                                Your Name
                            </label>
                        </div>

                        <div className="group relative">
                            <input
                                type="email"
                                name="reply_to"
                                required
                                className="w-full bg-transparent border-b border-gray-700 py-4 text-xl text-white outline-none focus:border-white transition-colors peer"
                                placeholder=" "
                            />
                            <label className="absolute left-0 top-4 text-gray-500 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white pointer-events-none">
                                Email Address
                            </label>
                        </div>

                        <div className="group relative">
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-transparent border-b border-gray-700 py-4 text-xl text-white outline-none focus:border-white transition-colors peer resize-none"
                                placeholder=" "
                            />
                            <label className="absolute left-0 top-4 text-gray-500 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white pointer-events-none">
                                Message
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full bg-white text-black font-bold py-5 rounded-xl uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sending ? 'Sending...' : (
                                <>Send Message <FiSend /></>
                            )}
                        </button>

                        {status === 'success' && (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center text-sm">
                                Message sent successfully. I'll get back to you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center text-sm">
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
