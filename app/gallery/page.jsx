'use client';
import { useState, useMemo } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import GlossyButton from '@/components/ui/GlossyButton';
import WorkCard from '@/components/WorkCard';
import WorkModal from '@/components/WorkModal';
import NetaiChan from '@/components/NetaiChan';
import StarrySky from '@/components/StarrySky';
import worksData from '@/data/works.json';
import Link from 'next/link';
import Image from 'next/image';
import { BASE_PATH } from '@/lib/config';

export default function GalleryPage() {
    const [selectedTag, setSelectedTag] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedWork, setSelectedWork] = useState(null);

    // Fixed scroll value for NetaiChan to force Night appearance (1.0 = Night)
    const fixedNightScroll = useMotionValue(1);

    const works = worksData.works;

    // Extract unique tags and years
    const tags = ['All', ...new Set(works.flatMap(w => w.tags))];
    const years = ['All', ...new Set(works.map(w => w.year))].sort((a, b) => b - a); // Descending

    const filteredWorks = useMemo(() => {
        return works.filter(work => {
            const matchTag = selectedTag === 'All' || work.tags.includes(selectedTag);
            const matchYear = selectedYear === 'All' || work.year === Number(selectedYear);
            return matchTag && matchYear;
        });
    }, [works, selectedTag, selectedYear]);

    return (
        <div className="min-h-screen bg-[#050014] pb-20 pt-24 text-white">
            {/* Background Decor */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00D2FF]/20 via-[#050014] to-[#050014]" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="container mx-auto px-4 relative z-10"
            >
                {/* Header */}
                <div className="mb-12 relative flex flex-col items-center justify-center py-8">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-4 w-64 md:w-80 aspect-[3/1]">
                            <Image
                                src={`${BASE_PATH}/images/Gallery.png`}
                                alt="Gallery"
                                fill
                                className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            />
                        </div>
                        <p className="text-gray-400 font-bold tracking-wider">Archive of my digital dreams</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8 flex flex-col flex-wrap gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                    {/* Year Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-400">Year:</span>
                        <div className="flex flex-wrap gap-2">
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`rounded-full px-3 py-1 text-sm transition ${selectedYear === year
                                        ? 'bg-white text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                                        : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tag Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-400">Tag:</span>
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`rounded-full px-3 py-1 text-sm transition ${selectedTag === tag
                                        ? 'bg-[#00FF9D] text-black font-bold shadow-[0_0_10px_#00FF9D]'
                                        : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredWorks.length > 0 ? (
                        filteredWorks.map(work => (
                            <div key={work.id} onClick={() => setSelectedWork(work)}>
                                <WorkCard work={work} className="border-white/10 bg-white/5 hover:-translate-y-2 hover:bg-white/10" />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            No works found.
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Modal */}
            {selectedWork && (
                <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
            )}

            {/* Fixed Logo Navigation - Always visible on Gallery */}
            <Link href="/">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="fixed top-6 left-6 z-50 w-32 md:w-40 cursor-pointer transition-transform hover:scale-110"
                >
                    <Image
                        src={`${BASE_PATH}/images/ANETTAI_3DLogo_v2.png`}
                        alt="Home"
                        width={200}
                        height={80}
                        className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                </motion.div>
            </Link>

            {/* Global Elements - Fixed to Night Mode */}
            <NetaiChan scrollYProgress={fixedNightScroll} />
            <StarrySky scrollYProgress={fixedNightScroll} />
        </div>
    );
}
