'use client';
import { promoteStudents } from '@/services/student';
import { generateLast5Sessions } from '@/utils/helpher';
import { Loader2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';

interface PromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentIds: string[];
    onSuccess: () => void;
}

const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
const classes = [
    'Play', 'Nursery', 'LKG', 'UKG', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '10', '11', '12'
];

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose, studentIds, onSuccess }) => {
    const [form, setForm] = useState({
        newSession: '',
        newClass: '',
        newSection: ''
    });
    const [loading, setLoading] = useState(false);
    const sessions = useMemo(() => generateLast5Sessions(), []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePromote = async () => {
        if (!form.newSession || !form.newClass || !form.newSection) {
            Swal.fire('Missing Fields', 'Please fill all promotion fields.', 'warning');
            return;
        }

        try {
            setLoading(true);
            await promoteStudents({
                studentIds,
                newSession: form.newSession,
                newClass: form.newClass,
                newSection: form.newSection
            });
            setForm({
                newSession: '',
                newClass: '',
                newSection: ''
            })

            Swal.fire('Success', 'Students promoted successfully.', 'success');
            onSuccess();
            onClose();
        } catch (err) {
            Swal.fire('Error', err.message || 'Promotion failed.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative animate-in slide-in-from-bottom-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Promote Students
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            Promoting {studentIds.length} student{studentIds.length > 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Target Session
                            </label>
                            <select
                                name="newSession"
                                className="w-full px-4 text-xs py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                                text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                transition-all appearance-none"
                                value={form.newSession}
                                onChange={handleChange}
                            >
                                <option value="">Select Session</option>
                                {sessions.map((session) => (
                                    <option key={session} value={session}>{session}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Target Class
                                </label>
                                <select
                                    name="newClass"
                                    className="w-full text-xs px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                                    text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                    transition-all"
                                    value={form.newClass}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Class</option>
                                    {classes.map((cls) => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Target Section
                                </label>
                                <select
                                    name="newSection"
                                    className="w-full px-4 text-xs py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                                    text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                    transition-all"
                                    value={form.newSection}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Section</option>
                                    {sections.map((sec) => (
                                        <option key={sec} value={sec}>{sec}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handlePromote}
                    disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
                    text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-[1.01] 
                    disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Confirm Promotion'
                    )}
                </button>
            </div>
        </div>
    );
};

export default PromotionModal;