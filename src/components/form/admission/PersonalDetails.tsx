'use client';

import PhotoUpload from "../PhotoUpload";

interface Props {
    name: string;
    gender: string;
    dob: string;
    photo: string;
    aadhaarNumber: string;
    setName: (val: string) => void;
    setGender: (val: string) => void;
    setDob: (val: string) => void;
    setPhoto: (val: string) => void;
    setAadhaarNumber: (val: string) => void;
}

export default function PersonalDetails({
    name,
    gender,
    dob,
    photo,
    aadhaarNumber,
    setName,
    setGender,
    setDob,
    setAadhaarNumber,
    setPhoto,
}: Props) {
    return (
        <div className="w-full space-y-4 shadow-sm p-6 rounded-sm border border-blue-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Student Name
                    </label>
                    <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter student name"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Gender
                    </label>
                    <select
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date of Birth
                    </label>
                    <input
                        required
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Aadhaar Number
                    </label>
                    <input
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        placeholder="12-digit Aadhaar"
                        pattern="\d{12}"
                        maxLength={12}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <div className="space-y-2">
                    <PhotoUpload photo={photo} setPhoto={setPhoto} />
                </div>
            </div>
        </div>
    );
}
