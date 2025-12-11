'use client';
import { motion, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export default function StarrySky({ scrollYProgress }) {
    // Opacity: Invisible until ~60-70% scroll, then fully visible at night
    const opacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

    // Generate random stars
    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 1, // 1px to 4px
            delay: Math.random() * 3, // Random animation delay
        }));
    }, []);

    return (
        <motion.div
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{ opacity }}
        >
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-twinkle shadow-[0_0_4px_#FFF] opacity-80"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}
        </motion.div>
    );
}
