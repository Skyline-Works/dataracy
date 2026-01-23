'use client'

import { Download, Share2, Copy, MessageCircle, Instagram } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface PostActionsProps {
    post: any // Using any for simplicity in rapid dev, ideally typed
}

export default function PostActions({ post }: PostActionsProps) {
    const [downloading, setDownloading] = useState(false)
    const [copied, setCopied] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const handleDownload = async () => {
        if (!post.file_url) return;
        setDownloading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('다운로드는 로그인 후 가능합니다.');
                router.push('/login');
                return;
            }

            // Check Membership Status (Fetch fresh profile data)
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('membership_tier, monthly_download_limit, downloads_used_this_month')
                .eq('id', user.id)
                .single();

            if (error) throw error;

            // Check Limit
            if (profile.downloads_used_this_month >= profile.monthly_download_limit) {
                const confirmUpgrade = confirm(
                    `월간 다운로드 한도(${profile.monthly_download_limit}회)를 초과했습니다.\n\n` +
                    `Premium 멤버십(월 9,900원)으로 업그레이드하시겠습니까?\n(Premium 회원은 월 10회 다운로드 가능)`
                );
                if (confirmUpgrade) {
                    // Redirect to upgrade page (Mock)
                    alert("멤버십 결제 페이지로 이동합니다. (현재 준비 중)");
                }
                return;
            }

            // Increment Download Count
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ downloads_used_this_month: profile.downloads_used_this_month + 1 })
                .eq('id', user.id);

            if (updateError) throw updateError;

            // Trigger Download
            window.open(post.file_url, '_blank');
            alert(`다운로드가 시작됩니다. (남은 횟수: ${profile.monthly_download_limit - (profile.downloads_used_this_month + 1)}회)`);

        } catch (error: any) {
            console.error("Download Error:", error);
            alert("다운로드 중 오류가 발생했습니다.");
        } finally {
            setDownloading(false);
        }
    }

    const handleShare = async (platform: string) => {
        const url = window.location.href;

        if (platform === 'copy') {
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                alert("링크가 클립보드에 복사되었습니다!");
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        } else if (platform === 'kakao') {
            // Mock Kakao Share
            alert("카카오톡으로 공유하기 창을 띄웁니다. (API 키 설정 필요)");
        } else if (platform === 'instagram') {
            alert("인스타그램은 직접 링크 공유를 지원하지 않습니다.\n링크를 복사하여 스토리에 공유하세요!");
            handleShare('copy');
        }
    }

    return (
        <div className="space-y-6">
            {/* Download Section */}
            {post.file_url && (
                <div className="glass-card p-6 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/5">
                    <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                                <Download className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">데이터셋 다운로드</h4>
                                <p className="text-sm text-slate-400">일반 회원 월 1회 / Premium 월 10회</p>
                            </div>
                        </div>
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                        >
                            {downloading ? '확인 중...' : '다운로드 받기'}
                            {!downloading && <Download className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}

            {/* Share Section */}
            <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors text-sm font-medium">
                        <Share2 className="w-4 h-4" /> 공유하기
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => handleShare('kakao')} className="w-10 h-10 rounded-full bg-[#FAE100] flex items-center justify-center text-[#371D1E] hover:scale-105 transition-transform shadow-lg" title="카카오톡 공유">
                        <MessageCircle className="w-5 h-5 fill-current" />
                    </button>
                    <button onClick={() => handleShare('instagram')} className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg" title="인스타그램 공유">
                        <Instagram className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleShare('copy')} className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600 transition-colors shadow-lg" title="링크 복사">
                        {copied ? <Copy className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    )
}
