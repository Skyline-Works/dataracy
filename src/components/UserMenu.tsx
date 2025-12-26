'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Settings, FileText, CreditCard, LogOut } from 'lucide-react';
import { logout } from '@/app/auth-actions';

interface UserMenuProps {
    name: string | null;
    email: string;
}

export default function UserMenu({ name, email }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div style={{ position: 'relative' }} ref={menuRef}>
            {/* Profile Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '2px solid rgba(255,255,255,0.1)',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'white'
                }}
            >
                {name ? name[0] : <User size={20} />}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="animate-fade-in" style={{
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    width: '240px',
                    background: '#1a1a1a', // Dark background
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    zIndex: 100,
                    backdropFilter: 'blur(10px)'
                }}>
                    {/* User Info Header */}
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '8px' }}>
                        <div style={{ fontWeight: 'bold', color: 'white' }}>{name || 'User'}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</div>
                    </div>

                    {/* Menu Items */}
                    <Link href="/mypage" className="user-menu-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }}>
                        <User size={16} /> 마이페이지
                    </Link>

                    <div style={{ margin: '8px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>

                    {/* Logout in Menu */}
                    <form action={logout}>
                        <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', color: '#ff4d4f', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-md)', textAlign: 'left', fontSize: '1rem' }}>
                            <LogOut size={16} /> 로그아웃
                        </button>
                    </form>
                </div>
            )}
            <style jsx>{`
                .user-menu-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white !important;
                }
            `}</style>
        </div>
    );
}
