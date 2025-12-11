'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BASE_PATH } from '@/lib/config';
import GlossyButton from '@/components/ui/GlossyButton';
import WorkCard from '@/components/WorkCard';
import NetaiChan from '@/components/NetaiChan';
import StarrySky from '@/components/StarrySky';
import WorkModal from '@/components/WorkModal';
import SocialLinks from '@/components/SocialLinks';
import { useRef, useState } from 'react';

import worksData from '@/data/works.json';

// Filter featured works from JSON data
const works = worksData.works.filter(work => work.featured);

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Background transformation: Day -> Sunset -> Night
    // Using gradients to support the requested Day sky gradient
    const bgGradient = useTransform(
        scrollYProgress,
        [0, 0.4, 0.8],
        [
            "linear-gradient(to bottom, #1925ea, #00D2FF)", // Day: Dark Blue -> Light Blue
            "linear-gradient(to bottom, #FF2A6D, #FF2A6D)", // Sunset: Solid Pink (as gradient)
            "linear-gradient(to bottom, #050014, #050014)"  // Night: Solid Dark (as gradient)
        ]
    );

    // Accent gradient overlay changes
    const gradientOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [0, 0.6, 0]);

    // State for modal
    const [selectedWork, setSelectedWork] = useState(null);

    return (
        <div ref={containerRef} className="relative min-h-[300vh]">
            {/* Fixed Header */}
            {/* Fixed Header - Removed as requested */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0.2, 0.3], [0, 1]) }}
                className="fixed top-6 left-6 z-50 w-32 md:w-40 cursor-pointer transition-transform hover:scale-110 pointer-events-auto"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <Image
                    src={`${BASE_PATH}/images/ANETTAI_3DLogo_v2.png`}
                    alt="Home"
                    width={200}
                    height={80}
                    className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
            </motion.div>

            {/* Dynamic Background */}
            <motion.div
                className="fixed inset-0 -z-20 transition-all duration-700 ease-linear"
                style={{ backgroundImage: bgGradient }}
            />
            {/* Grid Pattern Overlay */}
            <div className="fixed inset-0 -z-10 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Sunset Gradient Overlay (Fixed) */}
            <motion.div
                className="fixed inset-0 -z-15 bg-gradient-to-t from-[#D60270] via-[#FF9E00]/50 to-transparent pointer-events-none"
                style={{ opacity: gradientOpacity }}
            />

            {/* --- Section 1: Day (Hero) --- */}
            <section className="relative z-10 flex h-screen flex-col items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="relative z-10 w-[90%] max-w-[900px] -mt-40"
                >
                    {/* Parallax Logo Effect could be added here similar to bg */}
                    <motion.div
                        className="relative aspect-[3/1] w-full"
                    >
                        {/* Using the 3D Logo */}
                        <Image
                            src={`${BASE_PATH}/images/ANETTAI_3DLogo_v2.png`}
                            alt="ANETTAI Logo"
                            fill
                            className="object-contain drop-shadow-[0_10px_30px_rgba(255,255,255,0.5)] scale-125 md:scale-100"
                            priority
                        />
                    </motion.div>

                    {/* Text and Links - Appears after Logo (delay 2.0s) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 3.0 }}
                        className="mt-2 flex flex-col items-center"
                    >
                        <p className="mb-4 text-sm font-bold text-white drop-shadow-md md:text-base">
                            あねったいの個人サイトへようこそ！
                        </p>
                        <SocialLinks className="justify-center" filter={['X', 'Instagram', 'Pinterest']} />
                    </motion.div>

                    {/* Scroll Indicator - Appears after Logo/Links (delay 3s) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{
                            opacity: { delay: 4, duration: 1 },
                            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 4 }
                        }}
                        className="absolute bottom-[-130px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                    >
                        <span className="text-sm font-bold tracking-[0.2em] text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">SCROLL</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                    </motion.div>

                    {/* Removed buttons from here as requested */}
                </motion.div>
            </section>

            {/* --- Section 2: Sunset (Works) --- */}
            <section className="relative z-10 flex min-h-screen flex-col items-center justify-center py-20">
                <h2 className="mb-12 text-4xl font-black text-white drop-shadow-[0_4px_0_rgba(255,158,0,0.8)]">
                    Selected Works
                </h2>

                <div className="grid w-[90%] max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {works.map((work) => (
                        <WorkCard
                            key={work.id}
                            work={work}
                            className="border-white/10 bg-white/5 hover:-translate-y-2 hover:bg-white/10"
                            onClick={() => setSelectedWork(work)}
                        />
                    ))}
                </div>

                <div className="mt-16">
                    <Link href="/gallery"><GlossyButton>View All Gallery</GlossyButton></Link>
                </div>
            </section>

            {/* --- Section 3: Night (About/Game) --- */}
            <section className="relative z-10 flex h-screen flex-col items-center justify-center text-white">
                <div className="relative z-10 flex flex-col items-center w-[90%] md:w-auto rounded-3xl border border-[#00FF9D]/50 bg-black/40 p-6 md:p-10 backdrop-blur-md shadow-[0_0_50px_rgba(0,255,157,0.2)]">
                    {/* 3D Logo Removed from here as requested */}

                    {/* Icon */}
                    <div className="mb-6 relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#00FF9D] shadow-[0_0_20px_#00FF9D]">
                        <Image
                            src={`${BASE_PATH}/images/icon.png`}
                            alt="Icon"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <h2 className="mb-6 text-center text-3xl font-bold text-[#00FF9D] drop-shadow-[0_0_10px_#00FF9D]">
                        あねったい
                    </h2>
                    <p className="max-w-md text-center leading-relaxed mb-8 whitespace-pre-line">
                        3Dメインでなんでもゆるくものづくり。最近はゲームを作ってます。<br />
                        サイバーでトロピカルなドリームが好きです。青髪のツインテールも好きです。
                    </p>

                    {/* Social Links */}
                    <SocialLinks className="mb-8" />

                    {/* Blog Banner */}
                    <Link
                        href="https://subsleepical.com/"
                        className="relative block w-full max-w-[600px] aspect-[5/1] md:h-[120px] rounded-xl overflow-hidden border border-[#00FF9D]/30 transition-transform hover:scale-105 shadow-[0_0_15px_rgba(0,255,157,0.1)] group"
                    >
                        {/* Removed text overlay as requested */}
                        <Image
                            src={`${BASE_PATH}/images/blog/banner.png`}
                            alt="Official Blog"
                            fill
                            className="object-cover group-hover:opacity-100 transition-opacity"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                        />
                    </Link>
                </div>
            </section>

            {/* Global Elements */}
            <NetaiChan scrollYProgress={scrollYProgress} />
            <StarrySky scrollYProgress={scrollYProgress} />

            {/* Modal */}
            {selectedWork && (
                <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
            )}
        </div>
    );
}
