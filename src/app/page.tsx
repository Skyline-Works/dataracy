import Link from "next/link";
import { ArrowRight, BarChart3, Users, Zap, Database, TrendingUp, BookOpen, Download, LayoutGrid, MessageSquare, Search, PenLine } from "lucide-react";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";

// Define Post type
// (Using 'any' for profiles to handle Supabase join array/object ambiguity safely)
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

export default async function Home() {
  const supabase = await createClient();

  // Fetch posts from Supabase
  const { data: posts, error } = await supabase
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
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching posts:", error);
  }

  // Separate posts for display
  const featuredPost = posts?.[0]; // The latest one as featured
  const gridPosts = posts?.slice(1) || []; // The rest in grid

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

          {/* Adjusted padding top (pt-40) for taller navbar */}
          <div className="container mx-auto px-6 pt-40 pb-20 relative z-10 grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left: Text Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                NEW UPDATE
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight break-keep">
                기술은 <span className="text-blue-400">AI</span>에게,<br />
                분석은 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">사람</span>이.
              </h1>
              <p className="text-slate-300 mb-10 leading-relaxed text-lg max-w-lg">
                Dataracy는 공공 데이터의 가치를 재발견하고, 인문학적 인사이트를 공유하는 데이터 분석 전문가들의 공간입니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 text-base shadow-lg shadow-white/10">
                  무료 데이터 탐색 <ArrowRight className="w-5 h-5" />
                </button>
                <Link href="/community" className="px-8 py-4 rounded-xl glass text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2 text-base">
                  커뮤니티 입장
                </Link>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative h-full hidden md:flex items-center justify-center pointer-events-none">
              {/* CSS Art Placeholder (Larger) */}
              <div className="relative w-96 h-96">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-2xl rotate-12 blur-[60px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500 rounded-full blur-[80px] opacity-30"></div>
                <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 flex flex-col gap-6 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3 w-full">
                    <div className="h-4 w-2/3 bg-white/10 rounded"></div>
                    <div className="h-3 w-full bg-white/5 rounded"></div>
                    <div className="h-3 w-4/5 bg-white/5 rounded"></div>
                    <div className="h-3 w-full bg-white/5 rounded"></div>
                  </div>
                  <div className="mt-auto flex gap-4 w-full h-32 items-end">
                    <div className="flex-1 bg-blue-500/20 h-[60%] rounded-t-lg border-t border-blue-500/50 relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">60%</div>
                    </div>
                    <div className="flex-1 bg-violet-500/20 h-[80%] rounded-t-lg border-t border-violet-500/50 relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">80%</div>
                    </div>
                    <div className="flex-1 bg-fuchsia-500/20 h-[50%] rounded-t-lg border-t border-fuchsia-500/50 relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-fuchsia-500 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">50%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Layout: Sidebar + Grid */}
        <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar: Categories (Sticky) */}
          <aside className="lg:col-span-3 hidden lg:flex flex-col gap-6">
            <div className="sticky top-28 space-y-6">

              {/* Write Button in Sidebar */}
              <Link href="/write" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm group">
                <PenLine className="w-4 h-4 group-hover:scale-110 transition-transform" /> 새 글 쓰기
              </Link>

              {/* Category Navigation */}
              <div className="glass-card p-4 rounded-2xl">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Discover</h3>
                <nav className="space-y-1">
                  <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/10 text-white font-medium shadow-lg shadow-white/5">
                    <LayoutGrid className="w-4 h-4" />
                    전체 보기
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                    <BookOpen className="w-4 h-4" />
                    인사이트 리포트
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                    <Database className="w-4 h-4" />
                    공공 데이터셋
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                    <Users className="w-4 h-4" />
                    스터디단 모집
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                    <MessageSquare className="w-4 h-4" />
                    커뮤니티
                  </Link>
                </nav>
              </div>

              {/* Popular Tags */}
              <div className="glass-card p-4 rounded-2xl">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Popular Topic</h3>
                <div className="flex flex-wrap gap-2 px-2">
                  {['#교통분석', '#상권분석', '#파이썬', '#지하철', '#인구소멸', '#ESG', '#부동산'].map(tag => (
                    <span key={tag} className="text-xs text-slate-400 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-slate-500 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </aside>


          {/* Right Content Area */}
          <div className="lg:col-span-9 flex flex-col gap-8 w-full min-w-0">
            {/* min-w-0 Added to prevent flex items from checking out parent width */}

            {/* Featured Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                최신 콘텐츠
              </h2>
              <div className="flex gap-2 text-sm">
                <span className="text-white font-medium cursor-pointer">최신순</span>
                <span className="text-slate-500 hover:text-white cursor-pointer transition-colors">인기순</span>
              </div>
            </div>

            {/* If no posts */}
            {(!posts || posts.length === 0) && (
              <div className="glass-card p-8 rounded-2xl text-center text-slate-400 py-20">
                <p>아직 등록된 글이 없습니다. 첫 번째 글을 작성해보세요!</p>
                <Link href="/write" className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
                  <PenLine className="w-4 h-4" /> 글 쓰러 가기
                </Link>
              </div>
            )}

            {/* Featured Article layout (Latest Post) */}
            {featuredPost && (
              <Link href={`/posts/${featuredPost.id}`} className="block w-full">
                <div className="glass-card rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-all cursor-pointer h-full w-full">
                  <div className="grid md:grid-cols-2 h-full">
                    {/* Image or Placeholder */}
                    <div className="h-48 md:h-auto bg-slate-800 relative overflow-hidden">
                      {featuredPost.image_url ? (
                        <img src={featuredPost.image_url} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={featuredPost.title} />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900 z-10" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            {getTypeIcon(featuredPost.type)}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="p-6 md:p-8 flex flex-col justify-center bg-transparent min-w-0">
                      <div className="flex gap-2 mb-3">
                        <span className="px-2.5 py-1 text-[10px] font-bold bg-blue-500 text-white rounded">{featuredPost.type}</span>
                        <span className="px-2.5 py-1 text-[10px] font-bold bg-white/10 text-slate-300 rounded border border-white/5">NEW</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-snug break-keep">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                        {featuredPost.excerpt || '내용 요약이 없습니다.'}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
                            {(featuredPost.profiles as any)?.name?.[0] || 'U'}
                          </div>
                          <span>{(featuredPost.profiles as any)?.name || '익명'}</span>
                        </div>
                        <span>•</span>
                        <span>{formatDate(featuredPost.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid of Content (Articles, Datasets mixed) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {gridPosts.map((post: any) => (
                <Link href={`/posts/${post.id}`} key={post.id} className="block group w-full min-w-0">
                  <div className="glass-card p-5 rounded-2xl flex flex-col gap-3 group-hover:bg-white/5 transition-all h-full cursor-pointer w-full overflow-hidden">

                    <div className="h-32 rounded-xl bg-slate-800/50 mb-2 relative overflow-hidden border border-white/5 flex items-center justify-center w-full">
                      {post.image_url ? (
                        <img src={post.image_url} className="absolute inset-0 w-full h-full object-cover" alt={post.title} />
                      ) : (
                        getTypeIcon(post.type)
                      )}
                      <span className="absolute top-2 right-2 bg-black/40 text-[10px] px-2 py-0.5 rounded text-white font-bold z-10">{post.type}</span>
                    </div>

                    <h3 className={`font-bold text-white group-hover:text-${getTypeColor(post.type)}-300 transition-colors truncate w-full`}>{post.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 flex-1 break-keep">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5 text-xs text-slate-500 w-full">
                      <div className="flex items-center gap-1">
                        {(post.profiles as any)?.name || '익명'}
                      </div>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-8 py-3 rounded-full border border-white/10 text-slate-400 text-sm hover:bg-white/5 hover:text-white transition-all">
                더 많은 콘텐츠 보기
              </button>
            </div>

          </div>

        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-black/40 mt-12 w-full">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-75">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white">
              <BarChart3 className="w-3 h-3" />
            </div>
            <span className="font-bold tracking-wider text-slate-300">DATARACY</span>
          </div>
          <p className="mb-6">Copyright © 2026 Dataracy. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <Link href="#" className="hover:text-slate-300">서비스 이용약관</Link>
            <Link href="#" className="hover:text-slate-300">개인정보처리방침</Link>
            <Link href="#" className="hover:text-slate-300">고객센터</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
