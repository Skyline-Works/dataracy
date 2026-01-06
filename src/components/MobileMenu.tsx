'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BarChart2 } from 'lucide-react';

interface MobileMenuProps {
    user: {
        name: string;
        email: string;
    } | null;
}

export default function MobileMenu({ user }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="btn-secondary"
                style={{
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px'
                }}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay Menu */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: '80px', // Below navbar
                    left: 0,
                    width: '100%',
                    height: 'calc(100vh - 80px)',
                    background: 'var(--bg-primary)',
                    zIndex: 49,
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    borderTop: '1px solid var(--glass-border)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Link
                            href="/projects"
                            onClick={toggleMenu}
                            style={{ fontSize: '1.2rem', color: 'var(--text-primary)', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            프로젝트
                        </Link>
                        <Link
                            href="/datasets"
                            onClick={toggleMenu}
                            style={{ fontSize: '1.2rem', color: 'var(--text-primary)', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            데이터셋
                        </Link>
                        <Link
                            href="#"
                            onClick={toggleMenu}
                            style={{ fontSize: '1.2rem', color: 'var(--text-primary)', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            요금 안내
                        </Link>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {user ? (
                            <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '4px', fontSize: '0.9rem' }}>Signed in as</p>
                                <p style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{user.name}</p>
                                {/* Logout logic would typically go here or link to profile */}
                                <Link href="/mypage" onClick={toggleMenu} className="btn btn-secondary" style={{ width: '100%', marginTop: '12px' }}>
                                    마이페이지
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" onClick={toggleMenu} className="btn btn-secondary" style={{ width: '100%', padding: '14px' }}>
                                    로그인
                                </Link>
                                <Link href="/signup" onClick={toggleMenu} className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                                    회원가입
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
