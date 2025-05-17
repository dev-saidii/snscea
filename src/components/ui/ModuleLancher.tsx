"use client";

import { useRouter } from "next/navigation";
import {
    BookOpen,
    Users,
    Settings,
    BadgeCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

const modules = [
    {
        key: "student",
        title: "Student Management",
        description: "Manage admissions, student data, and updates.",
        icon: <Users size={32} className="text-[#205D80]" />,
        path: "/dashboard/students",
    },
    // {
    //     key: "account",
    //     title: "Fees Management",
    //     description: "Manage fees, payments, and transactions.",
    //     icon: <FileText size={32} className="text-[#205D80]" />,
    //     path: "/dashboard/accounts",
    // },
    {
        key: "marksheet",
        title: "Marksheet Management",
        description: "Generate and manage student marksheets.",
        icon: <BadgeCheck size={32} className="text-[#205D80]" />,
        path: "/dashboard/marksheets",
    },
    {
        key: "setting",
        title: "Admin Settings",
        description: "Manage admins and profile settings.",
        icon: <Settings size={32} className="text-[#205D80]" />,
        path: "/dashboard/settings",
    },
    {
        key: "website",
        title: "Website Management",
        description: "Control public site content and appearance.",
        icon: <BookOpen size={32} className="text-[#205D80]" />,
        path: "/dashboard/website",
    },
];

const ModuleLauncher = () => {
    const router = useRouter();
    const [allowedModules, setAllowedModules] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("saidii-user");

        if (storedUser) {
            try {
                const parsedAccess = JSON.parse(storedUser);
                setAllowedModules(parsedAccess.access || []);
            } catch (e) {
                console.error("Invalid access data", e);
            }
        }

        setTimeout(() => setLoading(false), 800); // add slight delay for UX
    }, []);

    const filteredModules = modules.filter((mod) =>
        allowedModules.includes(mod.key)
    );

    return (
        <div className="p-12 bg-gradient-to-br from-[#eaf6fb] to-[#f6fbff] min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-[#205D80] text-center drop-shadow-sm">
                Select a Module
            </h2>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 h-[220px]"
                        >
                            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-4" />
                            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                            <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                        </div>
                    ))}
                </div>
            ) : filteredModules.length === 0 ? (
                <div className="max-w-md mx-auto mt-12 p-6 bg-yellow-50 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg text-center text-yellow-800 dark:text-yellow-200">
                    <div className="text-5xl mb-4">⚠️</div>
                    <p className="text-lg font-semibold mb-2">
                        Access Denied
                    </p>
                    <p className="text-sm">
                        You don&apos;t have access to any modules. Please contact your administrator.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredModules.map((module) => (
                        <div
                            key={module.title}
                            className="group bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col min-h-[220px] transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl hover:border-[#205D80]/60"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-[#205D80]/10 rounded-full p-2 group-hover:bg-[#205D80]/20">
                                    {module.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-[#205D80] group-hover:text-[#17425a]">
                                    {module.title}
                                </h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-5 flex-1">
                                {module.description}
                            </p>
                            <button
                                onClick={() => router.push(module.path)}
                                className="mt-auto bg-[#205D80] cursor-pointer text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-[#17425a] transition-colors"
                            >
                                Go
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ModuleLauncher;
