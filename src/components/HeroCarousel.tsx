'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, Database, MessageSquare } from 'lucide-react';

const SLIDES = [
    {
        id: 1,
        badge: 'NEW UPDATE 2.0',
        title: <>기술은 <span className="text-blue-400">AI</span>에게,<br />분석은 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">사람</span>이.</>,
        description: 'Dataracy는 공공 데이터의 가치를 재발견하고, 인문학적 인사이트를 공유하는 데이터 분석 전문가들의 공간입니다.',
        buttonText: '리포트 탐색',
        buttonLink: '/reports',
        icon: <BarChart3 className="w-8 h-8 text-white" />,
        gradientFrom: 'from-blue-500',
        gradientTo: 'to-indigo-600',
        visualColor: 'bg-blue-500',
    },
    {
        id: 2,
        badge: 'DATASETS',
        title: <>숨겨진 <span className="text-emerald-400">가치</span>를<br />찾아내는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">여정</span>.</>,
        description: '방대한 공공 데이터를 쉽게 탐색하고, 정제된 고품질 데이터셋을 프로젝트에 바로 활용해보세요.',
        buttonText: '데이터셋 보러가기',
        buttonLink: '/datasets',
        icon: <Database className="w-8 h-8 text-white" />,
        gradientFrom: 'from-emerald-500',
        gradientTo: 'to-teal-600',
        visualColor: 'bg-emerald-500',
    },
    {
        id: 3,
        badge: 'COMMUNITY',
        title: <>함께 <span className="text-fuchsia-400">성장</span>하는<br />지식 <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">네트워크</span>.</>,
        description: '데이터 분석가들과 함께 인사이트를 나누고, 새로운 관점을 발견하는 커뮤니티에 참여하세요.',
        buttonText: '커뮤니티 입장',
        buttonLink: '/community',
        icon: <MessageSquare className="w-8 h-8 text-white" />,
        gradientFrom: 'from-fuchsia-500',
        gradientTo: 'to-pink-600',
        visualColor: 'bg-fuchsia-500',
    }
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000); // 5초마다 자동 슬라이드

        return () => clearInterval(timer);
    }, []);

    const slide = SLIDES[currentSlide];

    return (
        <section className="relative w-full border-b border-white/5 bg-slate-900/50 shadow-2xl mb-12 overflow-hidden h-[600px]">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-900/30"></div>
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                </svg>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 h-full relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid md:grid-cols-2 gap-12 items-center h-full pt-20"
                    >
                        {/* Left Text Content */}
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/10 text-slate-300 text-xs font-bold mb-8 backdrop-blur-sm">
                                <span className={`relative flex h-2 w-2`}>
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${slide.visualColor}`}></span>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${slide.visualColor}`}></span>
                                </span>
                                {slide.badge}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight break-keep">
                                {slide.title}
                            </h1>

                            <p className="text-slate-300 mb-10 leading-relaxed text-lg max-w-lg">
                                {slide.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={slide.buttonLink}
                                    className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 text-base shadow-lg shadow-white/10 group"
                                >
                                    {slide.buttonText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Visual Content */}
                        <div className="relative h-full hidden md:flex items-center justify-center pointer-events-none">
                            <div className="relative w-96 h-96">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className={`absolute top-0 right-0 w-32 h-32 ${slide.visualColor} rounded-2xl rotate-12 blur-[60px] opacity-40 animate-pulse`}
                                />
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500 rounded-full blur-[80px] opacity-30"
                                />

                                <motion.div
                                    initial={{ y: 20, opacity: 0, rotate: -5 }}
                                    animate={{ y: 0, opacity: 1, rotate: -3 }}
                                    whileHover={{ rotate: 0 }}
                                    className="absolute inset-0 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 flex flex-col gap-6 transform transition-transform duration-500 items-start"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientTo} flex items-center justify-center shadow-lg`}>
                                        {slide.icon}
                                    </div>
                                    <div className="space-y-3 w-full">
                                        <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse"></div>
                                        <div className="h-3 w-full bg-white/5 rounded"></div>
                                        <div className="h-3 w-4/5 bg-white/5 rounded"></div>
                                        <div className="h-3 w-full bg-white/5 rounded"></div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {SLIDES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
