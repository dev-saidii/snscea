'use client';

import PhotoUpload from '@/components/form/PhotoUpload';
import { registerUserService } from '@/services/auth';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegisterForm = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        photo: '',
        role: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Basic validation
            if (!form.name || !form.email || !form.mobile || !form.password || !form.role) {
                Swal.fire('Error', 'Please fill all required fields.', 'error');
                return;
            }
            setLoading(true)

            const res = await registerUserService(form);

            Swal.fire('User Registered Successfully! ', res.message || `\n Employee Id: ${res.user.employeeNumber} \n Password : ${form.password}`, 'success');
            setForm({
                name: '',
                email: '',
                mobile: '',
                password: '',
                photo: '',
                role: '',
            });
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Registration Failed',
                'Something went wrong.',
                'error'
            );
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mt-10 mx-auto p-6 border-2 border-blue-100 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Register New User</h2>

            <div className="grid gap-4">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border border-blue-200 p-2 rounded"
                    required
                />

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border border-blue-200 p-2 rounded"
                    required
                />

                <input
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Mobile"
                    className="border border-blue-200 p-2 rounded"
                    required
                />

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="border border-blue-200 p-2 rounded"
                    required
                />


                <select
                    required
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border border-blue-200 p-2 rounded"
                >
                    <option value="">Select Role</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    {/* <option value="accountant">Accountant</option> */}
                </select>

                {/* <PhotoUpload setPhoto={(val: string) => setForm({ ...form, photo: val })} photo={form.photo} /> */}
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-600 cursor-pointer text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "registering..." : "Register"}

                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
