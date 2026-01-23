
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, MapPin, MessageSquare, ThumbsUp, Eye, Heart, Share2, MoreHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import PostActions from "@/components/PostActions";
import PostOwnerActions from "@/components/PostOwnerActions";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

// Force dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    // Fetch post details
    const { data: post, error } = await supabase
        .from('posts')
        .select(`
      *,
      profiles:author_id ( name, email, role )
    `)
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

    // Fetch Related Posts
    const { data: relatedPosts } = await supabase
        .from('posts')
        .select('id, title, type, image_url, created_at, profiles:author_id(name)')
        .neq('id', id)
        .limit(3)
        .order('created_at', { ascending: false });

    const getPostImage = (postCtx: any) => {
        if (postCtx.image_url) return postCtx.image_url;
        switch (postCtx.type) {
            case 'DATA': return '/images/defaults/data_cover.png';
            case 'STUDY': return '/images/defaults/study_cover.png';
            case 'CONTINUE': return '/images/defaults/continue_cover.png';
            case 'GENERAL': return '/images/defaults/general_cover.png';
            case 'COMMUNITY': return '/images/defaults/study_cover.png';
            default: return '/images/defaults/general_cover.png';
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col relative">
            <Navbar />

            {/* 1. Full Screen Width Hero Section */}
            <div className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-end pb-12 group">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={getPostImage(post)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
                </div>

                {/* Content Container (Constrained Width) */}
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium group/link backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40">
                            <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                            목록으로 돌아가기
                        </Link>
                    </div>

                    {/* Title & Info */}
                    <div className="max-w-5xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full border backdrop-blur-md ${post.type === 'DATA' ? 'bg-violet-500/20 border-violet-500/30 text-violet-300' :
                                post.type === 'STUDY' ? 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-300' :
                                    post.type === 'CONTINUE' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' :
                                        'bg-blue-500/20 border-blue-500/30 text-blue-300'
                                }`}>
                                {post.type}
                            </span>
                            <span className="text-slate-300 text-sm flex items-center gap-1 drop-shadow-md font-medium">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(post.created_at).toLocaleDateString('ko-KR')}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight break-keep drop-shadow-xl">
                            {post.title}
                        </h1>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {post.tags?.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-slate-900/50 border border-white/10 text-slate-300 text-sm hover:bg-slate-800 transition-colors backdrop-blur-md cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Grid */}
            <main className="flex-1 container mx-auto px-6 py-12 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: Main Content Body */}
                    <div className="lg:col-span-8 min-w-0">
                        <article>
                            {/* Map (Optional) */}
                            {post.type === 'DATA' && (
                                <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden p-6 mb-12 relative">
                                    <div className="flex items-center gap-2 mb-4 text-slate-300 font-bold">
                                        <MapPin className="w-5 h-5 text-red-500" />
                                        데이터 제공 위치
                                    </div>
                                    <div className="h-64 bg-[#1e293b] rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-700/50">
                                        <div className="text-center z-10">
                                            <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-bounce" />
                                            <p className="text-slate-400 text-sm">지도 시각화 모듈 (준비중)</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actual Text Content */}
                            <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed min-h-[300px] mb-12">
                                {post.content}
                            </div>

                            {/* Bottom Actions */}
                            <div className="border-t border-white/5 pt-8 pb-12">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-pink-400 hover:bg-slate-700 transition-all text-sm font-medium">
                                            <Heart className="w-4 h-4" /> 좋아요
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-blue-400 hover:bg-slate-700 transition-all text-sm font-medium">
                                            <MessageSquare className="w-4 h-4" /> 댓글
                                        </button>
                                    </div>
                                    <PostOwnerActions postId={post.id} authorId={post.author_id} currentUser={user} />
                                </div>

                                <PostActions post={post} />
                            </div>
                        </article>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <aside className="lg:col-span-4 min-w-0 space-y-8">

                        {/* Author Profile Card */}
                        <div className="glass-card p-6 rounded-2xl border border-white/10 sticky top-28">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg ${(post.profiles as any)?.role === 'ADMIN' ? 'bg-gradient-to-br from-violet-600 to-indigo-600' : 'bg-gradient-to-br from-slate-600 to-slate-500'
                                    }`}>
                                    {(post.profiles as any)?.name?.[0] || 'U'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <p className="font-bold text-white text-lg truncate">{(post.profiles as any)?.name || '익명'}</p>
                                        {(post.profiles as any)?.role === 'ADMIN' && (
                                            <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 text-[10px] font-bold border border-violet-500/20">ADMIN</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 truncate">{(post.profiles as any)?.email}</p>
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mb-4">
                                <User className="w-4 h-4" /> 팔로우
                            </button>

                            <div className="grid grid-cols-2 gap-2 text-center">
                                <div className="bg-white/5 rounded-lg p-3">
                                    <p className="text-lg font-bold text-white">12</p>
                                    <p className="text-xs text-slate-400">게시글</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-3">
                                    <p className="text-lg font-bold text-white">48</p>
                                    <p className="text-xs text-slate-400">팔로워</p>
                                </div>
                            </div>
                        </div>

                        {/* Related Content */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-400 mb-4 px-1 uppercase tracking-wider">관련 콘텐츠</h3>
                            <div className="space-y-4">
                                {relatedPosts && relatedPosts.length > 0 ? (
                                    relatedPosts.map((rPost: any) => (
                                        <Link href={`/posts/${rPost.id}`} key={rPost.id} className="block group">
                                            <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors items-start">
                                                <div className="w-20 h-14 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/5">
                                                    <img src={getPostImage(rPost)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Related" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-1">
                                                        {rPost.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                                        <span>{rPost.type}</span>
                                                        <span>•</span>
                                                        <span>{(rPost.profiles as any)?.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500 p-4 text-center bg-white/5 rounded-xl">관련 게시물이 없습니다.</p>
                                )}
                            </div>
                        </div>

                    </aside>
                </div>
            </main>
        </div>
    )
}
