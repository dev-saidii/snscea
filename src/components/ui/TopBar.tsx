"use client";
import { Moon, Sun, LogOut, User, KeyRound } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { logout } from "@/services/auth";
import Swal from "sweetalert2";

const TopBar = ({ userName }: { userName: string }) => {
    const { theme, setTheme } = useTheme();

    const toggleDarkMode = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout!',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            await logout();
        }
    }

    return (
        <header className="w-full h-16 bg-[#205D80] dark:bg-[#001c64] text-white px-4 py-3 flex items-center justify-between shadow-lg transition-colors z-50">
            {/* Left: Logo & Title */}
            <div className="flex items-center space-x-3">
                <div className="bg-white rounded-full p-1 shadow-md">
                    <Image
                        src="/favicon.ico"
                        alt="Logo"
                        width={36}
                        height={36}
                        className="rounded-full"
                        priority
                    />
                </div>
                <h1 className="text-base sm:text-lg font-bold tracking-wide drop-shadow-sm">
                    {process.env.NEXT_PUBLIC_INSTITUTE_TITLE} - Academics Information System
                </h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4 sm:space-x-6">
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    aria-label="Toggle Dark Mode"
                    className="p-2 rounded-full hover:bg-[#ffffff22] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                    {theme === "dark" ? (
                        <Sun size={22} className="text-yellow-300" />
                    ) : (
                        <Moon size={22} className="text-blue-100" />
                    )}
                </button>

                {/* Divider */}
                <div className="hidden sm:block h-6 w-px bg-white/30" />

                {/* Change Password */}
                <a
                    href="/dashboard/change-password"
                    className="flex items-center gap-1 text-sm font-medium hover:underline hover:text-yellow-200 transition-colors"
                >
                    <KeyRound size={18} className="inline-block" />
                    Change Password
                </a>

                {/* Logout */}
                <button
                    className="flex items-center cursor-pointer gap-1 text-sm font-medium hover:underline hover:text-red-200 transition-colors"
                    onClick={handleLogout}
                >
                    <LogOut size={18} className="inline-block" />
                    Logout
                </button>

                {/* User */}
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                    <User size={18} className="text-white/80" />
                    <span className="font-semibold text-sm truncate max-w-[100px]">{userName}</span>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
