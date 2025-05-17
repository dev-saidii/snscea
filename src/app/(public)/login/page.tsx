'use client';

import { useState } from 'react';
import { login } from '@/services/auth'; // Your custom login service
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Loader } from 'lucide-react';
import Swal from 'sweetalert2';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(employeeNumber, password);
            router.push('/dashboard');
            Swal.fire('Success!', 'Login Successfully!', 'success');
        } catch (err) {
            console.log(err)
            Swal.fire('Failed!', 'Invalid Employee Number or Password!', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Forgot password handler
    const handleForgotPassword = () => {
        router.push('/forgot-password');
    };

    return (
        <main className="min-h-screen mt-10 py-10 flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
            <div className="max-w-lg w-full  dark:bg-gray-900 bg-white shadow rounded-md p-8 space-y-7 border border-blue-200 dark:border-gray-800 relative overflow-hidden">
                <div className="text-center relative z-10">
                    <div className="mx-auto mb-3 rounded-full flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt={"institute logo"}
                            width={150}
                            height={150}
                        />
                    </div>
                    <h1 className="text-xl font-bold text-[#205D80] dark:text-white drop-shadow-sm">
                        Welcome to {process.env.NEXT_PUBLIC_INSTITUTE_NAME}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Login to continue</p>
                </div>

                <form className="space-y-5 relative z-10" onSubmit={handleSubmit} autoComplete="off">
                    <div>
                        <label className="block text-gray-700 text-sm dark:text-gray-300 mb-1 font-medium">Employee Number</label>
                        <input
                            value={employeeNumber}
                            onChange={(e) => setEmployeeNumber(e.target.value.toLocaleUpperCase())}
                            type="text"
                            placeholder="EM250023"
                            autoComplete="username"
                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[#205D80] outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm dark:text-gray-300 mb-1 font-medium">Password</label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[#205D80] outline-none pr-10 transition"
                                required
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-[#205D80] dark:hover:text-white transition"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full cursor-pointer bg-[#205D80] hover:bg-[#17425a] focus:ring-2 focus:ring-[#205D80] text-white font-semibold py-2.5 rounded-lg shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin w-5 h-5" />
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>

                    {/* Forgot Password Link */}
                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm cursor-pointer    text-[#205D80] hover:text-[#17425a] dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-center font-medium">{error}</p>}
                </form>

                <p className="text-center text-xs text-gray-400 dark:text-gray-500 relative z-10">
                    &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_INSTITUTE_NAME}
                </p>
            </div>
        </main>
    );
}
