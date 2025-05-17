'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, ArrowUp } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { getInstituteDetails } from '@/utils/helpher';

const Footer = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const inst = getInstituteDetails();

    return (
        <motion.footer
            ref={containerRef}
            style={{ opacity }}
            className="relative bg-gradient-to-b from-blue-950 to-blue-900 text-white pt-20 pb-12  overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-900 rounded-full blur-3xl opacity-30" />
                <div className="absolute -top-48 right-1/4 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-20" />
            </div>

            <motion.div
                style={{ y }}
                className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-12 relative z-10"
            >
                {/* Logo Section */}
                <div className="space-y-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 group"
                    >
                        <Image
                            src="/logo.png"
                            alt="School Logo"
                            width={150}
                            height={150}
                            className="rounded-2xl transition-transform duration-300 group-hover:rotate-12"
                        />
                        {/* <span className="text-xl font-bold leading-snug bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                            Sri Netaji Subhash Chandra Educational Academy
                        </span> */}
                    </motion.div>
                    <p className="text-blue-300/80 font-light max-w-xs">
                        Inspiring Excellence Through Innovative Education
                    </p>
                </div>

                {/* Quick Links with Hover Effects */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-200">Explore</h4>
                    <ul className="space-y-3">
                        {['About', 'Academics', 'Admissions', 'News', 'Contact'].map((link) => (
                            <motion.li key={link} whileHover={{ x: 5 }}>
                                <Link
                                    href={`/${link.toLowerCase()}`}
                                    className="flex items-center gap-2 text-sm text-blue-300/90 hover:text-blue-400 transition-colors"
                                >
                                    <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {link}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-200">Connect</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                            <div className="w-6 h-6 bg-blue-800/30 rounded-full flex items-center justify-center">
                                📍
                            </div>
                            {inst.instAddr}
                        </div>
                        <div className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                            <div className="w-6 h-6 bg-blue-800/30 rounded-full flex items-center justify-center">
                                📞
                            </div>
                            {inst.instMobile}
                        </div>
                        <div className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                            <div className="w-6 h-6 bg-blue-800/30 rounded-full flex items-center justify-center">
                                ✉️
                            </div>
                            <a href="mailto:info@school.edu">{inst.instEmail}</a>
                        </div>
                    </div>
                </div>

                {/* Social Media with Interactive Icons */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-200">Follow Us</h4>
                    <div className="flex gap-4">
                        {[Facebook, Instagram, Twitter].map((Icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="p-3 bg-blue-900/40 rounded-xl hover:bg-blue-800/60 transition-all"
                                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon
                                    size={20}
                                    className="text-blue-300 hover:text-blue-50 transition-colors"
                                />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Animated Wave Section */}
            <div className="absolute left-0 right-0 bottom-0 h-24 pointer-events-none z-10">
                <svg
                    className="w-full h-full animate-multi-wave"
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="url(#waveGradient)"
                        d="M0,32L80,42.7C160,53,320,75,480,80C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    />
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Back to Top Button */}
            <motion.button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 p-3 bg-blue-600/30 backdrop-blur rounded-full shadow-lg hover:bg-blue-500/40 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ArrowUp className="text-blue-200" size={24} />
            </motion.button>

            {/* Copyright Text */}
            <div className="text-center text-xs text-blue-300/60 mt-8 relative z-10">
                © {new Date().getFullYear()} {inst.instName}.<br />
                Empowering Minds, Shaping Futures
            </div>

            <style jsx global>{`
        @keyframes multi-wave {
          0% { transform: translateX(0) translateY(0); }
          33% { transform: translateX(-60px) translateY(3px); }
          66% { transform: translateX(30px) translateY(-2px); }
          100% { transform: translateX(0) translateY(0); }
        }
        .animate-multi-wave {
          animation: multi-wave 12s ease-in-out infinite;
        }
      `}</style>
        </motion.footer>
    );
};

export default Footer;