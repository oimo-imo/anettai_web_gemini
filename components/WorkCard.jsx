import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

export default function WorkCard({ work, className, ...props }) {
    return (
        <div
            {...props}
            className={twMerge(
                clsx(
                    "group relative aspect-square w-full cursor-pointer rounded-2xl bg-white p-2 transition-transform duration-300",
                    "border-2 border-white/40",
                    "shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1),_inset_0_-4px_2px_rgba(0,0,0,0.05),_inset_0_2px_4px_rgba(255,255,255,0.8)]", // Plastic thickness
                    "hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15),_inset_0_-4px_2px_rgba(0,0,0,0.05),_inset_0_2px_4px_rgba(255,255,255,0.8)]",
                    className
                )
            )}
        >
            {/* Image Container with inner shadow/rounding */}
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-100">
                {work.image ? (
                    <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">No Image</div>
                )}

                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </div>

            {/* Label (optional, based on spec hover effect "Title neon glow") */}
            {/* Label (Text only, Bottom-Left) */}
            <div className="absolute bottom-3 left-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
                <span className="text-lg font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">
                    {work.title}
                </span>
            </div>
        </div>
    );
}
