'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User, Github } from 'lucide-react';
import { signup } from '../auth-actions';

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(signup, null);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', position: 'relative', overflow: 'hidden', padding: '16px' }}>
            {/* Background Ambience */}
            <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'var(--bg-primary)', zIndex: -1 }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'var(--primary)', filter: 'blur(200px)', opacity: '0.1' }}></div>
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--secondary)', filter: 'blur(200px)', opacity: '0.1' }}></div>

            <div className="bg-glass animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '40px', borderRadius: 'var(--radius-lg)' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-tertiary)', marginBottom: '32px', fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} /> 메인으로 돌아가기
                </Link>

                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>Dataracy 멤버가 되세요 🚀</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>함께 성장하는 데이터 전문가들의 커뮤니티입니다.</p>
                </div>

                <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '8px', color: 'var(--text-secondary)' }}>이름</label>
                        <div style={{ position: 'relative' }}>
                            <User size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                            <input
                                name="name"
                                type="text"
                                placeholder="홍길동"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px 12px 48px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'var(--transition-fast)'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '8px', color: 'var(--text-secondary)' }}>이메일</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                            <input
                                name="email"
                                type="email"
                                placeholder="analyst@example.com"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px 12px 48px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'var(--transition-fast)'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '8px', color: 'var(--text-secondary)' }}>비밀번호</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px 12px 48px',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'var(--transition-fast)'
                                }}
                            />
                        </div>
                    </div>

                    {state?.error && (
                        <div style={{ color: '#ff4d4f', fontSize: '0.9rem', textAlign: 'center' }}>
                            {state.error}
                        </div>
                    )}

                    <button disabled={isPending} className="btn btn-primary" style={{ width: '100%', height: '56px', fontSize: '1rem', marginTop: '8px', opacity: isPending ? 0.7 : 1 }}>
                        {isPending ? '가입 중...' : '가입하기'}
                    </button>
                </form>

                <div style={{ margin: '24px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>

                <button className="btn btn-secondary" style={{ width: '100%', height: '56px', fontSize: '1rem', display: 'flex', gap: '12px' }}>
                    <Github size={20} /> GitHub으로 가입하기
                </button>

                <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    이미 계정이 있으신가요? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>로그인</Link>
                </p>
            </div>
        </div>
    );
}
