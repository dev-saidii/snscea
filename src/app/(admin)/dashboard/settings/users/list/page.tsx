"use client";

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { deleteUser, getUsers } from "@/services/auth";


type UserType = {
  _id: string;
  employeeNumber: string,
  name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
};

export default function UsersTablePage() {  
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.users);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#205D80] dark:text-white mb-4">
        Registered Users
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No users found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="text-xs uppercase bg-[#eaf6fb] dark:bg-[#22384a] text-[#205D80] dark:text-white">
              <tr>
                <th className="px-4 py-3">Employee Number</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-[#1a2d3b]">
                  <td className="px-4 py-3">{user.employeeNumber}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.mobile}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3 capitalize">{user.status}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
