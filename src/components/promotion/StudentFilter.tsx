'use client';

import { useMemo } from 'react';
import { generateLast5Sessions } from '@/utils/helpher';
import { Loader2 } from 'lucide-react';

type Props = {
    filters;
    setFilters: (v) => void;
    onSearch: () => void
    loading: boolean
};

const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
const classes = [
    'Play', 'Nursery', 'LKG', 'UKG', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '10', '11', '12'
];


const StudentFilter = ({ filters, setFilters, onSearch, loading }: Props) => {
    const sessions = useMemo(() => generateLast5Sessions(), []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            page: 1,
        }));
    };

    return (
        <div className="w-full shadow-sm p-6 rounded-md border border-blue-100 dark:bg-[#0f1a24]">
            <div className="flex flex-wrap gap-3 items-end justify-between">
                {/* Session */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session</label>
                    <select
                        name="session"
                        className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
                        value={filters?.session}
                        onChange={handleChange}
                    >
                        <option value="">Select Session</option>
                        {sessions.map((session) => (
                            <option key={session} value={session}>{session}</option>
                        ))}
                    </select>
                </div>


                {/* Class */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
                    <select
                        name="currentClass"
                        className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
                        value={filters?.currentClass}
                        onChange={handleChange}
                    >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>

                {/* Section */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section</label>
                    <select
                        name="section"
                        className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
                        value={filters?.section}
                        onChange={handleChange}
                    >
                        <option value="">All Section</option>
                        {sections.map((sec) => (
                            <option key={sec} value={sec}>{sec}</option>
                        ))}
                    </select>
                </div>


                {/* Search Button */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-transparent mb-1">.</label>
                    <button
                        disabled={loading}
                        onClick={onSearch}
                        className="bg-blue-200 cursor-pointer dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm font-medium rounded-md px-4 py-1.5 hover:bg-blue-300 dark:hover:bg-gray-600 transition"
                    >
                        {loading ? <p className='px-3'><Loader2 className='animate-spin' size={20}/></p> : <span> Search</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentFilter;
