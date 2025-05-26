'use client';

interface Props {
    fatherName: string;
    motherName: string;
    fatherAadhaar: string;
    motherAadhaar: string;
    setFatherName: (val: string) => void;
    setMotherName: (val: string) => void;
    setFatherAadhaar: (val: string) => void;
    setMotherAadhaar: (val: string) => void;

}

export default function ParentDetails({
    fatherName,
    motherName,
    fatherAadhaar,
    motherAadhaar,
    setFatherName,
    setMotherName,
    setFatherAadhaar,
    setMotherAadhaar
}: Props) {
    return (
        <div className="w-full space-y-4 shadow-sm p-6 rounded-sm border border-blue-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Father&apos;s Name
                    </label>
                    <input
                        required
                        type="text"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        placeholder="Enter father's name"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mother&apos;s Name
                    </label>
                    <input
                        type="text"
                        required
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                        placeholder="Enter mother's name"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Father&apos;s Aadhaar
                    </label>
                    <input

                        type="text"
                        value={fatherAadhaar}
                        onChange={(e) => setFatherAadhaar(e.target.value)}
                        placeholder="Enter father's aadhaar number"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mother&apos;s Aadhaar
                    </label>
                    <input
                        type="text"
                        value={motherAadhaar}
                        onChange={(e) => setMotherAadhaar(e.target.value)}
                        placeholder="Enter mother's aadhaar number"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>


            </div>
        </div>
    );
}
