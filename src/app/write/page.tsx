'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { Loader2, ArrowLeft, Image as ImageIcon, Hash, PenLine, Paperclip, X } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function WritePage() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('GENERAL')
    const [tags, setTags] = useState('')

    // File States
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [attachedFile, setAttachedFile] = useState<File | null>(null)

    const [loading, setLoading] = useState(false)

    const imageInputRef = useRef<HTMLInputElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const router = useRouter()
    const supabase = createClient()

    // Handle Image Selection
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    // Handle File Selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachedFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            alert("로그인이 필요합니다.")
            router.push('/login')
            return
        }

        let imageUrl = null
        let fileUrl = null

        try {
            // 1. Upload Image if exists
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop()
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
                const { error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(fileName, imageFile)

                if (uploadError) throw uploadError

                // Get Public URL
                const { data: publicUrlData } = supabase.storage
                    .from('images')
                    .getPublicUrl(fileName)

                imageUrl = publicUrlData.publicUrl
            }

            // 2. Upload Attached File if exists
            if (attachedFile) {
                const fileName = `${Date.now()}-${attachedFile.name}`
                const { error: uploadError } = await supabase.storage
                    .from('files')
                    .upload(fileName, attachedFile)

                if (uploadError) throw uploadError

                const { data: publicUrlData } = supabase.storage
                    .from('files')
                    .getPublicUrl(fileName)

                fileUrl = publicUrlData.publicUrl
            }

            // 3. Insert Post
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(t => t.length > 0)
            const excerpt = content.slice(0, 150) + (content.length > 150 ? '...' : '')

            const { error } = await supabase.from('posts').insert({
                title,
                content,
                type,
                tags: tagArray,
                excerpt,
                author_id: user.id,
                image_url: imageUrl,
                file_url: fileUrl
            })

            if (error) throw error

            alert("게시글이 등록되었습니다!")
            router.push('/')
            router.refresh()

        } catch (error: any) {
            console.error(error)
            alert("업로드 중 오류가 발생했습니다: " + error.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">
            <Navbar />

            <div className="flex-1 container mx-auto px-6 py-32 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" /> 메인으로 돌아가기
                </Link>

                <div className="glass-card p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                    <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <PenLine className="w-8 h-8 text-blue-400" />
                        새 글 작성하기
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400">제목</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-6 text-lg font-medium text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                                required
                            />
                        </div>

                        {/* Category & Tags Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">카테고리</label>
                                <div className="relative">
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 appearance-none"
                                    >
                                        <option value="GENERAL">일반 / 인사이트</option>
                                        <option value="STUDY">스터디 모집</option>
                                        <option value="CONTINUE">이어가기 프로젝트</option>
                                        <option value="DATA">데이터 공유</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">태그 (쉼표로 구분)</label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        placeholder="파이썬, 시각화, 서울시"
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">대표 이미지 (썸네일)</label>
                                <div
                                    onClick={() => imageInputRef.current?.click()}
                                    className={`w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden relative ${imagePreview ? 'border-blue-500/50' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                                >
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <p className="text-white text-xs font-bold">이미지 변경</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon className="w-6 h-6 text-slate-500 mb-2" />
                                            <span className="text-xs text-slate-500">클릭하여 이미지 업로드</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        ref={imageInputRef}
                                        onChange={handleImageSelect}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* File Attachment */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">첨부 파일 (데이터셋, 코드 등)</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-32 border-2 border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors"
                                >
                                    {attachedFile ? (
                                        <div className="text-center px-4">
                                            <Paperclip className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                            <span className="text-sm text-white font-medium break-all line-clamp-1">{attachedFile.name}</span>
                                            <span className="text-xs text-slate-500 block mt-1">{(attachedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setAttachedFile(null); }}
                                                className="text-xs text-red-400 hover:text-red-300 mt-2 font-bold"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Paperclip className="w-6 h-6 text-slate-500 mb-2" />
                                            <span className="text-xs text-slate-500">클릭하여 파일 첨부</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Editor Area */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400">내용</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="당신의 인사이트를 자유롭게 펼쳐보세요. 마크다운 문법을 지원합니다."
                                className="w-full h-96 bg-slate-900/50 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600 resize-none leading-relaxed"
                                required
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors font-bold text-sm"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 text-sm flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : '글 게시하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
