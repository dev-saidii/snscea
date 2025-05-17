'use client';

import { forgotPassword } from '@/services/auth';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    // Simple email validation
    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        setLoading(true)
        try {
            await forgotPassword(email).finally(() => setLoading(false))
            setEmail('');
            Swal.fire({
                title: 'Check Your Email',
                text: 'Password link sent to you email',
                icon: 'success',
                confirmButtonColor: 'blue',
                confirmButtonText: 'OK',
            });

        } catch (err) {
            console.log(err)

            Swal.fire({
                title: 'Failed',
                text: 'Check your email Id',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK',
            });
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 px-4">
            <div className="max-w-md w-full p-8 border border-blue-100 rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>

                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="email" className="block mb-2 font-semibold">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    {message && <p className="text-green-600 mb-4">{message}</p>}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                    >
                        {loading ? "sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
}
