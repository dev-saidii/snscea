"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Home, ReceiptText, CreditCard, BarChart3 } from "lucide-react";

const navLinks = [
    { label: "Collect Fee", href: "/dashboard/fees/collect", icon: CreditCard },
    { label: "Fee Records", href: "/dashboard/fees/records", icon: ReceiptText },
    { label: "Reports", href: "/dashboard/fees/reports", icon: BarChart3 },
];

const SIDEBAR_WIDTH = 256; // w-64
const TOPBAR_HEIGHT = 64;  // h-16

const FeeLayout = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div
            className={`flex transition-colors duration-200 ${theme === "dark"
                    ? "bg-gradient-to-br from-[#101e2a] to-[#1a2d3b]"
                    : "bg-gradient-to-br from-[#eaf6fb] to-[#f6fbff]"
                }`}
            style={{ height: `calc(100vh - ${TOPBAR_HEIGHT}px)` }}
        >
            {/* Sidebar */}
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
                <h2 className="text-2xl font-bold text-center text-[#205D80] dark:text-white mb-8 tracking-tight">
                    Fee & Account
                </h2>
                <nav className="flex-1">
                    <ul className="space-y-2">
                        {navLinks.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${active
                                                ? "bg-[#205D80] text-white shadow"
                                                : "text-[#205D80] dark:text-white hover:bg-[#eaf6fb] dark:hover:bg-[#22384a]"
                                            }`}
                                    >
                                        <link.icon size={20} />
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div
                className="flex-1 flex flex-col relative"
                style={{
                    marginLeft: SIDEBAR_WIDTH,
                    marginTop: TOPBAR_HEIGHT,
                }}
            >
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="fixed z-40 cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#22384a] text-[#205D80] dark:text-white shadow hover:bg-[#eaf6fb] dark:hover:bg-[#2a4660] transition"
                    style={{
                        top: TOPBAR_HEIGHT + 16,
                        left: SIDEBAR_WIDTH + 24,
                    }}
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back</span>
                </button>

                {/* Home Button */}
                <button
                    onClick={() => router.push("/dashboard")}
                    className="fixed z-40 cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#22384a] text-[#205D80] dark:text-white shadow hover:bg-[#eaf6fb] dark:hover:bg-[#2a4660] transition"
                    style={{
                        top: TOPBAR_HEIGHT + 16,
                        right: 24,
                    }}
                >
                    <Home size={18} />Dashboard
                </button>

                {/* Content */}
                <div
                    className="overflow-y-auto no-scrollbar px-4 md:px-8"
                    style={{
                        height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
                        paddingBottom: 32,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FeeLayout;
