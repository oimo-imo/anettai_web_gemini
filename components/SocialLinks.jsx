'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BASE_PATH } from '@/lib/config';

const socialData = [
    { name: 'X', url: 'https://x.com/subsleepics', icon: `${BASE_PATH}/images/sns/X.png` },
    { name: 'Instagram', url: 'https://www.instagram.com/subsleepics/', icon: `${BASE_PATH}/images/sns/Instagram.png` },
    { name: 'Pinterest', url: 'https://jp.pinterest.com/subsleepics', icon: `${BASE_PATH}/images/sns/Pinterest.png` },
    { name: 'BOOTH', url: 'https://subsleepics.booth.pm/', icon: `${BASE_PATH}/images/sns/BOOTH.png` },
    { name: 'note', url: 'https://note.com/subsleepics', icon: `${BASE_PATH}/images/sns/note.png` },
];

export default function SocialLinks({ className = "", filter = [] }) {
    const displayData = filter.length > 0
        ? socialData.filter(sns => filter.includes(sns.name))
        : socialData;

    return (
        <div className={`flex gap-4 ${className}`}>
            {displayData.map((sns) => (
                <Link
                    key={sns.name}
                    href={sns.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center"
                >
                    {/* Icon Container */}
                    <div className="relative w-10 h-10 transition-transform duration-300 md:group-hover:scale-110">
                        {/* Placeholder for missing images to avoid total collapse */}
                        <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20" />

                        <Image
                            src={sns.icon}
                            alt={sns.name}
                            fill
                            className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                            onError={(e) => {
                                // Fallback if image not found (user hasn't added them yet)
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement.style.backgroundColor = 'rgba(255,255,255,0.2)';
                                e.currentTarget.parentElement.innerHTML = `<span class="flex items-center justify-center w-full h-full text-[10px] text-white font-bold">${sns.name[0]}</span>`;
                            }}
                        />
                    </div>

                    {/* Tooltip (Desktop) / Label (Mobile) */}
                    <span className="
                        /* Mobile: Static Label */
                        mt-1 block text-[10px] font-bold text-white/90 drop-shadow-md
                        
                        /* Desktop: Tooltip */
                        md:absolute md:bottom-full md:mb-3 md:left-1/2 md:-translate-x-1/2 md:whitespace-nowrap 
                        md:rounded-lg md:bg-white md:px-2 md:py-1 md:text-sm md:text-black md:font-bold md:shadow-lg
                        md:opacity-0 md:transition-all md:duration-300 md:group-hover:opacity-100 md:group-hover:-translate-y-1
                        md:mt-0
                        
                        /* Tooltip Arrow (Desktop only pseudo-element trick difficult in Tailwind inline, skipping or adding simple arrow if easy) */
                        /* To add simple triangle in pure tailwind inline is verbose, so keeping just the bubble box for now as 'Hook' style. */
                    ">
                        {sns.name}
                        {/* Little triangle for desktop tooltip (optional, using CSS clip-path or border trick would be complex inline) */}
                    </span>
                </Link>
            ))}
        </div>
    );
}
