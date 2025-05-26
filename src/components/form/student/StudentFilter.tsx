'use client';

import { useMemo } from 'react';
import { generateLast5Sessions } from '@/utils/helpher';
import { Loader2, Search } from 'lucide-react';

type Props = {
    filters;
    setFilters: (v) => void;
    onSearch: () => void;
    isSearching: boolean;
};

const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
const classes = [
    'Play', 'Nursery', 'LKG', 'UKG', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '10', '11', '12'
];


const StudentFilter = ({ filters, setFilters, onSearch, isSearching }: Props) => {
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
                {/* Search */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                    <div className="relative">
                        <span className="absolute left-2.5 top-2.5 text-gray-400">
                            <Search size={14} />
                        </span>
                        <input
                            type="text"
                            name="search"
                            placeholder="Name, Admission No., Mobile..."
                            className="pl-8 pr-2 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                            value={filters?.search}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                </div>

                {/* Session */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session</label>
                    <select
                        name="session"
                        className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-36"
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
                        className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
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
                        className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-28"
                        value={filters?.section}
                        onChange={handleChange}
                    >
                        <option value="">Select Section</option>
                        {sections.map((sec) => (
                            <option key={sec} value={sec}>{sec}</option>
                        ))}
                    </select>
                </div>



                {/* Gender */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                    <select
                        name="gender"
                        className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                        value={filters?.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Reset Button */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-transparent mb-1">.</label>
                    <button
                        onClick={onSearch}
                        disabled={isSearching}
                        className="bg-green-60 cursor-pointer bg-[#205D80] hover:bg-[#205D90] text-white dark:text-gray-100 text-sm font-medium rounded-md px-4 py-1.5 dark:hover:bg-gray-600 transition"
                    >
                        {isSearching ? <p className='px-3'> <Loader2 size={18} className='animate-spin' /></p> : "search"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentFilter;
