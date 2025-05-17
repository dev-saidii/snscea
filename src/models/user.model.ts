import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, },
        mobile: { type: String, required: true, },
        password: { type: String, required: true },
        photo: { type: String },
        employeeNumber: { type: String, unique: true },
        role: {
            type: String,
            enum: ['superadmin', 'admin', 'teacher', 'accountant'],
            default: 'teacher',
        },
        access: {
            type: [String],
            enum: [
                'student',
                'account',
                'marksheet',
                'setting',
                'website',
            ],
            default: [],
        },

        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    },
    { timestamps: true }
);

const User = models.User || model('User', UserSchema);
export default User;
