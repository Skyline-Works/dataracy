'use client'

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Loader2, UploadCloud, X, FileText, Database, Users, TrendingUp, PenLine } from 'lucide-react';

export default function WritePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('STUDY'); // Default type for normal users
    const [tags, setTags] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
    const [isAdmin, setIsAdmin] = useState(false); // Check admin status

    const fileInputRef = useRef<HTMLInputElement>(null);
    const attachmentInputRef = useRef<HTMLInputElement>(null);

    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const editPostId = searchParams.get('id');

    useEffect(() => {
        // Fetch post data if in edit mode
        const loadPostData = async () => {
            if (!editPostId) return;

            const { data: post, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', editPostId)
                .single();

            if (error) {
                console.error("Error loading post:", error);
                alert("게시글을 불러오지 못했습니다.");
                router.push('/');
                return;
            }

            if (post) {
                setTitle(post.title);
                setContent(post.content);
                setType(post.type);
                setTags(post.tags ? post.tags.join(', ') : '');
                if (post.image_url) setImagePreview(post.image_url);
            }
        };

        loadPostData();
    }, [editPostId, supabase, router]);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            // Check Admin Role
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
            if (profile?.role === 'ADMIN') {
                setIsAdmin(true);
                setType('DATA'); // Admins might prefer DATA default
            }
        };
        checkUser();
    }, [router, supabase]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };

    const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAttachmentFile(file);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        setIsSubmitting(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('로그인이 필요합니다.');

            // 1. Upload Image (if any)
            let imageUrl = null;
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
                const { error: uploadError, data } = await supabase.storage
                    .from('images')
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
                imageUrl = publicUrl;
            }

            // 2. Upload Attachment (if any)
            let fileUrl = null;
            if (attachmentFile) {
                const fileExt = attachmentFile.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('files')
                    .upload(fileName, attachmentFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage.from('files').getPublicUrl(fileName);
                fileUrl = publicUrl;
            }

            // 3. Insert or Update Post
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

            const postData = {
                title,
                content,
                type,
                tags: tagArray,
                ...(imageUrl && { image_url: imageUrl }), // Only update if new image
                ...(fileUrl && { file_url: fileUrl }), // Only update if new file
            };

            let error;

            if (editPostId) {
                // UPDATE
                const { error: updateError } = await supabase
                    .from('posts')
                    .update(postData)
                    .eq('id', editPostId)
                    .eq('author_id', user.id); // Security: ensure owernship (though RLS should handle too)
                error = updateError;
            } else {
                // INSERT
                const { error: insertError } = await supabase
                    .from('posts')
                    .insert({
                        ...postData,
                        author_id: user.id
                    });
                error = insertError;
            }

            if (error) throw error;

            router.push('/');
            router.refresh();

        } catch (error: any) {
            console.error(error);
            alert('글 작성 중 오류가 발생했습니다: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">
            <Navbar />

            <div className="flex-1 container mx-auto px-6 py-32 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" /> 메인으로 돌아가기
                </Link>

                <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl">
                    <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <PenLine className="w-6 h-6 text-blue-400" />
                        {editPostId ? '콘텐츠 수정' : '새 콘텐츠 작성'}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Category Selection */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Only Admin can see DATA option */}
                            {isAdmin && (
                                <label className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${type === 'DATA' ? 'bg-violet-600 border-violet-500 text-white shadow-lg' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800'}`}>
                                    <input type="radio" name="type" value="DATA" checked={type === 'DATA'} onChange={(e) => setType(e.target.value)} className="hidden" />
                                    <Database className="w-6 h-6" />
                                    <span className="text-sm font-bold">공공 데이터</span>
                                </label>
                            )}

                            <label className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${type === 'STUDY' ? 'bg-fuchsia-600 border-fuchsia-500 text-white shadow-lg' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800'}`}>
                                <input type="radio" name="type" value="STUDY" checked={type === 'STUDY'} onChange={(e) => setType(e.target.value)} className="hidden" />
                                <Users className="w-6 h-6" />
                                <span className="text-sm font-bold">스터디 모집</span>
                            </label>

                            <label className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${type === 'CONTINUE' ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800'}`}>
                                <input type="radio" name="type" value="CONTINUE" checked={type === 'CONTINUE'} onChange={(e) => setType(e.target.value)} className="hidden" />
                                <TrendingUp className="w-6 h-6" />
                                <span className="text-sm font-bold">인사이트 계속</span>
                            </label>

                            <label className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${type === 'GENERAL' ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800'}`}>
                                <input type="radio" name="type" value="GENERAL" checked={type === 'GENERAL'} onChange={(e) => setType(e.target.value)} className="hidden" />
                                <FileText className="w-6 h-6" />
                                <span className="text-sm font-bold">자유주제</span>
                            </label>
                        </div>
                        {!isAdmin && (
                            <p className="text-xs text-slate-500 text-center">* 공공 데이터 업로드는 검증된 데이터러시 제공자(관리자)만 가능합니다.</p>
                        )}

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-300">대표 이미지 (Cover)</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-48 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 hover:bg-white/5 transition-all overflow-hidden relative group"
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white font-bold">이미지 변경하기</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-3 group-hover:scale-110 transition-transform">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm text-slate-400">클릭하여 이미지를 업로드하세요</p>
                                        <p className="text-xs text-slate-600 mt-1">JPG, PNG, GIF (Max 5MB)</p>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        {/* Attachment Upload (Only for DATA type or everyone?) - Let's allow for all but emphasize for DATA */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-300">첨부 파일 (데이터셋, 자료 등)</label>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => attachmentInputRef.current?.click()}
                                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors flex items-center gap-2 border border-white/5"
                                >
                                    <UploadCloud className="w-4 h-4" />
                                    {attachmentFile ? '파일 변경' : '파일 선택'}
                                </button>
                                {attachmentFile && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-sm">
                                        <span className="truncate max-w-[200px]">{attachmentFile.name}</span>
                                        <button type="button" onClick={() => setAttachmentFile(null)} className="hover:text-white"><X className="w-3 h-3" /></button>
                                    </div>
                                )}
                                <input
                                    ref={attachmentInputRef}
                                    type="file"
                                    className="hidden"
                                    onChange={handleAttachmentChange}
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-300">제목</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="콘텐츠의 제목을 입력하세요"
                            />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-300">태그 (쉼표로 구분)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="예: #교통, #서울시, #데이터분석"
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-300">내용</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-80 bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none leading-relaxed"
                                placeholder="자유롭게 내용을 작성해주세요. (마크다운 지원 예정)"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        등록 중...
                                    </>
                                ) : (
                                    editPostId ? '수정하기' : '발행하기'
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
