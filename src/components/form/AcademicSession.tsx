'use client';

import { generateLast5Sessions, getCurrentSession } from '@/utils/helpher';
import { useMemo } from 'react';

interface AcademicSessionProps {
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export default function AcademicSession({
    defaultValue,
    onChange,
}: AcademicSessionProps) {
    const sessions = useMemo(() => generateLast5Sessions(), []);

    const currentValue = defaultValue || getCurrentSession();

    return (
        // <div className="space-y-6 shadow-sm p-6 border rounded-sm text-gray-500 border-blue-100 dark:border-gray-700" >
        <div className="space-y-2" >
            <label className="text-sm font-medium dark:text-gray-300 mb-2" >
                Academic Session
            </label>
            <select
                required
                className="w-full text-xs p-2 border rounded-sm mt-2 dark:bg-gray-800 dark:border-gray-600 focus:ring-1 focus:ring-blue-200 focus:border-transparent"
                defaultValue={currentValue}
                onChange={(e) => onChange?.(e.target.value)
                }
            >
                {
                    sessions.map((session) => (
                        <option key={session} value={session} className="dark:bg-gray-800 w-full text-xs cursor-pointer px-4 py-2" >
                            {session}
                        </option>
                    ))
                }
            </select>
        </div>
        // </div>
    );
}

