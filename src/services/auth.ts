import API from '@/lib/axios';
import Swal from 'sweetalert2';

// ✅ Login
export const login = async (employeeNumber: string, password: string) => {
    const res = await API.post('/api/users/login', { employeeNumber, password });
    localStorage.setItem('saidii-user', JSON.stringify(res.data.user));
    return res.data;
};

export const verifyUser = async () => {
    const res = await API.get('/api/users/verify');
    return res.data;
};

// ✅ Register
export const registerUserService = async (formData) => {
    const response = await API.post('/api/users', formData);
    return response.data;
};

// ✅ Get All Users
export const getUsers = async () => {
    const response = await API.get('/api/users');
    return response.data;
};

// ✅ Delete User by ID
export const deleteUser = async (id: string) => {
    const response = await API.delete(`/api/users/${id}`);
    return response.data;
};

// ✅ 1. Change Password (user is logged in)
export const changePassword = async (data: {
    oldPassword: string;
    newPassword: string;
}) => {
    const response = await API.post('/api/users/change-password', data);
    return response.data;
};

// ✅ 2. Forgot Password (send reset link to email)
export const forgotPassword = async (email: string) => {
    const response = await API.post('/api/users/forgot-password', { email });
    return response.data;
};

// ✅ 3. Reset Password using token from email
export const resetPassword = async (token: string, newPassword: string) => {
    const response = await API.post('/api/users/reset-password', {
        token,
        newPassword,
    });
    return response.data;
};


export async function logout() {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, logout!',
        reverseButtons: true,
    });

    if (result.isConfirmed) {
        try {
            // Call the backend logout API to clear cookie
            await API.post('/api/users/logout');

            // Clear user data from localStorage
            localStorage.removeItem('saidii-user');

            // Redirect to login
            window.location.href = '/login';
            // Show success alert
            await Swal.fire({
                title: 'Logged Out',
                text: 'You have been successfully logged out.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });


        } catch (error) {
            console.error('Logout failed:', error);
            await Swal.fire({
                title: 'Error',
                text: 'Something went wrong during logout.',
                icon: 'error',
            });
        }
    }
}
