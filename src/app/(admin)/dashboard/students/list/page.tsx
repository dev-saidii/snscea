'use client';

import Pagination from '@/components/form/student/Pagination';
import StudentFilter from '@/components/form/student/StudentFilter';
import StudentList from '@/components/form/student/StudentList';
import { deleteStudentById, deleteStudentsBulk, getStudents } from '@/services/student';
import { Student } from '@/types/type';
import { getCurrentSession } from '@/utils/helpher';
import { printMultipleStudentFeeCards } from '@/utils/print/printFeeCard';
import { printMultipleStudentIdCards, printSingleStudentIdCard, } from '@/utils/print/printStudentIdCard';
import { CreditCard, IdCard, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [pagination, setPagination] = useState({ total: 0, totalPage: 0, currentPage: 0, pageSize: 10 });
    const [filters, setFilters] = useState({
        search: '',
        currentClass: '',
        section: '',
        session: getCurrentSession(),
        gender: '',
        page: 1,
        limit: 15,
    });
    const router = useRouter();

    const fetchStudents = async () => {
        setLoading(true)
        const data = await getStudents(filters).finally(() => setLoading(false));
        if (data.success) {
            setStudents(data.students);
            setPagination(data.pagination);
        }
    };

    const handleSearch = () => {
        fetchStudents();
    }

    const handleView = (student: Student) => {
        sessionStorage.setItem("studentFilters", JSON.stringify(filters));
        router.push(`/dashboard/students/view?id=${student._id}`);
    };
    const handleEdit = (student: Student) => {
        sessionStorage.setItem("studentFilters", JSON.stringify(filters));
        router.push(`/dashboard/students/edit?id=${student._id}`);
    };

    useEffect(() => {
        const savedFilters = sessionStorage.getItem("studentFilters");

        if (savedFilters) {
            setFilters(JSON.parse(savedFilters));
        }
        fetchStudents();

        // Optionally clear after restore
        sessionStorage.removeItem("studentFilters");
    }, []);


    const handleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };
    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? students.map((s: Student) => s._id) : []);
    };

    const handlePrintIdCard = async (student: Student) => {
        await printSingleStudentIdCard(student)
    }

    const handleBulkPrintIdCard = async () => {
        const selected = students.filter((s: Student) => selectedIds.includes(s._id));
        await printMultipleStudentIdCards(selected);
    }
    const handleBulkPrintFeeCard = async () => {
        const selected = students.filter((s: Student) => selectedIds.includes(s._id));
        printMultipleStudentFeeCards(selected);
    }

    const handleDelete = async (student: Student) => {
        const confirm = await Swal.fire({
            title: `Delete ${student.name}?`,
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete",
        });

        if (!confirm.isConfirmed) return;

        try {
            setIsDeleting(student._id)
            const res = await deleteStudentById(student._id);
            Swal.fire("Deleted!", `${student.name} has been deleted.`, "success");
            console.log("Deleted", res);
            fetchStudents()
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Deletion failed.", "error");
        } finally {
            setIsDeleting(student._id)
        }
    };

    const handleBulkDelete = async () => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Selected students will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete them!",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await deleteStudentsBulk(selectedIds);
            Swal.fire("Deleted!", "Students have been deleted.", "success");
            console.log("Bulk Deleted", res);
            fetchStudents()
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Bulk delete failed.", "error");
        }
    };



    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold  text-[#205D80] text-center drop-shadow-sm pb-4 uppercase">Student Admissions</h1>

            {selectedIds.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-between items-center mb-6 p-3 px-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {selectedIds.length} student{selectedIds.length > 1 ? "s" : ""} selected
                    </span>

                    <div className="flex flex-wrap gap-3 justify-between items-center">
                        <button
                            onClick={handleBulkDelete}
                            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>

                        <button
                            onClick={handleBulkPrintIdCard}
                            className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all"
                        >
                            <IdCard size={16} />
                            Print ID Cards
                        </button>

                        <button
                            onClick={handleBulkPrintFeeCard}
                            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all"
                        >
                            <CreditCard size={16} />
                            Print Fee Cards
                        </button>
                    </div>
                </div>
            )}


            <StudentFilter filters={filters} setFilters={setFilters} onSearch={handleSearch} isSearching={loading} />
            {loading ? (
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
            ) : (
                <>
                    <StudentList students={students}
                        isDeleting={isDeleting}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onPrintId={handlePrintIdCard}
                        selectedIds={selectedIds}
                        onSelect={handleSelect}
                        onSelectAll={handleSelectAll} />
                    <Pagination pagination={pagination} setFilters={setFilters} />
                </>)}
        </div>
    );
};

export default StudentsPage;
