"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

const images: GalleryImage[] = [
  { src: "/gallery/img1.jpg", alt: "Award", caption: "Award Distribution" },
  { src: "/gallery/img4.jpg", alt: "Assembly", caption: "Assembly" },
  { src: "/gallery/bg6.jpg", alt: "Plantation", caption: "Plantation" },
  { src: "/gallery/bg1.jpg", alt: "Republic", caption: "Republic Day Celebration" },

];

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 text-blue-800 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        style={{ opacity }}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-b from-white to-blue-50 overflow-hidden"
      >
        {/* Background blobs */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute top-1/4 -left-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-400/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-[5%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-l from-blue-500/30 to-purple-400/20 blur-3xl" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-7xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-blue-900 mb-6 tracking-tight">
            <span className="bg-gradient-to-r uppercase from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Sri Neta Ji Subhash Chandra
            </span>
            <br />
            <span className="block text-3xl md:text-5xl font-semibold mt-3 tracking-wide">
              Educational Academy
            </span>
          </h1>

          <motion.p
            className="text-md md:text-lg font-medium text-blue-700 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Nurturing Tomorrow’s Leaders Through Innovative Education
          </motion.p>

          <motion.div
            className="mt-14 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <button
              onClick={() => window.location.href = "/about"}
              className="bg-gradient-to-br cursor-pointer from-blue-600 to-indigo-700 text-white px-14 py-5 rounded-3xl font-semibold shadow-xl hover:shadow-blue-300/60 hover:scale-105 transition-transform duration-300 text-lg"
            >
              Explore Our Campus →
            </button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section className="container mx-auto my-40 px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-200/30 to-indigo-200/20 rounded-3xl -z-10" />
            <img
           
              src="/gallery/bg2.jpg"
              alt="School"
              className="rounded-3xl shadow-2xl transform hover:rotate-1 transition-all duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
              About Our Legacy
            </h2>
            <p className="text-lg text-blue-700 leading-relaxed">
              Established in 1985, we&apos;ve been at the forefront of holistic education,
              combining academic rigor with character development. Our 10-acre smart
              campus hosts state-of-the-art facilities that inspire innovation.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {["98% Graduation", "1500+ Students"].map((stat, i) => (
                <motion.div
                  key={stat}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-blue-50"
                >
                  <div className="text-3xl font-bold text-blue-600">
                    {stat.split(" ")[0]}
                  </div>
                  <div className="text-blue-700 mt-1">
                    {stat.split(" ").slice(1).join(" ")}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 my-28">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            Our Moments
          </h2>
          <p className="text-lg text-blue-700 max-w-xl mx-auto">
            Capturing memories that shape our educational journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ delay: idx * 0.1 }}
              className="relative group rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-80">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

                {/* Enhanced Hover Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 p-6">
                  <motion.span
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="text-2xl font-bold text-white mb-2 text-center"
                  >
                    {img.caption}
                  </motion.span>
                  <button
                    className="mt-4 bg-white/90 cursor-pointer text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-white transition duration-300"
                    onClick={() => window.location.href = '/gallery'}
                  >
                    View More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Programs Section */}
      <section className="container mx-auto my-40 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent"
        >
          Academic Excellence
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "STEM Innovation", icon: "🔬", color: "from-blue-400 to-indigo-400" },
            { title: "Creative Arts", icon: "🎨", color: "from-purple-400 to-pink-400" },
            { title: "Sports Academy", icon: "🏆", color: "from-green-400 to-cyan-400" },
          ].map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                {program.icon}
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                {program.title}
              </h3>
              <p className="text-blue-700 leading-relaxed">
                {program.title === "STEM Innovation"
                  ? "Cutting-edge laboratories and research programs"
                  : program.title === "Creative Arts"
                    ? "Comprehensive fine arts and performance curriculum"
                    : "Olympic-standard training facilities"}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="container mx-auto my-24 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">
          Latest News & Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-100 rounded-xl p-6 shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-2">Science Fair 2025</h4>
            <p className="text-blue-700">
              Our annual Science Fair was a huge success! Congratulations to all participants.
            </p>
          </div>
          <div className="bg-blue-100 rounded-xl p-6 shadow hover:shadow-md transition">
            <h4 className="text-lg font-semibold mb-2">Spring Concert</h4>
            <p className="text-blue-700">
              Join us for an evening of music and talent on May 20th.
            </p>
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="flex flex-col items-center justify-center py-16 bg-gradient-to-r from-blue-100 to-indigo-100 text-center px-4 rounded-t-3xl shadow-inner">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
          Ready to Begin Your Journey?
        </h2>
        <p className="text-blue-700 mb-6 text-lg">
          Discover your potential — apply now or take a tour!
        </p>
        <button onClick={()=>window.location.href='/admissions'} className="bg-blue-600 cursor-pointer text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition duration-300 text-lg">
          Get Started →
        </button>
      </section>
    </main>
  );
}
