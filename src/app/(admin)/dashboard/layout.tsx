"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/ui/TopBar";
import Swal from "sweetalert2";
import { verifyUser } from "@/services/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("User");

    const router = useRouter();

    const userVerification = async () => {
        try {
            const res = await verifyUser();

            localStorage.setItem("saidii-user", JSON.stringify(res.user));
            setUserName(res.user.name.split(" ")[0]);
            setLoading(false);
        } catch (err) {
            // Handle 401 or 403 specifically
            if (err.response?.status === 401 || err.response?.status === 403) {
                router.replace("/login");
                Swal.fire({
                    title: "Login Required",
                    text: "You must be logged in to access this page.",
                    icon: "warning",
                    confirmButtonText: "Go to Login",
                    confirmButtonColor: "#2563eb"
                });
            } else {
                console.error("Unexpected error:", err);
                router.replace("/");
                Swal.fire({
                    title: "Server Error",
                    icon: "error",
                    confirmButtonText: "Go to Home",
                    confirmButtonColor: "#2563eb"
                });
            }
        }
    };

    useEffect(() => {
        userVerification()

    }, [router]);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center min-h-screen px-4 bg-[#f6fbff] dark:bg-gray-900">
                <div className="w-full max-w-xl space-y-4">
                    <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
                <span className="text-[#205D80] dark:text-white text-base font-semibold mt-6">Loading dashboard...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eaf6fb] to-[#f6fbff] dark:bg-gray-900">
            <div className="fixed top-0 left-0 w-full z-30">
                <TopBar userName={userName || "User"} />
            </div>
            <main className="pt-16 w-full">{children}</main>
        </div>
    );
}
