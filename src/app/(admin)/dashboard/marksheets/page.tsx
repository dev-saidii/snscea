"use client";

export default function MarksheetsModuleHome() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="dark:bg-[#1a2d3b] rounded-sm shadow-xl px-8 py-6 max-w-lg text-center">
                <h1 className="text-2xl font-bold text-[#205D80] dark:text-white mb-2">
                    Welcome to the Marksheets Module
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Please select an option from the sidebar to add a new marksheet, view all marksheets, or manage templates.
                </p>
                <div className="flex items-center justify-center gap-6 mt-4">
                    <span className="inline-block w-3 h-3 bg-[#205D80] rounded-full animate-pulse"></span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">System ready!</span>
                </div>
            </div>
        </div>
    );
}
