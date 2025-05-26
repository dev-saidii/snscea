import { Schema, model, models, Document } from 'mongoose';

// ✅ 1. Define TypeScript interface
export interface IAdmission extends Document {
    name: string;
    gender: 'Male' | 'Female' | 'Other';
    dob: Date;
    photo?: string;
    aadhaarNumber?: string;

    fatherName: string;
    motherName: string;
    fatherAadhaar?: string;
    motherAadhaar?: string;

    admissionNumber: string;
    penNumber?: string;
    currentClass: string;
    section?: string;
    rollNumber?: string;
    session: string;

    email?: string;
    mobile?: string;
    address: string;

    bloodGroup?: string;
    category?: string;
    religion?: string;
    nationality?: string;
    status?: 'active' | 'inactive';

    admittedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

// ✅ 2. Use the interface in Schema
const AdmissionSchema = new Schema<IAdmission>(
    {
        name: { type: String, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        dob: { type: Date, required: true },
        photo: { type: String },
        aadhaarNumber: { type: String, match: /^\d{12}$/, required: false },

        fatherName: { type: String, required: true },
        motherName: { type: String, required: true },
        fatherAadhaar: { type: String },
        motherAadhaar: { type: String },

        admissionNumber: { type: String, unique: true, required: true },
        penNumber: { type: String },
        currentClass: { type: String, required: true },
        section: { type: String },
        rollNumber: { type: String },
        session: { type: String, required: true },

        email: { type: String },
        mobile: { type: String },
        address: { type: String, required: true },

        bloodGroup: { type: String },
        category: { type: String },
        religion: { type: String },
        nationality: { type: String, default: 'Indian' },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },

        admittedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// ✅ 3. Export default model with proper typing
const Admission = models.Admission || model<IAdmission>('Admission', AdmissionSchema);
export default Admission;
