'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/services/auth';

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = () => {
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!token) {
            setError('Invalid or missing token');
            return;
        }

        if (!validatePassword()) return;

        setLoading(true);

        try {
            // TODO: Replace with your API endpoint
            const res = await resetPassword(token, password);
            console.log(res)
            if (!res.success) {
                const data = await res.json();
                setError(data.message || 'Failed to reset password');
            } else {
                setMessage('Password reset successfully! You can now login.');
                setPassword('');
                setConfirmPassword('');
                window.location.href = "/login"
            }
        } catch (err) {
            console.log(err)
            setError('Something went wrong. Please try again later.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <div className="max-w-md w-full  p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="password" className="block mb-2 font-semibold">
                        New Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Enter new password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
                        Confirm New Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm new password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    {message && <p className="text-green-600 mb-4">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            } transition`}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
