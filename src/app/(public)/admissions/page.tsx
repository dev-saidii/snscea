"use client";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { BadgeDollarSign, FileText, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const steps = [
    {
        title: "1. Enquiry & Visit",
        desc: "Contact us or visit our campus to learn more about our programs and facilities.",
        icon: <MapPin size={40} className="text-blue-600" />,
    },
    {
        title: "2. Application",
        desc: "Fill out the admission form online or collect it from our office.",
        icon: <FileText size={40} className="text-purple-600" />,
    },
    {
        title: "3. Interaction",
        desc: "Attend a meeting with our admissions team for assessment and counseling.",
        icon: <Users size={40} className="text-green-600" />,
    },
    {
        title: "4. Admission & Fees",
        desc: "Complete the admission process by submitting documents and fees.",
        icon: <BadgeDollarSign size={40} className="text-yellow-600" />,
    },
];

const faqs = [
    {
        q: "What documents are required for admission?",
        a: "Birth certificate, previous academic records, passport-size photographs, and address proof.",
    },
    {
        q: "Is there an entrance test?",
        a: "For some classes, yes. Our team will inform you if it’s required after application.",
    },
    {
        q: "Can I apply online?",
        a: "Absolutely! You can fill out the form below or visit our campus.",
    },
];

export default function AdmissionPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const { data } = await API.post("/api/admissions/enquiry", form);
            if (data.success) {
                setSubmitted(true);
            } else {
                toast.error("Failed to send. Please try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false)
        }
    }


    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 py-16 px-2 sm:px-4">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-[50vh] text-center mb-24">
                <Image
                    src="/gallery/bg2.jpg"
                    alt="Admissions"
                    fill
                    className="object-cover w-full h-full absolute inset-0 z-0 blur-xs opacity-95"
                    priority
                />
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg mb-6"
                    >
                        Begin Your Journey With Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-300 font-medium max-w-2xl mx-auto"
                    >
                        Admissions Open! Join our vibrant community and unlock a world of opportunities for your child.
                    </motion.p>
                </div>
            </section>

            {/* Admission Steps */}
            <section className="max-w-5xl mx-auto mb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                    Admission Process
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className=" rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
                        >
                            <div key={step.title} className="...">
                                <div className="mb-4 flex justify-center">{step.icon}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Admission Form */}
            <section className="max-w-4xl mx-auto  border border-blue-200 rounded-xl shadow p-10 mb-24">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                    Admission Enquiry Form
                </h2>
                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center text-green-700 text-xl font-semibold"
                    >
                        Thank you! We have received your enquiry and will contact you soon.
                    </motion.div>
                ) : (
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                    >
                        {/* Row for Name, Email, Phone */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full text-xs px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full text-xs px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                    value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full text-xs px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                    value={form.phone}
                                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                />
                            </div>
                        </div>
                        {/* Message Field Below */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Message</label>
                            <textarea
                                className="w-full px-4 text-xs py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                rows={3}
                                value={form.message}
                                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                            />
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-xl shadow-lg hover:scale-105 transition-transform"
                        >
                            {loading ? "Submitting..." : "Submit Enquiry"}

                        </button>
                    </form>

                )}
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={faq.q}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-xl shadow p-6"
                        >
                            <div className="font-semibold text-blue-700 mb-2">{faq.q}</div>
                            <div className="text-gray-700">{faq.a}</div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
