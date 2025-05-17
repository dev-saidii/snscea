"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import {
    UserPlus,ArrowLeft, Home,
    GraduationCap, ClipboardList, School, BadgeCheck,
    FileDown
} from "lucide-react";

const navLinks = [
    {
        label: "New Admission",
        href: "/dashboard/students/admission",
        icon: UserPlus
    },
    {
        label: "Student Directory",
        href: "/dashboard/students/list",
        icon: ClipboardList
    },
    {
        label: "Academic Promotion",
        href: "/dashboard/students/promotion",
        icon: GraduationCap
    },
    {
        label: "Export Student Data",
        href: "/dashboard/students/export",
        icon: FileDown
    },
    // {
    //     label: "Transfer Certificate",
    //     href: "/dashboard/students/transfer-certificate",
    //     icon: FileText
    // },
];

const SIDEBAR_WIDTH = 256;
const TOPBAR_HEIGHT = 64;

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className={`flex transition-colors duration-200
                ${theme === "dark"
                ? "bg-gradient-to-br from-[#101e2a] to-[#1a2d3b]"
                : "bg-gradient-to-br from-[#eaf6fb] to-[#f6fbff]"
            }`} style={{ height: `calc(100vh - ${TOPBAR_HEIGHT}px)` }}>

            {/* Enhanced Sidebar */}
            <aside
                className="hidden md:flex flex-col bg-gradient-to-br from-[#eaf6fb] to-[#f6fbff] dark:bg-[#1a2d3b] border-r border-gray-100 dark:border-[#22384a] shadow-lg py-8 px-4 z-30"
                style={{
                    width: SIDEBAR_WIDTH,
                    position: "fixed",
                    top: TOPBAR_HEIGHT,
                    left: 0,
                    height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
                }}
            >
                <div className="flex items-center justify-center gap-3 mb-8">
                    <School size={28} className="text-[#205D80] dark:text-[#7dd3fc]" />
                    <h2 className="text-2xl font-bold text-[#205D80] dark:text-white tracking-tight">
                        Student Portal
                    </h2>
                </div>

                <nav className="flex-1">
                    <ul className="space-y-2">
                        {navLinks.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                                            ${active
                                                ? "bg-[#205D80] text-white shadow-lg"
                                                : "text-[#205D80] dark:text-gray-300 hover:bg-[#eaf6fb] dark:hover:bg-[#22384a]"
                                            }
                                        `}
                                    >
                                        <link.icon
                                            size={22}
                                            className={`${active
                                                ? "text-white"
                                                : "text-[#205D80] dark:text-gray-400"
                                                } group-hover:scale-110 transition-transform`}
                                            strokeWidth={active ? 2 : 1.5}
                                        />
                                        <span className="text-sm">{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Sidebar Footer */}
                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-[#22384a]">
                    <div className="flex items-center gap-2 text-sm text-[#205D80] dark:text-gray-400">
                        <BadgeCheck className="w-5 h-5" />
                        <span>Secure Student Management</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div
                className="flex-1 flex flex-col relative"
                style={{
                    marginLeft: SIDEBAR_WIDTH,
                    marginTop: 0,
                }}
            >
                {/* Navigation Controls */}
                <div className="fixed z-40 flex py-3 justify-between w-[calc(100%-256px)]">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 ml-6 rounded-full bg-white dark:bg-[#22384a] text-[#205D80] dark:text-white shadow-lg hover:bg-[#eaf6fb] dark:hover:bg-[#2a4660] transition-transform hover:scale-105"
                    >
                        <ArrowLeft size={18} />
                        <span className="text-sm cursor-pointer font-medium">Back</span>
                    </button>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 mr-6 rounded-full bg-white dark:bg-[#22384a] text-[#205D80] dark:text-white shadow-lg hover:bg-[#eaf6fb] dark:hover:bg-[#2a4660] transition-transform hover:scale-105"
                    >
                        <Home size={18} />
                        <span className="text-sm cursor-pointer font-medium">Dashboard</span>
                    </button>
                </div>

                {/* Content Container */}
                <div
                    className="overflow-y-auto no-scrollbar px-4 md:px-8"
                    style={{
                        height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
                        paddingBottom: 32,
                        marginTop: TOPBAR_HEIGHT
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default StudentLayout;