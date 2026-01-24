import Link from "next/link";
import { BookOpen, PenLine } from "lucide-react";
import Navbar from "@/components/Navbar";
import SidebarFilter from "@/components/SidebarFilter";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
    title: "Reports | Dataracy",
    description: "Deep dive into data trends and insights.",
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ReportsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const tags = typeof params.tags === 'string' ? params.tags.split(',') : [];

    const supabase = await createClient();

    // Start building query
    let query = supabase
        .from('posts')
        .select(`
            id,
            title,
            excerpt,
            type,
            tags,
            image_url,
            created_at,
            profiles:author_id ( name )
        `)
        .in('type', ['INSIGHT', 'GENERAL', 'CONTINUE'])
        .order('created_at', { ascending: false });

    // Apply Tag Filter
    if (tags.length > 0) {
        query = query.overlaps('tags', tags);
    }

    const { data: posts, error } = await query;

    if (error) {
        console.error("Error fetching reports:", error);
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    }

    const getPostImage = (post: any) => {
        if (post.image_url) return post.image_url;
        return '/images/defaults/general_cover.png'; // Default for Reports
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#0f172a]">
            <Navbar />

            <main className="flex-1 pt-32 pb-20 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Sidebar */}
                <aside className="lg:col-span-3 hidden lg:flex flex-col gap-6">
                    <div className="sticky top-28 space-y-6">
                        <Link href="/write" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm group">
                            <PenLine className="w-4 h-4 group-hover:scale-110 transition-transform" /> 새 리포트 작성
                        </Link>

                        <div className="glass-card p-4 rounded-2xl">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Reports</h3>
                            <p className="text-sm text-slate-400 px-2">
                                사회, 경제, 문화 등 다양한 분야의 현상을 데이터 관점에서 깊이 있게 분석한 리포트를 만나보세요.
                            </p>
                        </div>

                        <SidebarFilter />
                    </div>
                </aside>

                {/* Right Content */}
                <div className="lg:col-span-9 flex flex-col gap-8 w-full min-w-0">
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-blue-400" />
                            인사이트 리포트
                        </h1>
                        <div className="flex gap-2 text-sm bg-white/5 rounded-lg p-1">
                            <span className="text-white font-medium px-3 py-1 rounded bg-slate-800 shadow cursor-pointer">최신순</span>
                            <span className="text-slate-400 hover:text-white px-3 py-1 cursor-pointer transition-colors">인기순</span>
                        </div>
                    </div>

                    {(!posts || posts.length === 0) ? (
                        <div className="glass-card p-12 rounded-3xl text-center text-slate-400 border border-dashed border-white/10 flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-slate-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">등록된 리포트가 없습니다</h3>
                                <p className="text-sm">첫 번째 리포트를 작성해보세요.</p>
                            </div>
                            <Link href="/write" className="mt-2 px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-colors">
                                리포트 작성하기
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post: any) => (
                                <Link href={`/posts/${post.id}`} key={post.id} className="block group w-full">
                                    <div className="glass-card p-5 rounded-2xl flex flex-col gap-4 group-hover:bg-white/5 transition-all h-full cursor-pointer w-full overflow-hidden border border-white/5">
                                        <div className="rounded-xl bg-slate-800/50 mb-1 relative overflow-hidden border border-white/5 flex items-center justify-center w-full h-48">
                                            <img src={getPostImage(post)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                            <span className="absolute top-3 right-3 backdrop-blur bg-blue-600/80 text-xs px-3 py-1.5 rounded-lg text-white font-bold z-10 shadow-lg border border-white/10">
                                                INSIGHT
                                            </span>
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors w-full mb-2 leading-snug line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-slate-400 line-clamp-2 break-keep mb-4 flex-1">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 text-xs text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white">
                                                        {(post.profiles as any)?.name?.[0] || 'U'}
                                                    </div>
                                                    <span>{(post.profiles as any)?.name || '익명'}</span>
                                                </div>
                                                <span>{formatDate(post.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
