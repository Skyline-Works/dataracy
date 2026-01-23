'use client'

import Link from "next/link";
import { ArrowRight, BarChart3, Search, User, LogOut, Settings, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setIsDropdownOpen(false);
        router.refresh();
    };

    return (
        <header className="fixed top-0 w-full z-50 glass border-b border-white/5 h-20 transition-all">
            <div className="container mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <span className="text-white group-hover:text-blue-200 transition-colors">Dataracy</span>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="관심있는 데이터나 토픽을 검색하세요..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80 transition-all placeholder:text-slate-500"
                    />
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold text-white">{user.user_metadata.full_name || 'User'}</p>
                                    <p className="text-[10px] text-slate-500">Member</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold border border-white/10 shadow-lg shadow-fuchsia-500/10">
                                    {user.email?.[0].toUpperCase() ?? 'U'}
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-60 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
                                    <div className="px-4 py-3 border-b border-white/5 bg-slate-800/30">
                                        <p className="text-sm text-white font-bold truncate">{user.user_metadata.full_name || '사용자'}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>

                                    <div className="p-1">
                                        <Link href="/mypage" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-colors">
                                            <User className="w-4 h-4" /> 마이페이지
                                        </Link>

                                        <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-bold">
                                            <ShieldAlert className="w-4 h-4" /> 관리자 (Admin)
                                        </Link>

                                        <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-colors">
                                            <Settings className="w-4 h-4" /> 설정
                                        </Link>
                                    </div>

                                    <div className="p-1 border-t border-white/5">
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" /> 로그아웃
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-bold text-slate-400 hover:text-white px-4 py-2 transition-colors">
                                로그인
                            </Link>
                            <Link href="/signup" className="hidden md:flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-all shadow-lg hover:shadow-white/20">
                                <ArrowRight className="w-4 h-4" />
                                시작하기
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Backdrop for dropdown */}
            {isDropdownOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
            )}
        </header>
    );
}
