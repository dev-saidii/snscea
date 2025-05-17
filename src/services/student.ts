import API from "@/lib/axios";
import { AxiosError } from "axios";

export const getStudents = async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const res = await API.get(`/api/students?${queryParams}`);
    return res.data;
};

export const getExportableStudents = async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const res = await API.get(`/api/students/export?${queryParams}`);
    return res.data;
};

export async function deleteStudentsBulk(ids: string[]) {
    const res = await API.delete("/api/students/delete", {
        data: { ids }, // ✅ body must be inside `data`
    });

    if (!res.data || res.data.error) throw new Error(res.data.error || "Bulk delete failed");
    return res.data;
}

export async function deleteStudentById(id: string) {
    try {
        const res = await API.delete(`/api/students/delete/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(err?.response?.data?.error || "Delete failed");
    }
}

// services/student.ts
export const getStudentById = async (id: string) => {
    const res = await API.get(`/api/students/${id}`);
    return res.data
};

export const updateStudent = async (id: string, data) => {
    const res = await API.put(`/api/students/${id}`, data);
    return res.data
};

// services/student.ts
export const getStudentByAdmissionNumber = async (id: string) => {
    const res = await API.get(`/api/students/finder/${id}`);
    return res.data
};


// Student Promotion

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

type FilterParams = {
    session?: string;
    currentClass?: string;
    section?: string;
    gender?: string;
};

export async function getFilteredStudents(filters: FilterParams): Promise<Student[]> {
    try {
        const params = new URLSearchParams();
        if (filters.session) params.append('session', filters.session);
        if (filters.currentClass) params.append('currentClass', filters.currentClass);
        if (filters.section) params.append('section', filters.section);

        const res = await API.get(`/api/students/promotion?${params.toString()}`);

        return res.data as Student[];
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error fetching students:', err.message);
        throw new Error('Failed to fetch students');
    }
}


type PromotePayload = {
    studentIds: string[];
    newSession: string;
    newClass: string;
    newSection: string;
};

export async function promoteStudents(data: PromotePayload): Promise<{ message: string }> {
    try {
        console.log(data)
        const res = await API.put('/api/students/promotion', data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error('Error promoting students:', err.message);
        throw new Error('Promotion failed');
    }
}
