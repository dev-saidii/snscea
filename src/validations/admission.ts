// src/schemas/admission.schema.ts
import { z } from 'zod';

export const AdmissionSchema = z.object({
    // Personal Details
    name: z.string().min(1),
    gender: z.enum(['Male', 'Female', 'Other']),
    dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    aadhaarNumber: z.string().optional(),

    // Parent Details
    fatherName: z.string().min(1),
    motherName: z.string().min(1),
    address: z.string().min(1),

    // Academic Details
    admissionNumber: z.string().optional(),
    penNumber: z.string().optional(),
    currentClass: z.string().min(1),
    section: z.string().optional(),
    rollNumber: z.string().optional(),
    session: z.string().min(1),

    // Contact
    email: z.string().email().optional(),
    mobile: z.string().min(10).max(15).optional(),

    // Extra
    photo: z.string().optional(),
    bloodGroup: z.string().optional(),
    category: z.string().optional(),
    religion: z.string().optional(),
    nationality: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
});
