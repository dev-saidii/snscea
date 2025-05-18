'use client';
import PromotionModal from '@/components/promotion/PromotioModal';
import StudentFilter from '@/components/promotion/StudentFilter';
import StudentList from '@/components/promotion/StudentList';
import { getFilteredStudents } from '@/services/student';
import { IdCard, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export type Student = {
    _id: string;
    name: string;
    rollNumber: string;
    fatherName: string;
    mobile: string;
    admissionNumber: string;
    currentClass: string;
    section: string;
    session: string;
    gender: string;
};

const StudentsPage = () => {
    const [loading, setLoading] = useState(false)
    const [promotionModal, setPromotionModal] = useState(false)
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [filters, setFilters] = useState({
        currentClass: '',
        section: '',
        session: '',
        gender: '',
    });

    const fetchStudents = async () => {
        try {
            setLoading(true)
            const data = await getFilteredStudents(filters);
            setStudents(data)
            setSelectedIds([])
        } catch (error) {
            console.log(error)
            toast.error("No Student Found with Filter")

        } finally {
            setLoading(false)
        }

    };


    const handleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };
    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? students.map((s) => s._id) : []);
    };
    const handleSearch = async () => {
        if (!filters.session || !filters.currentClass) return toast.error("Select session and class")
        fetchStudents();
    }

    const handlePromote = async () => {
        setPromotionModal(true)
    }

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold  text-[#205D80] text-center drop-shadow-sm pb-4 uppercase">Student Promotion to Next Class</h1>
            <PromotionModal
                isOpen={promotionModal}
                onClose={() => setPromotionModal(false)}
                studentIds={selectedIds}
                onSuccess={fetchStudents}
            />
            {selectedIds.length > 0 && (
                <div className="flex flex-wrap gap-3 items-center justify-between mb-2 p-3 px-10 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {selectedIds.length} student{selectedIds.length > 1 ? "s" : ""} selected to promote
                    </span>

                    <button
                        onClick={handlePromote}
                        className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all"
                    >
                        <IdCard size={16} />
                        Promote Student
                    </button>

                </div>
            )}

            <StudentFilter filters={filters} setFilters={setFilters} onSearch={handleSearch} loading={loading} />

            <div className="relative min-h-[100px] rounded-lg dark:bg-gray-900 p-4">
                {loading ? (
                    <div className="flex justify-center items-center h-24">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    </div>
                ) : (
                    <StudentList
                        students={students}
                        selectedIds={selectedIds}
                        onSelect={handleSelect}
                        onSelectAll={handleSelectAll}
                    />
                )}
            </div>


        </div>
    );
};

export default StudentsPage;
