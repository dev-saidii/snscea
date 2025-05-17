'use client';

import AcademicSession from "../AcademicSession";

const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
const classes = [
    'Play', 'Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];

interface Props {
    admissionNumber: string;
    penNumber: string;
    currentClass: string;
    section: string;
    rollNumber: string;
    session: string;
    setPenNumber: (val: string) => void;
    setCurrentClass: (val: string) => void;
    setSection: (val: string) => void;
    setRollNumber: (val: string) => void;
    setSession: (val: string) => void;
}

export default function AcademicDetails({
    admissionNumber,
    penNumber,
    currentClass,
    section,
    rollNumber,
    session,
    setPenNumber,
    setCurrentClass,
    setSection,
    setRollNumber,
    setSession,
}: Props) {
    return (
        <div className="w-full space-y-4 shadow-sm p-6 rounded-sm border border-blue-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Admission Number <span className="text-xs text-gray-500">(auto-generated)</span>
                    </label>
                    <input
                        type="text"
                        value={admissionNumber || ''}
                        disabled
                        readOnly
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#1e2e3b] text-gray-500 dark:text-gray-400 px-4 py-2 cursor-not-allowed"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        PEN Number
                    </label>
                    <input
                        type="text"
                        value={penNumber}
                        onChange={(e) => setPenNumber(e.target.value)}
                        placeholder="PEN Number"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Class
                    </label>
                    <select
                        required
                        value={currentClass}
                        onChange={(e) => setCurrentClass(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="">Select class</option>
                        {classes.map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Section
                    </label>
                    <select
                        required
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="">Select section</option>
                        {sections.map((sec) => (
                            <option key={sec} value={sec}>{sec}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Roll Number
                    </label>
                    <input
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        placeholder="Roll Number"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <div className="space-y-2">
                    {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Session
                    </label>
                    <input
                        type="text"
                        value={session}
                        onChange={(e) => setSession(e.target.value)}
                        placeholder="e.g. 2024-25"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    /> */}
                    <AcademicSession onChange={setSession} defaultValue={session} />
                </div>
            </div>
        </div>
    );
}
