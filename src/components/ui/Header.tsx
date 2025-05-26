'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/academics', label: 'Academics' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/news', label: 'News & Events' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
];

const Header = () => {
    const [show, setShow] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <header className={`fixed w-full top-0 left-0 z-40 bg-white/60 backdrop-blur-md border-b border-blue-100 shadow-md transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">

                {/* Logo + School Name + Affiliation */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/logo-bgrm.png" alt="School Logo" width={60} height={60} className="rounded-md" />
                    <div className="leading-tight">
                        <h1 className="text-base sm:text-lg font-bold text-blue-800">Welcome to {process.env.NEXT_PUBLIC_INSTITUTE_TITLE}</h1>
                        <p className="text-xs text-blue-600">{process.env.NEXT_PUBLIC_INSTITUTE_PATTERN}</p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 items-center">
                    {navLinks.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative font-medium transition-colors duration-200 group 
                                    ${isActive ? 'text-blue-900 font-semibold' : 'text-blue-700 hover:text-blue-900'}`}
                            >
                                {link.label}
                                <span className={`block h-0.5 transition-all duration-300 
                                    ${isActive ? 'max-w-full bg-blue-700' : 'max-w-0 group-hover:max-w-full bg-blue-600'}`}>
                                </span>
                            </Link>
                        );
                    })}
                    {/* <Link href="/login">
                        <button className="cursor-pointer ml-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-blue-700 transition duration-200">
                            Login
                        </button>
                    </Link> */}
                </nav>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-blue-700 hover:text-blue-900 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[500px]' : 'max-h-0'
                    } bg-white border-t border-blue-100 shadow-sm`}
            >
                <nav className="flex flex-col px-6 py-4 gap-4">
                    {navLinks.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-medium transition-colors duration-200 
                                    ${isActive ? 'text-blue-900 font-semibold' : 'text-blue-700 hover:text-blue-900'}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    {/* <Link href="/login" onClick={() => setMenuOpen(false)}>
                        <button className="mt-2 cursor-pointer bg-blue-600 text-white w-full py-2 rounded-xl font-semibold shadow hover:bg-blue-700 transition duration-200">
                            Login
                        </button>
                    </Link> */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
