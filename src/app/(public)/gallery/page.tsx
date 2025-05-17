"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type GalleryImage = {
    src: string;
    alt: string;
    caption?: string;
};

const images: GalleryImage[] = [
    { src: "/gallery/img1.jpg", alt: "republic", caption: "Republic Day Awardies" },
    { src: "/gallery/img2.jpg", alt: "republic", caption: "Award Distribution" },
    { src: "/gallery/img3.jpg", alt: "City Lights", caption: "Principal Speech" },
    { src: "/gallery/img5.jpg", alt: "Desert Dunes", caption: "Republic Day Celebration" },
    { src: "/gallery/bg1.jpg", alt: "Lake Reflection", caption: "Republic Day" },
    { src: "/gallery/bg2.jpg", alt: "Lake Reflection", caption: "Bicycle Stand" },
    { src: "/gallery/bg3.jpg", alt: "Lake Reflection", caption: "Morning Assembly" },
    { src: "/gallery/img4.jpg", alt: "Lake Reflection", caption: "Evening Assembly" },
    { src: "/gallery/bg6.jpg", alt: "Lake Reflection", caption: "Plantation" },
];

const Gallery = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [lightbox, setLightbox] = useState<null | GalleryImage>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 py-24 px-2 sm:px-4 relative overflow-hidden">
            {/* Background Bubbles */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 mt-12"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                        Gallery of Glimpses
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-gray-700 max-w-xl mx-auto font-medium"
                    >
                        A curated gallery capturing the heart and soul of our community.
                    </motion.p>
                </motion.div>

                {/* Masonry Gallery */}
                <div ref={ref} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 px-0 sm:px-4">
                    {images.map((img, idx) => (
                        <motion.div
                            key={img.src}
                            initial={{ opacity: 0, scale: 0.7, y: 30 }}
                            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: idx * 0.12, type: "spring", bounce: 0.25 }}
                            whileHover={{ scale: 1.03 }}
                            className="relative group mb-6 break-inside-avoid rounded-3xl overflow-hidden cursor-pointer border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                            onClick={() => setLightbox(img)}
                        >
                            <div className="relative h-56 sm:h-64">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority={idx < 2}
                                />
                                {img.caption && (
                                    <motion.div
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="absolute bottom-0 left-0 right-0 p-4 flex justify-center"
                                    >
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                                            <span className="text-white font-semibold text-lg drop-shadow">
                                                {img.caption}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightbox && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setLightbox(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative bg-white/10 backdrop-blur-lg p-4 rounded-3xl shadow-2xl max-w-3xl w-full flex flex-col items-center"
                    >
                        <Image
                            src={lightbox.src}
                            alt={lightbox.alt}
                            width={900}
                            height={600}
                            className="rounded-2xl object-contain max-h-[70vh] w-auto"
                        />
                        <p className="mt-4 text-white text-xl font-semibold text-center drop-shadow-lg">
                            {lightbox.caption}
                        </p>
                        <button
                            className="absolute top-2 right-4 text-white text-3xl font-bold hover:text-pink-300"
                            onClick={e => {
                                e.stopPropagation();
                                setLightbox(null);
                            }}
                        >
                            ×
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
