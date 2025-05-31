"use client";

import { useTheme } from "next-themes";

export default function StudentModuleHome() {
    const { theme } = useTheme();

    const isDark = theme === "dark";

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div
                className={`rounded-sm shadow-xl px-8 py-6 max-w-lg text-center transition-colors duration-300 
                    ${isDark ? "bg-[#1a2d3b]" : "bg-white"}
                `}
            >
                <h1 className={`text-2xl font-bold mb-2 transition-colors 
                    ${isDark ? "text-white" : "text-[#205D80]"}
                `}>
                    Welcome to the Student Module
                </h1>

                <p className={`mb-4 transition-colors 
                    ${isDark ? "text-gray-300" : "text-gray-600"}
                `}>
                    Please select an option from the sidebar to get started with student admissions, view the student list, or generate ID cards.
                </p>

                <div className="flex items-center justify-center gap-6 mt-4">
                    <span className="inline-block w-3 h-3 bg-[#205D80] rounded-full animate-pulse"></span>
                    <span className={`text-sm transition-colors 
                        ${isDark ? "text-gray-400" : "text-gray-500"}
                    `}>
                        Ready when you are!
                    </span>
                </div>
            </div>
        </div>
    );
}
