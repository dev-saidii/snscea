"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/ui/TopBar";
import Swal from "sweetalert2";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("User");

    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("saidii-user");

        if (!user) {
            Swal.fire({
                title: "Login Required",
                text: "You must be logged in to access this page.",
                icon: "warning",
                confirmButtonText: "Go to Login",
                confirmButtonColor: "#2563eb"
            }).then(() => {
                router.replace("/login");
            });
        } else {
            const parsedUser = JSON.parse(user || "")
            setLoading(false);
            setUserName(parsedUser.name.split(" ")[0])
        }
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
