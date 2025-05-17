"use client";
import { CalendarDays, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const currentYear = new Date().getFullYear();

const events = [
    {
        title: "Science Exhibition",
        date: `${currentYear}-02-15`,
        time: "10:00 AM",
        location: "Science Block",
        description: "Explore innovative projects and experiments by our talented students.",
        image: "/gallery/bg2.jpg",
        type: "event",
    },

    {
        title: "Republic Day Celebration",
        date: `${currentYear}-01-26`,
        time: "8:30 AM",
        location: "School Auditorium",
        description: "Celebrate the spirit of India with cultural performances and patriotic fervor.",
        image: "/gallery/bg1.jpg",
        type: "event",
    },
    {
        title: "Annual Sports Day",
        date: `${currentYear}-01-12`,
        time: "9:00 AM",
        location: "School Playground",
        description: "Join us for a day of fun, fitness, and friendly competition at our Annual Sports Day!",
        image: "/gallery/img1.jpg",
        type: "event",
    },

    {
        title: "Exam Schedule Released",
        date: `${currentYear}-01-05`,
        description: "Final exam timetable for all classes is now available. Download from the academics page.",
        type: "news",
    },
    {
        title: "Winter Break Announced",
        date: `${currentYear - 1}-12-20`, // Previous year for Dec 20
        description: "School will remain closed from Dec 20 to Jan 2 for winter vacation.",
        type: "news",
    },
];
;

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function EventsNewsPage() {
    // Find the next upcoming event
    const now = new Date();
    const upcomingEvent = events
        .filter(e => e.type === "event" && new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    return (
        <main className="min-h-screen mt-10 bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 py-16 px-2 sm:px-4">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg mb-6"
                >
                    Events & News
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-800 font-medium max-w-2xl mx-auto"
                >
                    Stay updated with our latest happenings, celebrations, and important announcements.
                </motion.p>
            </section>

            {/* Highlighted Upcoming Event */}
            {upcomingEvent && (
                <section className="max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="relative bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden"
                    >
                        {upcomingEvent.image && (
                            <Image
                                src={upcomingEvent.image}
                                alt={upcomingEvent.title}
                                className="md:w-1/3 object-cover h-64 md:h-auto"
                            />
                        )}
                        <div className="p-8 flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                                <CalendarDays size={20} />
                                <span>{formatDate(upcomingEvent.date)}</span>
                                {upcomingEvent.time && (
                                    <>
                                        <span>•</span>
                                        <span>{upcomingEvent.time}</span>
                                    </>
                                )}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">{upcomingEvent.title}</h2>
                            <div className="text-gray-700 mb-3">{upcomingEvent.description}</div>
                            {upcomingEvent.location && (
                                <div className="text-sm text-gray-500">
                                    <strong>Location:</strong> {upcomingEvent.location}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Events & News Grid */}
            <section className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {events.map((item, idx) => (
                        <motion.div
                            key={item.title + item.date}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.07 }}
                            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full"
                        >
                            <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold">
                                {item.type === "event" ? (
                                    <CalendarDays size={18} />
                                ) : (
                                    <Newspaper size={18} />
                                )}
                                <span>{formatDate(item.date)}</span>
                                {item.time && (
                                    <>
                                        <span>•</span>
                                        <span>{item.time}</span>
                                    </>
                                )}
                            </div>
                            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                            <div className="text-gray-700 mb-2 flex-1">{item.description}</div>
                            {item.location && (
                                <div className="text-sm text-gray-500 mb-2">
                                    <strong>Location:</strong> {item.location}
                                </div>
                            )}
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded-xl mt-2 object-cover h-32 w-full"
                                />
                            )}
                            {/* Optional: Read More / Details */}
                            {/* <a href="#" className="mt-4 inline-flex items-center text-blue-600 font-semibold hover:underline">
                Read More <ArrowRight size={16} className="ml-1" />
              </a> */}
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
