import { MarksheetInput } from "@/types/marksheet";
import { Trash2, Printer } from "lucide-react";


type Props = {
    marksheets: MarksheetInput[];
    isDeleting: string;
    onDelete?: (marksheet: MarksheetInput) => void;
    onPrint: (marksheet: MarksheetInput) => void;
};

export default function MarksheetList({
    marksheets,
    isDeleting,
    onDelete,
    onPrint,
}: Props) {
    if (!marksheets?.length)
        return (
            <div className="flex items-center justify-center py-10">
                <p className="text-gray-400 text-lg">No students found.</p>
            </div>
        );

    return (
        <div className="w-full overflow-x-auto rounded-lg shadow border border-blue-100 bg-white dark:bg-[#13222f]">
            <table className="min-w-full text-sm text-center">
                <thead className="bg-blue-50 dark:bg-blue-900 sticky top-0 z-10">
                    <tr>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">#</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Name</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Class</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Section</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Gender</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Father</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Session</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Issuse Date</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Max Marks</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Obtained Marks</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Grade</th>

                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {marksheets.map((s, idx) => (
                        <tr
                            key={s._id}
                            className={`transition hover:bg-blue-50 dark:hover:bg-blue-800 ${idx % 2 === 0 ? "bg-gray-50 dark:bg-[#1a2636]" : "bg-white dark:bg-[#16202d]"
                                }`}
                        >
                            <td className="p-3 font-mono text-blue-600">{s.admissionNumber}</td>
                            <td className="p-3 max-w-[140px] truncate">{s.name}</td>
                            <td className="p-3">{s.currentClass}</td>
                            <td className="p-3">{s.section}</td>
                            <td className="p-3">{s.gender}</td>
                            <td className="p-3 max-w-[120px] truncate" title={s.fatherName}>
                                {s.fatherName}
                            </td>
                            <td className="p-3">
                                {s.session}
                            </td>
                            <td className="p-3">
                                {new Date(s.issueDate || "").toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                })}
                            </td>
                            <td className="p-3">{s.totalMarks}</td>
                            <td className="p-3">{s.totalObtainedMarks}</td>
                            <td className="p-3">{s.grade}</td>
                            <td className="p-3">
                                <div className="flex gap-2">
                                    {isDeleting == s._id ? <span className="text-red-600">deleting...</span>
                                        :
                                        <>
                                            <button
                                                className="text-red-600 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 p-1 rounded"
                                                title="Delete"
                                                onClick={() => onDelete?.(s)}
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <button
                                                className="text-indigo-600 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900 p-1 rounded"
                                                title="Print ID Card"
                                                onClick={() => onPrint?.(s)}
                                            >
                                                <Printer size={18} />
                                            </button>
                                        </>}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
