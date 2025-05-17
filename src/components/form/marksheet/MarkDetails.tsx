'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { calculateGrade, gradeColor } from '@/utils/helpher';

type Term = {
    max: number;
    obtained: number;
};

type SubjectMark = {
    subjectName: string;
    term1: Term;
    term2: Term;
    term3: Term;
};

const initialTerm: Term = { max: 0, obtained: 0 };

const initialSubject: SubjectMark = {
    subjectName: '',
    term1: { ...initialTerm },
    term2: { ...initialTerm },
    term3: { ...initialTerm },
};

interface Props {
    marks: SubjectMark[];
    setMarks: (marks: SubjectMark[]) => void;
}



export default function MarksEntry({ marks, setMarks }: Props) {
    const [form, setForm] = useState<SubjectMark>(initialSubject);
    const [error, setError] = useState<string>("");

    const handleChange = (
        termKey: keyof SubjectMark | 'subject',
        field: keyof Term | '',
        value: string
    ) => {
        if (termKey === 'subject') {
            setForm({ ...form, subjectName: value });
        } else {
            setForm({
                ...form,
                [termKey]: {
                    ...(form[termKey as keyof typeof form] as Term),
                    [field]: Number(value),
                },
            });
        }
    };

    const handleAdd = () => {
        setError("");
        if (!form.subjectName.trim()) {
            setError('Please enter subject name');
            return;
        }
        for (const term of ['term1', 'term2', 'term3'] as const) {
            const { max, obtained } = form[term];
            if (max < 0 || obtained < 0) {
                setError("Marks cannot be negative.");
                return;
            }
            if (obtained > max) {
                setError(`Obtained marks cannot exceed max marks in ${term.replace('term', 'Term ')}.`);
                return;
            }
        }
        setForm(initialSubject);
        setMarks([...marks, form])
    };

    const handleDelete = (idx: number) => {
        setMarks(marks.filter((_, i) => i !== idx));
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 shadow rounded border border-blue-100 mt-10 ">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#205D80] uppercase">Subject Marks Entry</h1>

            <div className="mb-6 space-y-6 text-sm">

                {/* Subject and Add Button Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end text-sm">
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-semibold">Subject Name</label>
                        <input
                            type="text"
                            placeholder="Enter Subject"
                            value={form.subjectName}
                            onChange={(e) => handleChange('subject', '', e.target.value)}
                            className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleAdd}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Subject
                        </button>
                    </div>
                </div>

                {/* Term Marks Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    {['term1', 'term2', 'term3'].map((termKey, idx) => (
                        <div key={termKey} className="border border-blue-100 rounded-2xl p-6  hover:shadow-md transition">
                            <h3 className="text-center font-semibold text-blue-600 mb-4 text-sm">
                                TERM {idx + 1}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1 font-medium">Max Marks</label>
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="Max"
                                        value={form[termKey as keyof SubjectMark].max}
                                        onChange={(e) => handleChange(termKey as keyof SubjectMark, 'max', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Obtained Marks</label>
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="Obt"
                                        value={form[termKey as keyof SubjectMark].obtained}
                                        onChange={(e) => handleChange(termKey as keyof SubjectMark, 'obtained', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-600 mt-3 font-medium text-sm">{error}</div>
                )}
            </div>
            <hr />
            <br />

            {marks.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full border text-sm border-collapse border-gray-200 text-center rounded-xl shadow">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="border px-4 py-2 align-middle" rowSpan={2}>Subject</th>
                                {[1, 2, 3].map((t) => (
                                    <th className="border px-4 py-1" colSpan={3} key={`term-head-${t}`}>TERM {t}</th>
                                ))}
                                <th className="border px-4 py-1 align-middle" rowSpan={2}>Action</th>
                            </tr>
                            <tr>
                                {[1, 2, 3].flatMap((t) => [
                                    <th key={`max-${t}`} className="border px-2 py-1">Max Marks</th>,
                                    <th key={`obt-${t}`} className="border px-2 py-1">Obtained Marks</th>,
                                    <th key={`grade-${t}`} className="border px-2 py-1">Grade</th>,
                                ])}
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((s, idx) => (
                                <tr key={idx} className="text-center hover:bg-blue-50 transition">
                                    <td className="border px-4 py-2 font-medium">{s.subjectName}</td>
                                    {[s.term1, s.term2, s.term3].map((t, i) => {
                                        const grade = calculateGrade(t.obtained, t.max);
                                        return (
                                            <React.Fragment key={i}>
                                                <td className="border">{t.max}</td>
                                                <td className="border">{t.obtained}</td>
                                                <td className="border">
                                                    <span className={`inline-block min-w-[2.5rem] rounded-full px-2 py-1 text-sm font-bold ${gradeColor(grade)}`}>
                                                        {grade}
                                                    </span>
                                                </td>
                                            </React.Fragment>
                                        );
                                    })}
                                    <td className="border">
                                        <button
                                            onClick={() => handleDelete(idx)}
                                            className="text-red-600 hover:text-red-800 p-1"
                                            aria-label={`Delete ${s.subjectName}`}
                                        >
                                            <Trash2 className="w-4 h-4" />
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
