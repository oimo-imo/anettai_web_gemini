import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function GlossyButton({ children, className, ...props }) {
    return (
        <button
            className={twMerge(
                clsx(
                    "relative overflow-hidden rounded-full px-8 py-3 font-bold text-white transition-all duration-300",
                    "bg-gradient-to-b from-day-main to-[#00A0FF]", // Base gradient
                    "border border-[rgba(255,255,255,0.6)]", // Bevel light
                    "shadow-[0_4px_10px_rgba(0,210,255,0.4),_inset_0_1px_0_rgba(255,255,255,0.6)]", // Glow + Inner highlight
                    "group hover:scale-105 active:scale-95",
                    "hover:shadow-[0_6px_15px_rgba(0,210,255,0.6),_inset_0_1px_0_rgba(255,255,255,0.8)]",
                    className
                )
            )}
            {...props}
        >
            {/* Gloss reflection overlay */}
            <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/60 to-transparent opacity-80 pointer-events-none rounded-t-full" />

            {/* Content */}
            <span className="relative z-10 drop-shadow-sm">{children}</span>
        </button>
    );
}
