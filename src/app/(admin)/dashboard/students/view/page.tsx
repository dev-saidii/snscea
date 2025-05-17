
"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getStudentById } from '@/services/student';
import StudentProfile from '@/components/form/student/StudentProfile';
import { Student } from '@/types/type';

const StudentDetails = () => {
    const params = useSearchParams();
    const id = params.get('id') as string;
    const [student, setStudent] = useState<Student>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await getStudentById(id);
                setStudent(response);
            } catch (err) {
                console.log(err)
                setError('Failed to fetch student data');
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!student) return <p>No student found</p>;

    return (
        <div>
            <StudentProfile student={student} />
        </div>
    );
};

export default StudentDetails;
