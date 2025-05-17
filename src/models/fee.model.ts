import  { Schema, model, models } from 'mongoose';

const feeSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'Admission',
            required: true,
        },
        admissionNumber: {
            type: String,
            required: true,
            trim: true,
        },
        receiptNumber: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        fatherName: {
            type: String,
            required: true,
            trim: true,
        },
        dob: {
            type: Date,
        },
        session: {
            type: String,
            required: true,
        },
        class: {
            type: String,
            required: true,
        },
        section: {
            type: String,
        },
        collectionDate: {
            type: Date,
            default: Date.now,
        },
        amount: {
            type: Number,
            required: true,
        },
        feeType: {
            type: String,
            enum: ['admission', 'monthly', 'quarterly', 'exam', 'book', 'transport', ],
            required: true,
        },
        paymentMode: {
            type: String,
            enum: ['cash', 'upi', 'bank'],
            required: true,
        },
        remarks: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Fee = models.Fee || model('Fee', feeSchema);

export default Fee;
