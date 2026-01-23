'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Pencil, Trash2, Loader2 } from 'lucide-react';

interface PostOwnerActionsProps {
    postId: number;
    authorId: string;
    currentUser: any; // User object from Supabase Auth
}

export default function PostOwnerActions({ postId, authorId, currentUser }: PostOwnerActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // Check permissions
    const isOwner = currentUser?.id === authorId;

    // Ideally check admin role properly, but for now relying on database RLS policy primarily
    // We can also pass 'isAdmin' prop if we fetched profile in parent

    if (!currentUser || !isOwner) {
        return null; // Don't render anything if not authorized
    }

    const handleDelete = async () => {
        const confirmed = confirm('정말로 이 게시물을 삭제하시겠습니까?\n삭제된 내용은 복구할 수 없습니다.');
        if (!confirmed) return;

        setIsDeleting(true);

        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;

            alert('게시물이 삭제되었습니다.');
            router.push('/');
            router.refresh();

        } catch (error: any) {
            console.error('Delete error:', error);
            alert('삭제 중 오류가 발생했습니다: ' + error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Link
                href={`/write?id=${postId}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors border border-white/5"
            >
                <Pencil className="w-4 h-4" />
                수정
            </Link>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-sm font-medium transition-colors"
            >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                삭제
            </button>
        </div>
    );
}
