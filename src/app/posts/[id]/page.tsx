import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Share2, MessageSquare, Heart, Paperclip, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch post details
    const { data: post, error } = await supabase
        .from('posts')
        .select(`
      *,
      profiles:author_id ( name, email )
    `)
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

    // Format Date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
            </div>

            <Navbar />

            <main className="flex-1 container mx-auto px-6 py-32 max-w-4xl relative z-10">

                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 목록으로 돌아가기
                </Link>

                {/* Header Section */}
                <header className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
                        {post.type}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight break-keep">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-b border-white/5 pb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#0f172a]">
                                {post.profiles?.name?.[0] || 'U'}
                            </div>
                            <span className="text-slate-200 font-medium">{post.profiles?.name || '익명 사용자'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.created_at)}
                        </div>
                    </div>
                </header>

                {/* Image Section */}
                {post.image_url && (
                    <div className="mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <img src={post.image_url} alt="Cover" className="w-full object-cover max-h-[500px]" />
                    </div>
                )}

                {/* Content Section */}
                <article className="glass-card p-8 md:p-12 rounded-3xl mb-8 min-h-[300px]">
                    <div className="prose prose-invert prose-lg max-w-none whitespace-pre-wrap leading-loose text-slate-300">
                        {post.content}
                    </div>
                </article>

                {/* File Download Section */}
                {post.file_url && (
                    <div className="mb-12">
                        <a href={post.file_url} target="_blank" rel="noopener noreferrer" className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors group border border-blue-500/30">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <Paperclip className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">첨부파일 다운로드</h4>
                                <p className="text-xs text-slate-400">이 게시글에 포함된 데이터셋 또는 자료입니다.</p>
                            </div>
                            <Download className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                        </a>
                    </div>
                )}

                {/* Footer Actions & Tags */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-20">
                    <div className="flex flex-wrap gap-2">
                        {post.tags?.map((tag: string) => (
                            <span key={tag} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-sm hover:border-slate-500 transition-colors cursor-pointer">
                                <Tag className="w-3 h-3" /> {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors text-sm font-medium">
                            <Heart className="w-4 h-4 text-pink-500" /> 좋아요
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors text-sm font-medium">
                            <Share2 className="w-4 h-4" /> 공유하기
                        </button>
                    </div>
                </div>

            </main>
        </div>
    )
}
