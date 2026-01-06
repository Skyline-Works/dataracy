import Link from 'next/link';
import { BarChart2 } from 'lucide-react';
import { cookies } from 'next/headers';
import { logout } from '@/app/auth-actions';
import { prisma } from '@/lib/prisma';
import UserMenu from './UserMenu';

import MobileMenu from './MobileMenu';

export default async function Navbar() {
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get('userId')?.value;
    let user = null;

    if (userIdCookie) {
        user = await prisma.user.findUnique({
            where: { id: parseInt(userIdCookie) }
        });
    }

    return (
        <nav className="fixed top-0 w-full z-50 bg-glass" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: 'var(--primary)', borderRadius: '8px', display: 'flex' }}>
                        <BarChart2 size={24} color="#fff" />
                    </div>
                    <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px', textDecoration: 'none', color: 'var(--text-primary)' }}>Dataracy</Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden-mobile" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <Link href="/projects" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>프로젝트</Link>
                    <Link href="/datasets" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>데이터셋</Link>
                    <Link href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>요금 안내</Link>
                </div>

                <div className="hidden-mobile" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {user ? (
                        <UserMenu name={user.name} email={user.email} />
                    ) : (
                        <>
                            <Link href="/login" className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>로그인</Link>
                            <Link href="/signup" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>회원가입</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <MobileMenu user={user ? { name: user.name || 'User', email: user.email } : null} />
            </div>
        </nav>
    );
}
