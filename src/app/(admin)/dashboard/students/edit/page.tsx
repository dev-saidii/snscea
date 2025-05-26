'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { getStudentById, updateStudent } from '@/services/student';
import PersonalDetails from '@/components/form/admission/PersonalDetails';
import ParentDetails from '@/components/form/admission/ParentDetails';
import AcademicDetails from '@/components/form/admission/AcademicDetails';
import ContactDetails from '@/components/form/admission/ContactDetails';
import OtherDetails from '@/components/form/admission/OtherDetails';

export default function UpdateAdmissionForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const studentId = searchParams.get('id');

    // State fields
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Same state fields as AdmissionForm 
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [photo, setPhoto] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [penNumber, setPenNumber] = useState('');
    const [currentClass, setCurrentClass] = useState('');
    const [section, setSection] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [session, setSession] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [category, setCategory] = useState('');
    const [religion, setReligion] = useState('');
    const [nationality, setNationality] = useState('Indian');

    // Load student data
    useEffect(() => {
        const fetchStudent = async () => {
            if (!studentId) {
                toast.error('No student ID provided');
                router.push('/dashboard/students/list');
                return;
            }

            try {
                setLoading(true);
                const res = await getStudentById(studentId);
                if (!res) {
                    throw new Error(res?.message || 'Failed to fetch student');
                }

                const s = res;
                setName(s.name);
                setGender(s.gender);
                setDob(s.dob.slice(0, 10));
                setAadhaarNumber(s.aadhaarNumber || '');
                setPhoto(s.photo || '');
                setFatherName(s.fatherName);
                setMotherName(s.motherName);
                setAdmissionNumber(s.admissionNumber);
                setPenNumber(s.penNumber || '');
                setCurrentClass(s.currentClass);
                setSection(s.section || '');
                setRollNumber(s.rollNumber || '');
                setSession(s.session);
                setEmail(s.email || '');
                setMobile(s.mobile || '');
                setAddress(s.address);
                setBloodGroup(s.bloodGroup || '');
                setCategory(s.category || '');
                setReligion(s.religion || '');
                setNationality(s.nationality || 'Indian');
            } catch (err) {
                if (err.response.status === 403) {
                    Swal.fire({
                        title: 'Access Denied',
                        text: 'You do not have permission to access this resource.',
                        icon: 'warning',
                    });
                    return;
                }
                console.log(err)
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [studentId, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setUpdating(true);
            const formData = {
                name, gender, dob, aadhaarNumber, photo,
                fatherName, motherName,
                admissionNumber, penNumber, currentClass, section, rollNumber, session,
                email, mobile, address,
                bloodGroup, category, religion, nationality,
            };

            if (!photo) { return toast.error("please upload photo") }
            await updateStudent(studentId!, formData);
            router.push('/dashboard/students/list')
            Swal.fire({
                title: 'Update Successful!',
                text: 'Student data has been updated successfully.',
                icon: 'success',
            });


        } catch (err) {
            if (err.response.status === 403) {
                Swal.fire({
                    title: 'Access Denied',
                    text: 'You do not have permission to access this resource.',
                    icon: 'warning',
                });
                return;
            }
            console.log(err)
            Swal.fire({
                title: 'Error',
                text: 'An error occurred',
                icon: 'error',
            });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-60">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <form onSubmit={handleUpdate} className="space-y-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold  text-[#205D80] text-center drop-shadow-sm pb-4 uppercase">Update Student Record</h2>

            <PersonalDetails
                photo={photo} name={name} gender={gender} dob={dob} aadhaarNumber={aadhaarNumber}
                setPhoto={setPhoto} setName={setName} setGender={setGender}
                setDob={setDob} setAadhaarNumber={setAadhaarNumber}
            />
            <ParentDetails
                fatherName={fatherName} motherName={motherName}
                setFatherName={setFatherName} setMotherName={setMotherName}
            />
            <AcademicDetails
                admissionNumber={admissionNumber}
                penNumber={penNumber} currentClass={currentClass} section={section}
                rollNumber={rollNumber} session={session}
                setPenNumber={setPenNumber}
                setCurrentClass={setCurrentClass} setSection={setSection}
                setRollNumber={setRollNumber} setSession={setSession}
            />
            <ContactDetails
                email={email} mobile={mobile} address={address}
                setEmail={setEmail} setMobile={setMobile} setAddress={setAddress}
            />
            <OtherDetails
                bloodGroup={bloodGroup} category={category} religion={religion} nationality={nationality}
                setBloodGroup={setBloodGroup} setCategory={setCategory}
                setReligion={setReligion} setNationality={setNationality}
            />

            <div className="flex justify-end mt-6">
                <button
                    type="submit"
                    disabled={updating}
                    className={`flex cursor-pointer items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white transition duration-200 
          ${updating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {updating ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Updating...</span>
                        </>
                    ) : (
                        <span>Update Student</span>
                    )}
                </button>
            </div>
        </form>
    );
}
