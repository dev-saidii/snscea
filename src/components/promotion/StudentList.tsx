
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

type Props = {
    students: Student[];
    selectedIds: string[];
    onSelect: (val: string) => void;
    onSelectAll?: (val: boolean) => void;

};

export default function StudentList({
    students,
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
                        <th className="p-3 font-semibold cursor-pointer text-gray-700 dark:text-gray-100">
                            <input
                                type="checkbox"
                                onChange={(e) => onSelectAll?.(e.target.checked)}
                                checked={selectedIds.length === students.length}
                                className="accent-blue-600 cursor-pointer"
                            />
                        </th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">#</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Name</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Class</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Section</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Gender</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Father</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Mobile</th>
                        <th className="p-3 font-semibold text-gray-700 dark:text-gray-100">Session</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s, idx) => (
                        <tr
                            key={s._id}
                            className={`transition hover:bg-blue-50 dark:hover:bg-blue-800 ${idx % 2 === 0 ? "bg-gray-50 dark:bg-[#1a2636]" : "bg-white dark:bg-[#16202d]"
                                }`}
                        >
                            <td className="p-3 font-mono text-blue-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(s._id)}
                                    onChange={() => onSelect(s._id)}
                                />
                            </td>
                            <td className="p-3 font-mono text-blue-600">{s.admissionNumber}</td>

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

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
