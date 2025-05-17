export interface Term {
    max: number;
    obtained: number;
    grade: number;
}

export interface SubjectMarks {
    subjectCode?: string;
    subjectName: string;
    subjectGrade: string;
    totalMax: number;
    totalObtained: number;
    term1: Term;
    term2: Term;
    term3: Term;
}

export interface MarksheetInput {
    _id?: string,
    admissionNumber: string;
    name: string;
    fatherName: string;
    motherName: string;
    dob: Date; // or Date
    photo?: string;
    gender?: string,
    currentClass: string;
    section: string;
    session: string;
    address: string;
    subjectMarks: SubjectMarks[];
    issueDate?: Date;
    percentage?: string;
    grade?: string;
    totalObtainedMarks?: number;
    totalMarks?: number;
}
