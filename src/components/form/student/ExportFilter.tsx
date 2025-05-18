'use client';

import { useMemo } from 'react';
import { generateLast5Sessions } from '@/utils/helpher';
import { Loader2 } from 'lucide-react';

type Props = {
    filters;
    isSearching: boolean;
    setFilters: (val) => void;
    onSearch: () => void;
};

const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
const classes = [
    'Play', 'Nursery', 'LKG', 'UKG', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '10', '11', '12'
];

const FilterSelect = ({
    label,
    name,
    value,
    options,
    onChange,
}: {
    label: string;
    name: string;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
    <div className="flex flex-col">
        <label className="text-xs text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white focus:ring-blue-500 focus:outline-none"
        >
            <option value="">All {label}</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

export const ExportFilter = ({ filters, setFilters, onSearch, isSearching }: Props) => {
    const sessions = useMemo(() => generateLast5Sessions(), []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="w-full shadow-sm p-6 rounded-md border border-blue-100 dark:bg-[#0f1a24]">
            <div className="flex flex-wrap gap-4 items-end justify-center">
                {/* Session */}
                <FilterSelect
                    label="Session"
                    name="session"
                    value={filters?.session}
                    options={sessions}
                    onChange={handleChange}
                />

                {/* Class */}
                <FilterSelect
                    label="Class"
                    name="currentClass"
                    value={filters?.currentClass}
                    options={classes}
                    onChange={handleChange}
                />

                {/* Section */}
                <FilterSelect
                    label="Section"
                    name="section"
                    value={filters?.section}
                    options={sections}
                    onChange={handleChange}
                />

                {/* Gender */}
                <FilterSelect
                    label="Gender"
                    name="gender"
                    value={filters?.gender}
                    options={['Male', 'Female', 'Other']}
                    onChange={handleChange}
                />

                {/* Search Button */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-transparent mb-1">.</label>
                    <button
                        onClick={onSearch}
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm font-medium rounded-md px-8 py-1.5"
                    >
                        {isSearching ? <p className='px-3'><Loader2 className='animate-spin' size={20} /></p> : "Search"}

                    </button>
                </div>
            </div>
        </div>
    );
};
