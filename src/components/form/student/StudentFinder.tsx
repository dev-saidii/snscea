'use client';

import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { getStudentByAdmissionNumber } from '@/services/student';
import { Student } from '@/types/type';
import Image from 'next/image';

interface Props {
    onStudentFound: (data: Student) => void;
}

export default function StudentFinder({ onStudentFound }: Props) {
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [foundStudent, setFoundStudent] = useState<Student | null>(null);

    const findStudent = async () => {
        if (!admissionNumber.trim()) {
            toast.error('Enter Student ID');
            return;
        }

        try {
            setFoundStudent(null)
            setLoading(true);
            const student = await getStudentByAdmissionNumber(admissionNumber);
            setFoundStudent(student);
            onStudentFound(student)
        } catch (err) {
            console.log(err)
            setFoundStudent(null);
            toast.error('Student not found!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-4 shadow-sm p-6 rounded-sm border border-blue-100">
            {/* Input and Button */}
            <div className="flex items-center gap-4 justify-between">
                <input
                    id="student-admisionNumber"
                    type="text"
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                    placeholder="Enter Student Admission Number"
                    className="w-[60%] pl-4 py-2 text-sm rounded-sm border border-gray-300 dark:border-gray-600 
                               dark:bg-[#13222f] dark:text-white focus:outline-none focus:ring-2 
                               focus:ring-primary-500 focus:border-transparent transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && findStudent()}
                />
                <button
                    onClick={findStudent}
                    disabled={loading}
                    className="px-4 py-2 cursor-pointer bg-[#205D80] hover:bg-[#205D90] text-white rounded-lg flex items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Search size={17} />}
                    <span>Search</span>
                </button>
            </div>

            {/* Student Preview */}
            {foundStudent && (
                <div className="mt-6 p-6 text-sm rounded-lg border border-blue-100 dark:border-gray-700 dark:bg-transparent flex justify-between items-start gap-6">
                    {/* Left - Text */}
                    <div className="flex-1 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 items-baseline">
                        <label className="font-medium text-gray-500 dark:text-gray-400">
                            Admission Number:
                        </label>
                        <p className="font-mono text-gray-700 dark:text-gray-300">
                            {foundStudent.admissionNumber}
                        </p>

                        <label className="font-medium text-gray-500 dark:text-gray-400">
                            Student Name:
                        </label>
                        <p className="dark:text-white">
                            {foundStudent.name}
                        </p>

                        <label className="font-medium text-gray-500 dark:text-gray-400">
                            Father Name:
                        </label>
                        <p className="font-mono text-gray-700 dark:text-gray-300">
                            {foundStudent.fatherName}
                        </p>

                        <label className="font-medium text-gray-500 dark:text-gray-400">
                            Mother Name:
                        </label>
                        <p className="font-mono text-gray-700 dark:text-gray-300">
                            {foundStudent.motherName}
                        </p>
                        <label className="font-medium text-gray-500 dark:text-gray-400">
                            Class :
                        </label>
                        <p className="font-mono text-gray-700 dark:text-gray-300">
                            {foundStudent.currentClass}({foundStudent.section})
                        </p>

                        <label className="font-medium text-gray-500 dark:text-gray-400">
                            Session :
                        </label>
                        <p className="font-mono text-gray-700 dark:text-gray-300">
                            {foundStudent.session}
                        </p>
                        <label className="font-medium text-gray-500 dark:text-gray-400">
                            Address :
                        </label>
                        <p className="font-mono text-gray-700 dark:text-gray-300">
                            {foundStudent.address}
                        </p>
                    </div>

                    {/* Right - Image */}
                    <div className="w-28 h-28 rounded-lg border dark:border-gray-600 overflow-hidden 
                                   bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                        {foundStudent.photo ? (
                            <Image src={foundStudent.photo} alt="Preview" width={35} height={35}/>

                        ) : (
                            <span className="text-gray-400 text-xs text-center p-2">
                                No photo available
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}