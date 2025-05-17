'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getInstituteDetails } from '@/utils/helpher';

const inst = getInstituteDetails()

const contactInfo = [
    {
        icon: <Phone size={36} className="text-blue-600" />,
        title: 'Call Us',
        content: (
            <>
                <a href={`tel:${inst.instMobile}`} className="text-blue-700 hover:underline text-sm">
                    {inst.instMobile}
                </a>
                <p className="text-xs text-gray-600 mt-1">Mon - Fri, 9:00 AM - 6:00 PM</p>
            </>
        ),
    },
    {
        icon: <Mail size={36} className="text-purple-600" />,
        title: 'Email Us',
        content: (
            <>
                <a href={`mailto:${inst.instEmail}`} className="text-purple-700 hover:underline text-sm">
                    {inst.instEmail}
                </a>
                <p className="text-xs text-gray-600 mt-1">We respond within 24 hours</p>
            </>
        ),
    },
    {
        icon: <MapPin size={36} className="text-green-600" />,
        title: 'Visit Us',
        content: (
            <address className="not-italic text-sm text-gray-700">
                {inst.instAddr}
            </address>
        ),
    },
    {
        icon: <Clock size={36} className="text-yellow-600" />,
        title: 'Office Hours',
        content: (
            <p className="text-sm text-gray-700">
                Monday - Friday: 9:00 AM – 6:00 PM<br />
                Saturday: 10:00 AM – 2:00 PM<br />
                Sunday: Closed
            </p>
        ),
    },
];

export default function ContactUsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 px-4 sm:px-8 py-24">
            {/* Header */}
            <section className="max-w-3xl mx-auto text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-md"
                >
                    Contact Us
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-lg text-gray-700 max-w-xl mx-auto"
                >
                    We’d love to hear from you! Contact us via phone, email, or come visit us at our campus.
                </motion.p>
            </section>

            {/* Contact Grid */}
            <section className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
                {contactInfo.map((info, index) => (
                    <motion.div
                        key={info.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition-all"
                    >
                        {info.icon}
                        <div>
                            <h3 className="text-xl font-semibold mb-1">{info.title}</h3>
                            {info.content}
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Map Embed */}
            <section className="max-w-5xl mx-auto mt-20 overflow-hidden rounded-xl shadow-lg">
                <iframe
                    title="School Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.123456789!2d83.1234567!3d26.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991a123456789ab%3A0xcdef123456789abc!2sParsiya%2C%20Sant%20Kabir%20Nagar%2C%20Uttar%20Pradesh%20272152!5e0!3m2!1sen!2sin!4v1623456789012!5m2!1sen!2sin"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>
        </main>
    );
}
