import Link from "next/link";
import { ArrowRight, BarChart3, Users, Zap, Database, TrendingUp, BookOpen, Download, LayoutGrid, MessageSquare, Search, PenLine, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SidebarFilter from "@/components/SidebarFilter";
import { createClient } from "@/lib/supabase/server";

// Define Post type
type Post = {
  id: number;
  title: string;
  excerpt: string;
  type: string;
  created_at: string;
  tags: string[];
  image_url: string | null;
  profiles: any;
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : null;

  const supabase = await createClient();

  // Build Query
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
    .order('created_at', { ascending: false });

  // Apply Category Filter if exists
  if (category) {
    if (category === 'INSIGHT') {
      // Insight combines GENERAL and CONTINUE for example, or separate
      query = query.in('type', ['GENERAL', 'CONTINUE']);
    } else {
      query = query.eq('type', category);
    }
  }

  const { data: posts, error } = await query.limit(11);

  if (error) {
    console.error("Error fetching posts:", error);
  }

  // Separate posts for display
  const featuredPost = posts?.[0];
  const gridPosts = posts?.slice(1) || [];

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  }

  // Function to get Icon based on type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DATA': return <Database className="w-8 h-8 text-violet-500/50" />;
      case 'STUDY': return <Users className="w-8 h-8 text-fuchsia-500/50" />;
      case 'CONTINUE': return <TrendingUp className="w-8 h-8 text-emerald-500/50" />;
      default: return <BookOpen className="w-8 h-8 text-blue-500/50" />;
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'DATA': return 'violet';
      case 'STUDY': return 'fuchsia';
      case 'CONTINUE': return 'emerald';
      default: return 'blue';
    }
  }

  const getPostImage = (post: any) => {
    if (post.image_url) return post.image_url;
    switch (post.type) {
      case 'DATA': return '/images/defaults/data_cover.png';
      case 'STUDY': return '/images/defaults/study_cover.png';
      case 'CONTINUE': return '/images/defaults/continue_cover.png';
      case 'GENERAL': return '/images/defaults/general_cover.png';
      case 'COMMUNITY': return '/images/defaults/study_cover.png';
      default: return '/images/defaults/general_cover.png';
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#0f172a]">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <Navbar />

      <main className="flex-1 pb-20 relative z-10 w-full overflow-x-hidden">

        {/* Full Width Hero Section (Edge-to-Edge) */}
        <section className="relative w-full border-b border-white/5 bg-slate-900/50 shadow-2xl mb-12">
          {/* Banner Content Background */}
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

          {/* Content */}
          <div className="container mx-auto px-6 pt-40 pb-20 relative z-10 grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                NEW UPDATE 2.0
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight break-keep">
                기술은 <span className="text-blue-400">AI</span>에게,<br />
                분석은 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">사람</span>이.
              </h1>
              <p className="text-slate-300 mb-10 leading-relaxed text-lg max-w-lg">
                Dataracy는 공공 데이터의 가치를 재발견하고, 인문학적 인사이트를 공유하는 데이터 분석 전문가들의 공간입니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 text-base shadow-lg shadow-white/10 group">
                  무료 데이터 탐색 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link href="/community" className="px-8 py-4 rounded-xl glass text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-base">
                  커뮤니티 입장
                </Link>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative h-full hidden md:flex items-center justify-center pointer-events-none">
              <div className="relative w-96 h-96 animate-in fade-in zoom-in duration-1000">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-2xl rotate-12 blur-[60px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500 rounded-full blur-[80px] opacity-30"></div>
                <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 flex flex-col gap-6 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3 w-full">
                    <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-3 w-full bg-white/5 rounded"></div>
                    <div className="h-3 w-4/5 bg-white/5 rounded"></div>
                    <div className="h-3 w-full bg-white/5 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updated Main Content Layout */}
        <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar */}
          <aside className="lg:col-span-3 hidden lg:flex flex-col gap-6">
            <div className="sticky top-28 space-y-6">
              <Link href="/write" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm group">
                <PenLine className="w-4 h-4 group-hover:scale-110 transition-transform" /> 새 글 쓰기
              </Link>

              {/* Discover Menu with URL Params */}
              <div className="glass-card p-4 rounded-2xl">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Discover</h3>
                <nav className="space-y-1">
                  <Link href="/" scroll={false} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${!category ? 'bg-white/10 text-white shadow-lg shadow-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    <LayoutGrid className="w-4 h-4" /> 전체 보기
                  </Link>
                  <Link href="/?category=INSIGHT" scroll={false} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${category === 'INSIGHT' ? 'bg-white/10 text-white shadow-lg shadow-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    <BookOpen className="w-4 h-4" /> 인사이트 리포트
                  </Link>
                  <Link href="/?category=DATA" scroll={false} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${category === 'DATA' ? 'bg-white/10 text-white shadow-lg shadow-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    <Database className="w-4 h-4" /> 공공 데이터셋
                  </Link>
                  <Link href="/?category=STUDY" scroll={false} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${category === 'STUDY' ? 'bg-white/10 text-white shadow-lg shadow-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    <Users className="w-4 h-4" /> 스터디단 모집
                  </Link>
                  <Link href="/?category=COMMUNITY" scroll={false} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${category === 'COMMUNITY' ? 'bg-white/10 text-white shadow-lg shadow-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    <MessageSquare className="w-4 h-4" /> 커뮤니티
                  </Link>
                </nav>
              </div>

              {/* Filters */}
              <SidebarFilter />
            </div>
          </aside>


          {/* Right Content */}
          <div className="lg:col-span-9 flex flex-col gap-8 w-full min-w-0">

            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {category ? (
                  <>
                    {category === 'DATA' && <Database className="w-5 h-5 text-violet-400" />}
                    {category === 'INSIGHT' && <BookOpen className="w-5 h-5 text-blue-400" />}
                    {category === 'STUDY' && <Users className="w-5 h-5 text-fuchsia-400" />}
                    {category === 'COMMUNITY' && <MessageSquare className="w-5 h-5 text-emerald-400" />}
                    {category === 'INSIGHT' ? '인사이트 리포트' : category === 'DATA' ? '공공 데이터셋' : category === 'STUDY' ? '스터디 모집' : category === 'COMMUNITY' ? '자유 게시판' : '필터링 결과'}
                  </>
                ) : (
                  <>
                    <Users className="w-5 h-5 text-blue-400" /> 최신 콘텐츠
                  </>
                )}
              </h2>
              <div className="flex gap-2 text-sm bg-white/5 rounded-lg p-1">
                <span className="text-white font-medium px-3 py-1 rounded bg-slate-800 shadow cursor-pointer">최신순</span>
                <span className="text-slate-400 hover:text-white px-3 py-1 cursor-pointer transition-colors">인기순</span>
              </div>
            </div>

            {/* Empty State */}
            {(!posts || posts.length === 0) && (
              <div className="glass-card p-12 rounded-3xl text-center text-slate-400 border border-dashed border-white/10">
                <p>해당 카테고리에 등록된 글이 없습니다.</p>
                <Link href="/write" className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold">
                  <PenLine className="w-4 h-4" /> 첫 번째 글 작성하기
                </Link>
              </div>
            )}

            {/* Featured Post (Only show on Home or if fits category) */}
            {featuredPost && (
              <Link href={`/posts/${featuredPost.id}`} className="block w-full group relative z-0">
                <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[400px] flex flex-col md:flex-row group-hover:border-blue-500/50 transition-all duration-300">

                  <div className="absolute inset-0 z-0">
                    <img src={getPostImage(featuredPost)} className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700" alt="Background" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent md:bg-gradient-to-r" />
                  </div>

                  <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end w-full md:w-2/3">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-bold bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/20">{featuredPost.type}</span>
                      <span className="px-3 py-1 text-xs font-bold bg-white/10 text-slate-200 rounded-full border border-white/10 backdrop-blur-md">HOT TOPIC</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg line-clamp-1">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-300 text-lg line-clamp-1 mb-8 drop-shadow-md max-w-xl">
                      {featuredPost.excerpt || '내용 요약이 없습니다.'}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 flex items-center justify-center text-[10px] text-white font-bold">
                          {(featuredPost.profiles as any)?.name?.[0] || 'U'}
                        </div>
                        <span className="font-bold">{(featuredPost.profiles as any)?.name || '익명'}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span>{formatDate(featuredPost.created_at)}</span>
                    </div>
                  </div>



                  <div className="absolute right-8 top-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {gridPosts.map((post: any, index: number) => {
                const isWide = (index % 4 === 0 || index % 4 === 3);

                return (
                  <Link
                    href={`/posts/${post.id}`}
                    key={post.id}
                    className={`block group w-full min-w-0 ${isWide ? 'md:col-span-2' : 'md:col-span-1'}`}
                  >
                    <div className="glass-card p-5 rounded-2xl flex flex-col gap-4 group-hover:bg-white/5 transition-all h-full cursor-pointer w-full overflow-hidden border border-white/5 relative">
                      <div className={`rounded-xl bg-slate-800/50 mb-1 relative overflow-hidden border border-white/5 flex items-center justify-center w-full transition-all ${isWide ? 'h-48 md:h-64' : 'h-40'}`}>
                        <img src={getPostImage(post)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <span className={`absolute top-3 right-3 backdrop-blur text-xs px-3 py-1.5 rounded-lg text-white font-bold z-10 shadow-lg border border-white/10 
                            ${post.type === 'DATA' ? 'bg-violet-600/80' :
                            post.type === 'STUDY' ? 'bg-fuchsia-600/80' :
                              post.type === 'CONTINUE' ? 'bg-emerald-600/80' :
                                'bg-blue-600/80'}`}>
                          {post.type}
                        </span>
                      </div>

                      <div className="flex flex-col flex-1">
                        <h3 className={`font-bold text-white text-lg group-hover:text-blue-300 transition-colors w-full mb-2 leading-snug ${isWide ? 'text-xl md:text-2xl' : ''}`}>
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
                )
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-12 mb-20">
              <button className="px-10 py-4 rounded-full border border-white/10 text-slate-300 text-sm font-bold hover:bg-white/10 hover:text-white transition-all shadow-lg hover:shadow-white/5">
                더 많은 콘텐츠 보기
              </button>
            </div>

          </div>

        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-black/40 mt-auto w-full">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-75">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white">
              <BarChart3 className="w-3 h-3" />
            </div>
            <span className="font-bold tracking-wider text-slate-300">DATARACY</span>
          </div>
          <p className="mb-6">Copyright © 2026 Dataracy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
