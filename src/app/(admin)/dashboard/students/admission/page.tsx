'use client';

import AcademicDetails from '@/components/form/admission/AcademicDetails';
import ContactDetails from '@/components/form/admission/ContactDetails';
import OtherDetails from '@/components/form/admission/OtherDetails';
import ParentDetails from '@/components/form/admission/ParentDetails';
import PersonalDetails from '@/components/form/admission/PersonalDetails';
import { studentAdmission } from '@/services/admission';
import { getAdmissionConfirmationHTML } from '@/utils/html/getAdmissionConfirmationHTML';
import { getCurrentSession } from '@/utils/helpher';
import { printOnLetterPad } from '@/utils/print/printOnLetterPad';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Student } from '@/types/type';



export default function AdmissionForm() {
    // Personal
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [photo, setPhoto] = useState('');
    // Parent
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [motherAadhaar, setMotherAadhaar] = useState('');
    const [fatherAadhaar, setFatherAadhaar] = useState('');

    // Academic
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [penNumber, setPenNumber] = useState('');
    const [currentClass, setCurrentClass] = useState('');
    const [section, setSection] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [session, setSession] = useState(getCurrentSession());
    // Contact
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    // Other
    const [bloodGroup, setBloodGroup] = useState('');
    const [category, setCategory] = useState('');
    const [religion, setReligion] = useState('');
    const [nationality, setNationality] = useState('Indian');
    const [loading, setLoading] = useState(false)


    const resetForm = () => {
        setName('');
        setGender('');
        setDob('');
        setAadhaarNumber('');
        setPhoto('');
        setFatherName('');
        setMotherName('');
        setFatherAadhaar('');
        setMotherAadhaar('');
        setAdmissionNumber('');
        setPenNumber('');
        setCurrentClass('');
        setSection('');
        setRollNumber('');
        setSession(getCurrentSession());
        setEmail('');
        setMobile('');
        setAddress('');
        setBloodGroup('');
        setCategory('');
        setReligion('');
        setNationality('Indian');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!photo) {
            toast.error("Upload student photo");
            return;
        }
        if (!session) {
            toast.error("Select session");
            return;
        }

        const formData = {
            name,
            gender,
            dob,
            aadhaarNumber,
            fatherName,
            motherName,
            fatherAadhaar,
            motherAadhaar,
            address,
            admissionNumber,
            penNumber,
            currentClass,
            section,
            rollNumber,
            session,
            email,
            mobile,
            photo,
            bloodGroup,
            category,
            religion,
            nationality,
        };

        try {
            setLoading(true);
            const res = await studentAdmission(formData);

            if (res.success) {
                Swal.fire({
                    title: 'Admission Successful!',
                    text: 'The student has been admitted successfully.',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Print Confirmation Page',
                    cancelButtonText: 'Close',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await handlePrint(res.admission);
                    }
                });
                resetForm();
            } else {
                Swal.fire({
                    title: 'Admission Failed',
                    text: res.message || 'Something went wrong. Please try again.',
                    icon: 'error',
                });
            }
        } catch (error) {
            if (error.response.status === 403) {
                Swal.fire({
                    title: 'Access Denied',
                    text: 'You do not have permission to access this resource.',
                    icon: 'warning',
                });
                return;
            }
            console.log(error)
            Swal.fire({
                title: 'Server Error',
                text: 'An unexpected error occurred.',
                icon: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = async (data: Student) => {
        console.log(data)
        const html = await getAdmissionConfirmationHTML(data);
        printOnLetterPad(html)

    }


    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold  text-[#205D80] text-center drop-shadow-sm pb-4 uppercase">
                Admission Form
            </h2>
            <PersonalDetails
                photo={photo}
                name={name}
                gender={gender}
                dob={dob}
                aadhaarNumber={aadhaarNumber}
                setName={setName}
                setGender={setGender}
                setDob={setDob}
                setAadhaarNumber={setAadhaarNumber}
                setPhoto={setPhoto}
            />
            <ParentDetails
                fatherName={fatherName}
                motherName={motherName}
                setFatherName={setFatherName}
                setMotherName={setMotherName}
                fatherAadhaar={fatherAadhaar}
                motherAadhaar={motherAadhaar}
                setFatherAadhaar={setFatherAadhaar}
                setMotherAadhaar={setMotherAadhaar}
            />
            <AcademicDetails
                admissionNumber={admissionNumber}
                penNumber={penNumber}
                currentClass={currentClass}
                section={section}
                rollNumber={rollNumber}
                session={session}
                setPenNumber={setPenNumber}
                setCurrentClass={setCurrentClass}
                setSection={setSection}
                setRollNumber={setRollNumber}
                setSession={setSession}
            />
            <ContactDetails
                email={email}
                mobile={mobile}
                address={address}
                setEmail={setEmail}
                setMobile={setMobile}
                setAddress={setAddress}
            />
            <OtherDetails
                bloodGroup={bloodGroup}
                category={category}
                religion={religion}
                nationality={nationality}
                setBloodGroup={setBloodGroup}
                setCategory={setCategory}
                setReligion={setReligion}
                setNationality={setNationality}
            />
            <div className="flex justify-end mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className={`
      flex items-center justify-center gap-2
      px-6 py-2 rounded-lg font-semibold
      transition-colors duration-200
      ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}
      text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    `}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Submitting...</span>
                        </>
                    ) : (
                        <span>Submit Admission</span>
                    )}
                </button>
            </div>

        </form>
    );
}
