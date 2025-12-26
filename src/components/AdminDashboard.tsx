'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, FileText, Activity, Database, Settings } from 'lucide-react';
import { deleteUser } from '@/app/admin/actions';

interface AdminDashboardProps {
    users: any[];
    summary: {
        totalUsers: number;
        totalPosts: number;
        activeUsersToday: number;
        totalViews: number;
    }
}

export default function AdminDashboard({ users, summary }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="min-h-screen p-8" style={{ background: 'var(--bg-primary)' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-tertiary)', marginBottom: '8px', fontSize: '0.9rem' }}>
                            <ArrowLeft size={16} /> 메인으로
                        </Link>
                        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>관리자 대시보드</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>사이트의 전반적인 상태를 관리합니다.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div className="bg-glass admin-card" style={{ padding: '16px 24px', borderRadius: 'var(--radius-md)', minWidth: '160px' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>총 회원수</span>
                            <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)' }}>{summary.totalUsers}</span>
                        </div>
                        <div className="bg-glass admin-card" style={{ padding: '16px 24px', borderRadius: 'var(--radius-md)', minWidth: '160px' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>게시물 수</span>
                            <span style={{ fontSize: '1.8rem', fontWeight: '700', color: '#00C2FF' }}>{summary.totalPosts}</span>
                        </div>
                        <div className="bg-glass admin-card" style={{ padding: '16px 24px', borderRadius: 'var(--radius-md)', minWidth: '160px' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>오늘 방문자</span>
                            <span style={{ fontSize: '1.8rem', fontWeight: '700', color: '#10B981' }}>{summary.activeUsersToday}</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '32px' }}>
                    {/* Sidebar */}
                    <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
                        >
                            <Users size={18} /> 회원 관리
                        </button>
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`admin-tab ${activeTab === 'posts' ? 'active' : ''}`}
                        >
                            <FileText size={18} /> 콘텐츠 관리
                        </button>
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`}
                        >
                            <Activity size={18} /> 통계 분석
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
                        >
                            <Settings size={18} /> 사이트 설정
                        </button>
                    </div>

                    {/* Content Area */}
                    <div style={{ flex: 1 }}>
                        {activeTab === 'users' && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>회원 목록</h2>
                                <div className="bg-glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>ID</th>
                                                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>이름</th>
                                                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>이메일</th>
                                                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>권한</th>
                                                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>가입일</th>
                                                <th style={{ padding: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '20px', color: 'var(--text-tertiary)' }}>#{user.id}</td>
                                                    <td style={{ padding: '20px', fontWeight: '500' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>
                                                                {user.name?.[0] || 'U'}
                                                            </div>
                                                            {user.name || '알 수 없음'}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '20px', color: 'var(--text-secondary)' }}>{user.email}</td>
                                                    <td style={{ padding: '20px' }}>
                                                        <span style={{
                                                            padding: '4px 12px',
                                                            borderRadius: '20px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: '600',
                                                            background: user.role === 'ADMIN' ? 'rgba(112, 0, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                                                            color: user.role === 'ADMIN' ? 'var(--secondary)' : 'var(--text-secondary)',
                                                            border: user.role === 'ADMIN' ? '1px solid rgba(112, 0, 255, 0.4)' : '1px solid rgba(255,255,255,0.1)'
                                                        }}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '20px', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                                                        {new Date(user.createdAt).toISOString().split('T')[0]}
                                                    </td>
                                                    <td style={{ padding: '20px' }}>
                                                        <form action={deleteUser}>
                                                            <input type="hidden" name="id" value={user.id} />
                                                            <button className="btn" style={{ padding: '8px', color: 'var(--error)' }} title="삭제">
                                                                X
                                                            </button>
                                                        </form>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {users.length === 0 && (
                                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                                            회원이 없습니다.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'posts' && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>콘텐츠 관리</h2>
                                <div className="bg-glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    <FileText size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                                    <p>게시물 관리 기능이 준비 중입니다.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'stats' && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>통계 분석</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                    <div className="bg-glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <Activity size={32} style={{ marginBottom: '12px' }} />
                                            <p>방문자 트렌드 차트</p>
                                        </div>
                                    </div>
                                    <div className="bg-glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <Database size={32} style={{ marginBottom: '12px' }} />
                                            <p>인기 게시물 순위</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px' }}>사이트 설정</h2>
                                <div className="bg-glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>사이트 이름</label>
                                        <input type="text" defaultValue="Dataracy" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', color: 'white' }} />
                                    </div>
                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>유지보수 모드</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '48px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                                                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
                                            </div>
                                            <span style={{ color: 'var(--text-secondary)' }}>비활성화됨</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary">설정 저장</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .admin-tab {
                    width: 100%;
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    font-size: 1rem;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.2s;
                    border-radius: var(--radius-md);
                }
                .admin-tab:hover {
                    background: rgba(255,255,255,0.05);
                    color: var(--text-primary);
                }
                .admin-tab.active {
                    background: var(--glass-bg);
                    color: var(--primary);
                    border: 1px solid var(--glass-border);
                    font-weight: 600;
                }
                .admin-card {
                    transition: transform 0.2s;
                }
                .admin-card:hover {
                    transform: translateY(-4px);
                }
            `}</style>
        </div>
    );
}
