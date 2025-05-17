'use client';

interface Props {
    bloodGroup: string;
    category: string;
    religion: string;
    nationality: string;
    setBloodGroup: (val: string) => void;
    setCategory: (val: string) => void;
    setReligion: (val: string) => void;
    setNationality: (val: string) => void;
}

const bloodGroups = ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const categories = ['', 'General', 'OBC', 'SC', 'ST', 'Other'];

export default function OtherDetails({
    bloodGroup,
    category,
    religion,
    nationality,
    setBloodGroup,
    setCategory,
    setReligion,
    setNationality,
}: Props) {
    return (
        <div className="w-full space-y-4 shadow-sm p-6 rounded-sm border border-blue-100">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Blood Group
                    </label>
                    <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option key="" value="">Select Blood Group</option>
                        {bloodGroups.map((bg) => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option key="" value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Religion
                    </label>
                    <input
                        type="text"
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
                        placeholder="Religion"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nationality
                    </label>
                    <input
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        placeholder="Nationality"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
            </div>
        </div>
    );
}
