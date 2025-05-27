"use client";

import { changePassword, logout } from "@/services/auth";
import { AxiosError } from "axios";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            Swal.fire("Warning", "New passwords do not match", "warning");
            return;
        }

        if (newPassword.length < 6) {
            Swal.fire("Warning", "Password must be at least 6 characters long", "warning");
            return;
        }

        try {
            setLoading(true);
            const pass = { oldPassword: currentPassword, newPassword };
            const res = await changePassword(pass);

            if (!res.success) {
                Swal.fire("Error", "Enter current password not matched", "error");
            } else {
                Swal.fire("Success", "Password changed successfully!", "success");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                logout();
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            console.error("Password Change Error:", axiosError);
            if (axiosError.response?.status === 400) {
                return Swal.fire("Error", "Enter current password not matched", "error");
            }
            Swal.fire("Error", "Internal error. Try again later.", "error");
        } finally {
            setLoading(false);
        }
    };

    const SIDEBAR_WIDTH = 16; // Tailwind w-64
    const TOPBAR_HEIGHT = 64;  // Tailwind h-16
    const router = useRouter();

    return (
        <div className="max-w-xl mx-auto p-8 dark:bg-[#1a2d3b] border border-blue-100 shadow rounded-md mt-20">
            {/* Fixed Back Button */}
            <button
                onClick={() => router.back()}
                className="fixed z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#22384a] text-[#205D80] dark:text-white shadow hover:bg-[#eaf6fb] dark:hover:bg-[#2a4660] transition"
                style={{
                    top: TOPBAR_HEIGHT + 16, // 16px gap below TopBar
                    left: SIDEBAR_WIDTH + 24, // 24px gap from sidebar
                }}
            >
                <ArrowLeft size={18} />
                <span className="text-sm cursor-pointer font-medium">Back</span>
            </button>


            {/* Fixed Back Button */}
            <button
                onClick={() => router.push('/dashboard')}
                className="fixed z-40 cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#22384a] text-[#205D80] dark:text-white shadow hover:bg-[#eaf6fb] dark:hover:bg-[#2a4660] transition"
                style={{
                    top: TOPBAR_HEIGHT + 16,
                    right: 24,
                }}
            >
                <Home size={18} /> Dashboard
            </button>
            <h1 className="text-2xl font-bold text-[#205D80] text-center dark:text-white mb-6">
                Change Password
            </h1>
            <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                    </label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-blue-200  rounded dark:bg-[#22384a] dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-blue-200  rounded dark:bg-[#22384a] dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-blue-200  rounded dark:bg-[#22384a] dark:text-white"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer bg-[#205D80] hover:bg-[#1a4d6d] text-white font-medium py-2 px-4 rounded transition"
                >
                    {loading ? "Changing..." : "Change Password"}
                </button>
            </form>
        </div>
    );
}
