'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

export default function WorkModal({ work, onClose }) {
    // Lock body scroll
    useEffect(() => {
        if (work) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [work]);

    if (!work) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white/10 p-1 md:p-2 shadow-[0_0_50px_rgba(255,255,255,0.2)] border border-white/30 backdrop-blur-xl"
                    onClick={(e) => e.stopPropagation()} // Prevent close on content click
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40 border border-white/40"
                    >
                        ✕
                    </button>

                    <div className="flex flex-col md:flex-row">
                        {/* Image Section */}
                        <div className="relative aspect-square w-full md:w-1/2 rounded-2xl overflow-hidden bg-black/20">
                            {work.image ? (
                                <Image src={work.image} alt={work.title} fill className="object-contain" />
                            ) : (
                                <div className="flex h-full items-center justify-center text-white/50">No Image</div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col p-6 md:w-1/2 text-white">
                            <h2 className="text-3xl font-bold mb-2 drop-shadow-md">{work.title}</h2>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {work.tags?.map(tag => (
                                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-white/20 border border-white/10">
                                        {tag}
                                    </span>
                                ))}
                                <span className="px-2 py-1 text-xs rounded-full bg-[#00D2FF]/20 border border-[#00D2FF]/40 text-[#00D2FF]">
                                    {work.year}
                                </span>
                            </div>

                            <p className="border-b border-white/10 pb-4 mb-4 text-white/80 leading-relaxed">
                                {work.description}
                            </p>

                            <div className="mt-auto">
                                <h3 className="text-sm font-bold text-gray-300 mb-2">Tools</h3>
                                <div className="flex gap-2">
                                    {work.tools?.map(tool => (
                                        <span key={tool} className="text-sm text-[#70FF00]">
                                            #{tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
