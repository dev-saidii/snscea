import mongoose from 'mongoose';

const termSchema = new mongoose.Schema({
    max: { type: Number, required: true },
    obtained: { type: Number, required: true },
    grade: { type: String }
}, { _id: false });

const subjectMarksSchema = new mongoose.Schema({
    subjectCode: { type: String },
    subjectName: { type: String, required: true },
    term1: { type: termSchema, required: true },
    term2: { type: termSchema, required: true },
    term3: { type: termSchema, required: true },
    totalMax: Number,
    totalObtained: { type: Number },
    subjectGrade: { type: String },
}, { _id: false });

const marksheetSchema = new mongoose.Schema({
    admissionNumber: { type: String, required: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    photo: { type: String },
    currentClass: { type: String, required: true },
    section: { type: String, required: true },
    session: { type: String, required: true },
    address: { type: String, required: true },

    subjectMarks: [subjectMarksSchema],

    // Summary
    totalObtainedMarks: Number,
    totalMarks: Number,
    percentage: String,
    grade: String,

    issuedBy: String,
    issueDate: { type: Date, default: Date.now },
}, { timestamps: true });

// Auto-delete after 2 years
marksheetSchema.index({ issueDate: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 * 2 });

export default mongoose.models.Marksheet ||
    mongoose.model("Marksheet", marksheetSchema);
