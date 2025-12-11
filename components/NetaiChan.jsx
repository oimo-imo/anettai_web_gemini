'use client';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function NetaiChan({ scrollYProgress }) {
    const [clickCount, setClickCount] = useState(0);

    // Fallback for standalone usage (though intended to be controlled by parent)
    const fallbackScroll = useMotionValue(0);
    const scroll = scrollYProgress || fallbackScroll;

    // Opacity transitions matching global background cycle
    // Layering strategy: Day is bottom (always visible), Sunset overlays, Night overlays everything.

    // Day: Always 1 (covered by others)
    const opacityDay = 1;

    // Sunset: Fades in [0.3, 0.5]
    const opacitySunsetLayer = useTransform(scroll, [0.3, 0.5], [0, 1]);

    // Night: Fades in [0.7, 0.9]
    const opacityNightLayer = useTransform(scroll, [0.7, 0.9], [0, 1]);

    // Character Filter transitions
    // Day: Neutral
    // Sunset: Reddish filter (Sepia + Hue shift to red/orange + Boost saturation)
    // Night: Dark (Just reduce brightness to avoid blue skin issue)
    const filter = useTransform(scroll,
        [0, 0.4, 0.8],
        [
            "brightness(1) sepia(0) saturate(1) hue-rotate(0deg)",
            "brightness(0.9) sepia(0.5) saturate(1.5) hue-rotate(-30deg)",
            "brightness(0.5) sepia(0) saturate(1) hue-rotate(0deg)"
        ]
    );

    const messages = [
        "ZZZ...",
        "むにゃ...",
        "まだ寝てたい...",
        "ふわぁ...",
    ];

    const handleClick = () => {
        setClickCount((prev) => (prev + 1) % messages.length);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-0 flex justify-center pointer-events-none">
            {/* Opening Animation Wrapper for Sea - Fades in after Sky (delay 0.5s) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 w-full flex justify-center"
            >
                {/* Sea Background Container - Uses Grid for stacking */}
                <motion.div
                    className="absolute -bottom-5 w-full grid grid-cols-1"
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Day Sea */}
                    <motion.div style={{ opacity: opacityDay }} className="col-start-1 row-start-1 w-full relative">
                        <Image
                            src="/backgrounds/sea-day.png"
                            alt="Sea Day"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                            className="opacity-90"
                            priority
                        />
                    </motion.div>

                    {/* Sunset Sea */}
                    <motion.div style={{ opacity: opacitySunsetLayer }} className="col-start-1 row-start-1 w-full relative">
                        <Image
                            src="/backgrounds/sea-sunset.png"
                            alt="Sea Sunset"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                            className="opacity-90"
                            priority
                        />
                    </motion.div>

                    {/* Night Sea */}
                    <motion.div style={{ opacity: opacityNightLayer }} className="col-start-1 row-start-1 w-full relative">
                        <Image
                            src="/backgrounds/sea-night.png"
                            alt="Sea Night"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                            className="opacity-90"
                            priority
                        />
                    </motion.div>

                    {/* Fade overlay for blend into page background */}
                    <div className="col-start-1 row-start-1 w-full h-full bg-gradient-to-t from-transparent via-transparent to-transparent z-10" />
                </motion.div>
            </motion.div>

            {/* Character Container - Fades in after Sea (delay 0.5s - Sync with Sea) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full flex items-end justify-center pointer-events-auto"
                onClick={handleClick}
            >
                <motion.div
                    className="relative w-full"
                    style={{ filter }}
                >
                    <Image
                        src="/images/ANETTAI_netai.png"
                        alt="寝帯ちゃん"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="drop-shadow-xl"
                        priority
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
