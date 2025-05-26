import { Student } from "@/types/type";
import { Eye, Edit, Trash2, IdCard } from "lucide-react";
import Image from "next/image";


type Props = {
    isDeleting: string;
    students: Student[];
    selectedIds: string[];
    onView?: (student: Student) => void;
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
    onPrintId: (student: Student) => void;
    onSelect: (val: string) => void;
    onSelectAll?: (val: boolean) => void;

};

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export default function StudentList({
    students,
    isDeleting,
    onView,
    onEdit,
    onDelete,
    onPrintId,
    onSelect,
    onSelectAll,
    selectedIds
}: Props) {
    if (!students.length)
        return (
            <div className="flex items-center justify-center py-10">
                <p className="text-gray-400 text-lg">No students found.</p>
            </div>
        );

    return (
        <div className="w-full overflow-x-auto rounded-lg shadow border border-blue-100 bg-white dark:bg-[#13222f]">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-blue-50 dark:bg-blue-900 sticky top-0 z-10">
                    <tr>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">
                            <input
                                type="checkbox"
                                onChange={(e) => onSelectAll?.(e.target.checked)}
                                checked={selectedIds.length === students.length}
                                className="accent-blue-600 cursor-pointer"
                            />
                        </th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Adm No</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Photo</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Name</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Class</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Section</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Gender</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Father</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Mobile</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Session</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Admission Date</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s, idx) => (
                        <tr
                            key={s._id}
                            className={`transition hover:bg-blue-50 dark:hover:bg-blue-800 ${idx % 2 === 0 ? "bg-gray-50 dark:bg-[#1a2636]" : "bg-white dark:bg-[#16202d]"
                                }`}
                        >
                            <td className="p-3 font-mono text-blue-600">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(s._id)}
                                    onChange={() => onSelect(s._id)}
                                />
                            </td>
                            <td className="p-3 font-mono text-blue-600">{s.admissionNumber}</td>
                            <td className="p-3">
                                {s.photo ? (
                                    <Image
                                        src={s.photo}
                                        alt="avtar"
                                        width={36}
                                        height={36}
                                        className="rounded-full h-10 w-16 object-cover border border-blue-200"
                                    />
                                ) : (
                                    <span
                                        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold"
                                        title={s.name}
                                    >
                                        {getInitials(s.name)}
                                    </span>
                                )}
                            </td>
                            <td className="p-3 max-w-[140px] truncate">{s.name}</td>
                            <td className="p-3">{s.currentClass}</td>
                            <td className="p-3">{s.section}</td>
                            <td className="p-3">{s.gender}</td>
                            <td className="p-3 max-w-[120px] truncate" title={s.fatherName}>
                                {s.fatherName}
                            </td>
                            <td className="p-3">
                                <a
                                    href={`tel:${s.mobile}`}
                                    className="text-blue-600 hover:underline"
                                    title="Call"
                                >
                                    {s.mobile}
                                </a>
                            </td>
                            <td className="p-3">{s.session}</td>
                            <td className="p-3">
                                {new Date(s.admittedAt).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                })}
                            </td>
                            <td className="p-3">
                                {
                                    isDeleting === s._id ? <span className="text-red-500">Deleting...</span>
                                        :
                                        <div className="flex gap-2">
                                            <button
                                                className="cursor-pointer text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 p-1 rounded"
                                                title="View"
                                                onClick={() => onView?.(s)}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                className="cursor-pointer text-green-600 hover:bg-green-100 dark:hover:bg-green-900 p-1 rounded"
                                                title="Edit"
                                                onClick={() => onEdit?.(s)}
                                            >
                                                <Edit size={18} />
                                            </button>
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
                                                onClick={() => onPrintId?.(s)}
                                            >
                                                <IdCard size={18} />
                                            </button>
                                        </div>

                                }

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
