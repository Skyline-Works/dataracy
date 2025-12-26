'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, FileText, Settings, CreditCard } from 'lucide-react';

export default function MyPageContent() {
    const [activeTab, setActiveTab] = useState('profile');

    // Dummy data for my posts
    const myPosts = [
        { id: 1, title: '이커머스 고객 이탈 예측 및 분석 보고서', date: '2024. 12. 21', views: 1234, likes: 45 },
        { id: 2, title: '서울시 상권 분석 데이터 시각화', date: '2024. 11. 15', views: 890, likes: 23 },
        { id: 3, title: '딥러닝 기반 이미지 분류 모델 성능 비교', date: '2024. 10. 05', views: 2400, likes: 112 },
    ];

    return (
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'row', alignItems: 'flex-start' }}>

            {/* Sidebar / Tabs */}
            <div style={{
                width: '250px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
            }}>
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`mypage-tab ${activeTab === 'profile' ? 'active' : ''}`}
                >
                    <User size={18} /> 프로필 설정
                </button>
                <button
                    onClick={() => setActiveTab('posts')}
                    className={`mypage-tab ${activeTab === 'posts' ? 'active' : ''}`}
                >
                    <FileText size={18} /> 내 게시물
                </button>
                <button
                    onClick={() => setActiveTab('account')}
                    className={`mypage-tab ${activeTab === 'account' ? 'active' : ''}`}
                >
                    <CreditCard size={18} /> 계정 관리
                </button>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1 }}>

                {/* PROFILE SETTINGS TAB */}
                {activeTab === 'profile' && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>프로필 설정</h2>
                        <div style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '32px'
                        }}>
                            {/* Profile Image */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}>
                                    U
                                </div>
                                <div>
                                    <button className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>이미지 변경</button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>이름</label>
                                    <input type="text" defaultValue="User" style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-primary)',
                                        outline: 'none'
                                    }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>이메일</label>
                                    <input type="email" defaultValue="user@example.com" disabled style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-tertiary)',
                                        outline: 'none',
                                        cursor: 'not-allowed'
                                    }} />
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>이메일은 변경할 수 없습니다.</p>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>한 줄 소개</label>
                                    <textarea rows={3} style={{
                                        width: '100%',
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-primary)',
                                        outline: 'none',
                                        resize: 'none'
                                    }} placeholder="자기소개를 입력해주세요."></textarea>
                                </div>

                                <button className="btn btn-primary" style={{ marginTop: '16px', width: 'fit-content' }}>저장하기</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* MY POSTS TAB */}
                {activeTab === 'posts' && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>내 게시물</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {myPosts.map(post => (
                                <div key={post.id} style={{
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '24px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                    className="post-item-hover"
                                >
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>{post.title}</h3>
                                        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                                            <span>{post.date}</span>
                                            <span>조회 {post.views}</span>
                                            <span>좋아요 {post.likes}</span>
                                        </div>
                                    </div>
                                    <Link href={`/projects/${post.id}`} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                        보기
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ACCOUNT TAB */}
                {activeTab === 'account' && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>계정 관리</h2>
                        <div style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '32px'
                        }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>비밀번호 변경</h3>
                            <button className="btn btn-secondary">비밀번호 재설정 메일 보내기</button>

                            <div style={{ margin: '32px 0', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#ff4d4f' }}>회원 탈퇴</h3>
                            <p style={{ color: 'var(--text-tertiary)', marginBottom: '16px' }}>탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.</p>
                            <button style={{
                                padding: '10px 20px',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid #ff4d4f',
                                color: '#ff4d4f',
                                background: 'rgba(255, 77, 79, 0.1)',
                                cursor: 'pointer'
                            }}>회원 탈퇴</button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .mypage-tab {
                    width: 100%;
                    padding: 16px 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    font-size: 1rem;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.2s;
                    border-left: 3px solid transparent;
                }
                .mypage-tab:hover {
                    background: rgba(255,255,255,0.03);
                    color: var(--text-primary);
                }
                .mypage-tab.active {
                    background: rgba(255,255,255,0.05);
                    color: var(--primary);
                    border-left-color: var(--primary);
                }
                .post-item-hover:hover {
                    border-color: var(--primary) !important;
                    transform: translateX(4px);
                }
            `}</style>
        </div>
    );
}
