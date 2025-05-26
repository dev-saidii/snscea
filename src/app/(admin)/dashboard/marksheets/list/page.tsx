'use client';

import MarksheetList from '@/components/form/marksheet/MarksheetList';
import Pagination from '@/components/form/student/Pagination';
import StudentFilter from '@/components/form/student/StudentFilter';
import { deleteMarksheetById, getMarksheets } from '@/services/marksheet';
import { getCurrentSession } from '@/utils/helpher';
import { printReportCard } from '@/utils/print/printReportCard';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const MarksheetPage = () => {
    const [marksheets, setMarksheets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState("");
    const [pagination, setPagination] = useState({ total: 0, totalPage: 0, currentPage: 0, pageSize: 10 });
    const [filters, setFilters] = useState({
        search: '',
        currentClass: '',
        section: '',
        session: getCurrentSession(),
        gender: '',
        page: 1,
        limit: 10,
    });

    const fetchMarksheets = async () => {
        setLoading(true)
        const data = await getMarksheets(filters).finally(() => setLoading(false));
        if (data.success) {
            setMarksheets(data.marksheets);
            setPagination(data.pagination);
        }
    };

    const handlePrintReportCard = async (marksheet) => {
        printReportCard(marksheet);
    }


    const handleDelete = async (marksheet) => {
        const confirm = await Swal.fire({
            title: `Delete ${marksheet.name}?`,
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete",
        });

        if (!confirm.isConfirmed) return;

        try {
            setIsDeleting(marksheet._id)
            const res = await deleteMarksheetById(marksheet._id);
            Swal.fire("Deleted!", `${marksheet.name} has been deleted.`, "success");
            console.log("Deleted", res);
            fetchMarksheets()
        } catch (err) {
            console.error(err);
            if (err.response.status === 403) {
                Swal.fire({
                    title: 'Access Denied',
                    text: 'You do not have permission to access this resource.',
                    icon: 'warning',
                });
                return;
            }
            Swal.fire("Error!", "Deletion failed.", "error");
        } finally {
            setIsDeleting("")
        }
    };

    const handleSearch = () => {
        fetchMarksheets()
    }


    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Student Admissions</h1>


            <StudentFilter filters={filters} setFilters={setFilters} onSearch={handleSearch}  isSearching={loading}/>
            {loading ? (
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
            ) : (
                <>
                    <MarksheetList marksheets={marksheets}
                        isDeleting={isDeleting}
                        onDelete={handleDelete}
                        onPrint={handlePrintReportCard} />
                    <Pagination pagination={pagination} setFilters={setFilters} />
                </>)}
        </div>
    );
};

export default MarksheetPage;
