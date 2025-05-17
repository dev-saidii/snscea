"use client";
import { BookOpen, Users, CalendarDays, Award, FileText } from "lucide-react";
import { motion } from "framer-motion";

const academicsHighlights = [
  {
    icon: <BookOpen size={36} className="text-blue-600" />,
    title: "Comprehensive Curriculum",
    desc: "A well-rounded syllabus blending academics, arts, sports, and life skills.",
  },
  {
    icon: <Users size={36} className="text-purple-600" />,
    title: "Expert Faculty",
    desc: "Qualified, passionate teachers dedicated to nurturing every child’s potential.",
  },
  {
    icon: <CalendarDays size={36} className="text-green-600" />,
    title: "Academic Calendar",
    desc: "Well-structured academic year with regular assessments and enriching events.",
  },
  {
    icon: <Award size={36} className="text-yellow-600" />,
    title: "Scholastic Achievements",
    desc: "Track record of success in board exams, olympiads, and competitions.",
  },
];

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
  "Computer Science",
  "Hindi",
  "Sanskrit",
  "Physical Education",
  "Art & Craft",
];

export default function AcademicsPage() {
  return (
    <main className="min-h-screen mt-10 bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 py-16 px-2 sm:px-4">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg mb-6"
        >
          Academics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-800 font-medium max-w-2xl mx-auto"
        >
          Fostering curiosity, creativity, and excellence through a dynamic and holistic academic environment.
        </motion.p>
      </section>

      {/* Highlights */}
      <section className="max-w-5xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {academicsHighlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl shadow-lg p-8 flex items-start gap-5"
            >
              <div>{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subjects Offered */}
      <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          Subjects We Offer
        </h2>
        <ul className="flex flex-wrap justify-center gap-4">
          {subjects.map((subject) => (
            <li
              key={subject}
              className="bg-blue-100 text-blue-800 px-6 py-3 rounded-xl font-medium shadow hover:bg-blue-200 transition"
            >
              {subject}
            </li>
          ))}
        </ul>
      </section>

      {/* Academic Resources */}
      <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          Academic Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <FileText size={32} className="text-indigo-600" />
            <div>
              <div className="font-semibold">Syllabus & Curriculum</div>
              <a
                href="/downloads/syllabus.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Download PDF
              </a>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <CalendarDays size={32} className="text-green-600" />
            <div>
              <div className="font-semibold">Academic Calendar</div>
              <a
                href="/downloads/calendar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section (Optional) */}
      {/* <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
          Meet Our Faculty
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          // Faculty cards here
        </div>
      </section> */}
    </main>
  );
}
