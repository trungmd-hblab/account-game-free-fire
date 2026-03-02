'use client';

import { Container, Text } from '@mantine/core';
import { IconBolt, IconCoin, IconSparkles } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const PromoBanner = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(prev => !prev);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container size="full" p={0}>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 p-4 shadow-2xl">
                {/* Animated background sparkles */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse"></div>
                
                {/* Floating sparkle effects */}
                <div className="absolute top-2 left-4 animate-bounce">
                    <IconSparkles size={16} className="text-yellow-300" />
                </div>
                <div className="absolute top-3 right-8 animate-bounce delay-300">
                    <IconSparkles size={12} className="text-white" />
                </div>
                <div className="absolute bottom-2 right-4 animate-bounce delay-700">
                    <IconSparkles size={14} className="text-yellow-400" />
                </div>

                <div className="relative flex items-center justify-center gap-3">
                    {/* Lightning icon */}
                    <div className={`transform transition-all duration-500 ${animate ? 'scale-125 rotate-12' : 'scale-100'}`}>
                        <IconBolt size={24} className="text-yellow-300" />
                    </div>

                    {/* Main text */}
                    <div className="text-center">
                        <Text 
                            size="lg" 
                            fw={800}
                            className={`text-white drop-shadow-lg transform transition-all duration-500 ${animate ? 'scale-110' : 'scale-100'}`}
                            style={{
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% 200%',
                                animation: 'gradient 2s ease infinite'
                            }}
                        >
                            🔥 X3 NẠP TIỀN TRONG HÔM NAY 🔥
                        </Text>
                        
                        <Text 
                            size="sm" 
                            className="text-yellow-100 font-semibold mt-1"
                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                        >
                            Nhận ngay gấp 3 lần kim cương khi nạp bất kỳ!
                        </Text>
                    </div>

                    {/* Coin icon */}
                    <div className={`transform transition-all duration-500 ${animate ? 'scale-125 -rotate-12' : 'scale-100'}`}>
                        <IconCoin size={24} className="text-yellow-300" />
                    </div>
                </div>

                {/* Pulse effect border */}
                <div className="absolute inset-0 rounded-xl border-2 border-yellow-400 animate-pulse"></div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </Container>
    );
};

export default PromoBanner;