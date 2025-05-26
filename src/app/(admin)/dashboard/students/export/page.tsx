'use client';

import { useState } from 'react';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import Papa from 'papaparse';
import { ExportFilter } from '@/components/form/student/ExportFilter';
import { getCurrentSession } from '@/utils/helpher';
import { getExportableStudents } from '@/services/student';
import { Loader2 } from 'lucide-react';
import { Student } from '@/types/type';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';



export default function ExportPage() {
    const [data, setData] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState({
        session: getCurrentSession(),
        currentClass: '',
        section: '',
        gender: '',
    });

    const fetchStudents = async () => {
        try {
            setLoading(true)
            const data = await getExportableStudents(filters).finally(() => setLoading(false));
            if (data.success) {
                setData(data.students);
            }
        } catch (error) {
            if (error.response.status === 403) {
                Swal.fire({
                    title: 'Access Denied',
                    text: 'You do not have permission to access this resource.',
                    icon: 'warning',
                });
                return;
            }
        }


    };

    const handleSearch = () => {
        if (!filters.session) return toast.error("Please Select Session")
        if (!filters.currentClass) return toast.error("Please Select Class")

        fetchStudents();
    }


    const exportToExcel = () => {
        const worksheet = XLSXUtils.json_to_sheet(data);
        const workbook = XLSXUtils.book_new();
        XLSXUtils.book_append_sheet(workbook, worksheet, 'Students');
        writeFile(workbook, `Session_${filters.session}_Class-${filters.currentClass || "All"}_students.xlsx`);
    };

    // const exportToCSV = () => {
    //     const csv = Papa.unparse(data);
    //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    //     const link = document.createElement('a');
    //     link.href = URL.createObjectURL(blob);
    //     link.setAttribute('download', `Session_${filters.session}_Class-${filters.currentClass || "All"}_students.csv`);
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const exportToPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Adm No', 'Name', 'Class', 'Section', 'Gender', 'Father', 'Mother', 'Mobile', 'Session']],
            body: data.map((d) => [
                d.admissionNumber,
                d.name,
                d.currentClass,
                d.section,
                d.gender,
                d.fatherName,
                d.motherName,
                d.mobile,
                d.session,
            ]),
        });
        doc.save(`Session_${filters.session}_Class-${filters.currentClass || "All"}_students.pdf`);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold  text-[#205D80] text-center drop-shadow-sm pb-4 uppercase">Export Student Data</h2>

            <ExportFilter filters={filters} setFilters={setFilters} onSearch={handleSearch} isSearching={loading} />
            <br />

            {!loading && data.length > 0 &&
                <div className="flex gap-4 mb-6 justify-center">
                    <button
                        onClick={exportToExcel}
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-xs text-white px-4 py-2 rounded"
                    >
                        Export to Excel
                    </button>
                    {/* <button
                        onClick={exportToCSV}
                        className="bg-green-600 cursor-pointer hover:bg-green-700 text-xs text-white px-4 py-2 rounded"
                    >
                        Export to CSV
                    </button> */}
                    <button
                        onClick={exportToPDF}
                        className="bg-red-600 cursor-pointer hover:bg-red-700 text-xs text-white px-4 py-2 rounded"
                    >
                        Export to PDF
                    </button>
                </div>}

            {!data.length ?

                <div className="flex items-center justify-center py-10">
                    <p className="text-gray-400 text-lg">No students found.</p>
                </div> :

                loading ? <Loader2 className='animate-spin' />
                    :

                    <table className="w-full text-sm border border-gray-300 dark:border-gray-600">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="border px-3 py-2">Admission No</th>
                                <th className="border px-3 py-2">Name</th>
                                <th className="border px-3 py-2">Class</th>
                                <th className="border px-3 py-2">Section</th>
                                <th className="border px-3 py-2">Gender</th>
                                <th className="border px-3 py-2">Session</th>
                                <th className="border px-3 py-2">Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, idx) => (
                                <tr key={idx} className="even:bg-gray-50 dark:even:bg-gray-800">
                                    <td className="border px-3 py-2">{student.admissionNumber}</td>
                                    <td className="border px-3 py-2">{student.name}</td>
                                    <td className="border px-3 py-2">{student.currentClass}</td>
                                    <td className="border px-3 py-2">{student.section}</td>
                                    <td className="border px-3 py-2">{student.gender}</td>
                                    <td className="border px-3 py-2">{student.session}</td>
                                    <td className="border px-3 py-2">{student.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }

        </div>
    );
}
