'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

import MarksDetails from '@/components/form/marksheet/MarkDetails';
import StudentFinder from '@/components/form/student/StudentFinder';
import { issueMarksheet } from '@/services/marksheet';
import { printReportCard } from '@/utils/print/printReportCard';
import { Student } from '@/types/type';

export default function MarksheetPage() {
  const [student, setStudent] = useState<Student>();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!student || marks.length === 0) {
      return toast.error('Please fill student and marks details');
    }

    setLoading(true);
    try {
      const response = await issueMarksheet({
        admissionNumber: student.admissionNumber,
        name: student.name,
        gender: student.gender,
        fatherName: student.fatherName,
        motherName: student.motherName || " ",
        dob: student.dob,
        currentClass: student.currentClass,
        section: student.section || "",
        session: student.session,
        address: student.address,
        photo: student.photo,
        subjectMarks: marks,
      });

      setLoading(false);
      setMarks([])

      Swal.fire({
        title: 'Success!',
        text: 'Marksheet generated successfully!',
        icon: 'success',
        confirmButtonText: 'Print Now',
        confirmButtonColor: '#2563EB',
      }).then((result) => {
        if (result.isConfirmed) {

          printReportCard(response);


        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error)
      if (error.response.status === 403) {
        Swal.fire({
          title: 'Access Denied',
          text: 'You do not have permission to access this resource.',
          icon: 'warning',
        });
        return;
      }
      Swal.fire({
        title: 'Error!',
        text: 'Failed to generate marksheet.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Issue Marksheet</h1>

      {/* Student Search / Display */}
      <StudentFinder onStudentFound={setStudent} />

      {student && (
        <>
          {/* Subject Marks Entry */}
          <MarksDetails marks={marks} setMarks={setMarks} />

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4  border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Generating...</span>
                </div>
              ) : (
                'Generate Marksheet'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
