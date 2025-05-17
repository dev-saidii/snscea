import { Student } from '@/types/type';
import Image from 'next/image';
import React from 'react';


const StudentProfile: React.FC<{ student: Student }> = ({ student }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN').format(date);
    };

    return (
        <div className="min-h-screen p-6 shadow rounded">
            <div className="max-w-4xl mx-auto rounded-lg shadow-sm overflow-hidden">
                {/* Profile Header */}
                <div className="bg-blue-300 p-6 flex items-center">
                    <Image
                        src={student.photo}
                        alt="Student Photo"
                        className="w-32 h-32 rounded-full border-4 border-white"
                    />
                    <div className="ml-6 text-white">
                        <h1 className="text-3xl font-bold">{student.name}</h1>
                        <p className="mt-2">
                            {student.currentClass} - {student.section} | Admission: {student.admissionNumber}
                        </p>
                        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {student.status}
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {/* Personal Details */}
                    <div className="md:col-span-1">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Personal Details</h2>
                        <div className="space-y-3">
                            <DetailItem label="Date of Birth" value={formatDate(student.dob)} />
                            <DetailItem label="Gender" value={student.gender} />
                            <DetailItem label="Blood Group" value={student.bloodGroup} />
                            <DetailItem label="Religion" value={student.religion} />
                            <DetailItem label="Nationality" value={student.nationality} />
                            <DetailItem label="Category" value={student.category} />
                            <DetailItem label="Aadhaar Number" value={student.aadhaarNumber} />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="md:col-span-1">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Contact Information</h2>
                        <div className="space-y-3">
                            <DetailItem label="Address" value={student.address} />
                            <DetailItem label="Email" value={student.email} />
                            <DetailItem label="Mobile" value={student.mobile} />
                            <DetailItem label="Father's Name" value={student.fatherName} />
                            <DetailItem label="Mother's Name" value={student.motherName} />
                        </div>
                    </div>

                    {/* Academic Information */}
                    <div className="md:col-span-1">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Academic Details</h2>
                        <div className="space-y-3">
                            <DetailItem label="Admission Date" value={formatDate(student.admittedAt)} />
                            <DetailItem label="Current Session" value={student.session} />
                            <DetailItem label="Class" value={student.currentClass} />
                            <DetailItem label="Section" value={student.section} />
                            {student.rollNumber && <DetailItem label="Roll Number" value={student.rollNumber} />}
                            {student.penNumber && <DetailItem label="PEN Number" value={student.penNumber} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{value || 'N/A'}</dd>
    </div>
);

export default StudentProfile;