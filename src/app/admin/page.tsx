'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
    ShieldAlert, Users, FileText, Trash2, ArrowLeft,
    BarChart3, Activity, Settings, LayoutDashboard, Search, LogOut
} from 'lucide-react'

// Tab definitions
const TABS = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'contents', label: '콘텐츠 관리', icon: FileText },
    { id: 'users', label: '사용자 관리', icon: Users },
    { id: 'settings', label: '설정', icon: Settings },
]

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState<any[]>([])
    const [userCount, setUserCount] = useState(0)

    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        checkAdmin()
        fetchData()
    }, [])

    const checkAdmin = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            router.push('/login')
            return
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'ADMIN') {
            alert("관리자 권한이 없습니다.")
            router.push('/')
        } else {
            setIsAdmin(true)
        }
        setIsLoading(false)
    }

    const fetchData = async () => {
        // Fetch Posts
        const { data: postsData } = await supabase
            .from('posts')
            .select('*, profiles(name, email)')
            .order('created_at', { ascending: false })

        // Fetch User Count
        const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })

        setPosts(postsData || [])
        setUserCount(count || 0)
    }

    const handleDeletePost = async (postId: number) => {
        if (!confirm("정말 이 게시글을 삭제하시겠습니까? (복구 불가)")) return

        await supabase.from('posts').delete().eq('id', postId)
        setPosts(posts.filter(p => p.id !== postId))
    }

    if (isLoading) {
        return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">Loading Admin Panel...</div>
    }

    if (!isAdmin) return null

    return (
        <div className="flex h-screen bg-[#0f172a] text-slate-100 overflow-hidden">

            {/* Left Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col pt-6 pb-6 shadow-2xl z-20">
                <div className="px-6 mb-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <span>Admin</span>
                    </Link>
                    <p className="text-xs text-slate-500 ml-10">Dataracy Manager</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {TABS.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        )
                    })}
                </nav>

                <div className="px-4 mt-auto">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                        <LogOut className="w-5 h-5" />
                        사이트로 돌아가기
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header (Increased Height to h-24) */}
                <header className="h-24 bg-slate-900/50 backdrop-blur border-b border-white/5 flex items-center justify-between px-8 z-10">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        {TABS.find(t => t.id === activeTab)?.label}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="통합 검색..."
                                className="bg-slate-800 border border-white/5 rounded-full py-2.5 pl-9 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/50 w-64 transition-all focus:w-80"
                            />
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">

                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="max-w-7xl mx-auto space-y-8">
                            {/* KPI Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-800/50 flex flex-col justify-between h-32 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <Users className="w-16 h-16 text-blue-500" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-400">Total Users</p>
                                    <h3 className="text-4xl font-bold text-white">{userCount} <span className="text-sm font-normal text-emerald-400 ml-2">+12%</span></h3>
                                </div>
                                <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-800/50 flex flex-col justify-between h-32 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <FileText className="w-16 h-16 text-violet-500" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-400">Published Posts</p>
                                    <h3 className="text-4xl font-bold text-white">{posts.length} <span className="text-sm font-normal text-emerald-400 ml-2">+4</span></h3>
                                </div>
                                <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-800/50 flex flex-col justify-between h-32 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <Activity className="w-16 h-16 text-emerald-500" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-400">System Status</p>
                                    <h3 className="text-4xl font-bold text-emerald-400">Healthy</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Recent Activity Mockup */}
                                <div className="glass-card p-6 rounded-2xl bg-slate-800/30 border border-white/5 h-80">
                                    <h4 className="font-bold text-white mb-4">Recent Registrations</h4>
                                    <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                                        Chart Placeholder (Recharts)
                                    </div>
                                </div>
                                <div className="glass-card p-6 rounded-2xl bg-slate-800/30 border border-white/5 h-80">
                                    <h4 className="font-bold text-white mb-4">Traffic Overview</h4>
                                    <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                                        Graph Placeholder
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* CONTENTS TAB */}
                    {activeTab === 'contents' && (
                        <div className="max-w-7xl mx-auto">
                            <div className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-slate-800/30">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-900/50 text-slate-400 uppercase font-bold text-xs border-b border-white/5">
                                            <tr>
                                                <th className="px-6 py-4">ID</th>
                                                <th className="px-6 py-4">Title</th>
                                                <th className="px-6 py-4">Author</th>
                                                <th className="px-6 py-4">Type</th>
                                                <th className="px-6 py-4">Date</th>
                                                <th className="px-6 py-4 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {posts.map((post) => (
                                                <tr key={post.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">#{post.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-white line-clamp-1 max-w-sm">{post.title}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-300">
                                                        {post.profiles?.name || 'Unknown'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-[10px] font-bold border border-white/5 
                                                        ${post.type === 'DATA' ? 'bg-violet-500/20 text-violet-300' :
                                                                post.type === 'STUDY' ? 'bg-fuchsia-500/20 text-fuchsia-300' :
                                                                    'bg-blue-500/20 text-blue-300'}`}>
                                                            {post.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-400 text-xs font-mono">
                                                        {new Date(post.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() => handleDeletePost(post.id)}
                                                            className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                                                            title="Delete Post"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <div className="max-w-7xl mx-auto flex items-center justify-center h-full text-slate-500">
                            <div className="text-center">
                                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-bold text-white">User Management</h3>
                                <p className="text-sm">This module is under development.</p>
                            </div>
                        </div>
                    )}


                    {/* SETTINGS TAB */}
                    {activeTab === 'settings' && (
                        <div className="max-w-7xl mx-auto flex items-center justify-center h-full text-slate-500">
                            <div className="text-center">
                                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-bold text-white">Console Settings</h3>
                                <p className="text-sm">Manage admin preferences here.</p>
                            </div>
                        </div>
                    )}

                </div>
            </main>

        </div>
    )
}
