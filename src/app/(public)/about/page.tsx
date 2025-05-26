// app/about/page.tsx
'use client';

import Image from 'next/image';

const AboutPage = () => {
    return (
        <div className='bg-gradient-to-r from-blue-100 via-green-50 to-blue-100'>
            <main className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto ">
                <section className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-2">About Us</h1>
                    <p className="text-gray-600 text-lg">Nurturing Young Minds with Knowledge, Character, and Innovation</p>
                </section>

                {/* Mission & Vision */}
                <section className="grid md:grid-cols-2 gap-20 mb-16">
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 mb-3">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed">
                            At SNSCEA, our mission is to provide a holistic and value-based education that equips students with the knowledge, skills, and character to thrive in a dynamic world. We believe in nurturing curiosity, promoting critical thinking, and encouraging lifelong learning.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 mb-3">Our Vision</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our vision is to become a center of academic excellence that fosters innovation, inclusivity, and integrity. We aim to shape responsible global citizens who are compassionate, courageous, and committed to making a positive impact.
                        </p>
                    </div>
                </section>

                {/* School Overview + Image */}
                <section className="grid md:grid-cols-2 items-center gap-20 mb-16">
                    <div>
                        <Image
                            src="/gallery/banner.jpg"
                            alt="School Campus"
                            width={600}
                            height={400}
                            className="rounded-xl shadow-md w-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Who We Are</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Sri Netaji Subhash Chandra Educational Academy (SNSCEA) is a premier educational institution affiliated with the CBSE board. With a commitment to academic excellence and character building, we provide a nurturing environment where students grow intellectually, emotionally, and socially.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            Our campus is equipped with modern classrooms, science labs, computer labs, a digital library, and activity centers to support co-curricular growth. We believe in empowering students with skills and values that prepare them for the challenges of the future.
                        </p>
                    </div>
                </section>
                <br />



                {/* Core Values */}
                <section className="mb-20">
                    <h2 className="text-2xl font-semibold text-blue-700 text-center mb-8">Our Core Values</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
                        {['Integrity', 'Discipline', 'Respect', 'Innovation', 'Empathy', 'Excellence'].map((value) => (
                            <div
                                key={value}
                                className="bg-blue-50 text-blue-800 font-medium py-4 px-6 rounded-xl shadow hover:bg-blue-100 transition"
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </section>


                {/* Director's Message */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Message from the Director</h2>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <Image
                                src="/gallery/director.jpg"
                                alt="director"
                                width={500}
                                height={500}
                                className="rounded-xl shadow-md object-cover w-full"
                            />
                        </div>
                        <div>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                “At SNSCEA, we believe that education is not just about academics, but about nurturing responsible, compassionate, and confident individuals. Our school environment fosters creativity, encourages inquiry, and builds the skills necessary to succeed in a rapidly changing world.
                            </p>
                            <p className="text-gray-700 mt-4 leading-relaxed text-lg">
                                We are proud to be shaping future leaders with strong moral values and a passion for excellence. I invite all students and parents to join us in this journey of growth, discovery, and transformation.”
                            </p>
                            <p className="text-blue-800 mt-6 font-semibold"> — {process.env.NEXT_PUBLIC_INSTITUTE_DIRECTOR}<br />Director, SNSCEA</p>
                        </div>
                    </div>
                </section>
                <br />
            </main>
        </div>
    );
};

export default AboutPage;
