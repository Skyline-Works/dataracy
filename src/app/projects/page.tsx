import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ProjectsPage() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <Navbar />
            {/* Navigation Padding */}
            <div style={{ height: '80px' }}></div>

            <div className="container section-padding">
                {/* Header */}
                <div style={{ marginBottom: '60px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '12px' }}>프로젝트 라운지</h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>멤버들이 공유한 데이터 분석 포트폴리오를 탐색하세요.</p>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '10px 24px' }}>프로젝트 올리기</button>
                    </div>
                </div>

                {/* Filter Tabs (Placeholder) */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {['전체', 'Python', 'SQL', 'R', 'Tableau', 'Excel'].map((tag, i) => (
                        <button key={i} className={`btn ${i === 0 ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 20px', fontSize: '0.9rem', height: 'auto' }}>
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Project Grid */}
                <div className="project-card-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div key={i} className="project-card">
                            {/* Visual Header */}
                            <div className="card-image-wrapper">
                                <Link href={`/projects/${i}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: `linear-gradient(135deg, ${['rgba(112,0,255,0.3)', 'rgba(0,194,255,0.3)', 'rgba(255,0,128,0.3)'][i % 3]}, var(--bg-primary))`
                                    }}></div>
                                </Link>
                                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600', color: 'white', backdropFilter: 'blur(4px)', pointerEvents: 'none' }}>
                                    {['Python', 'SQL', 'Tableau'][i % 3]}
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="card-content">
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4' }}>
                                    {['2024년 4분기 매출 분석 및 시각화', '유저 코호트 분석을 통한 이탈률 개선', '영화 평점 데이터를 활용한 추천 시스템'][i % 3]}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {[
                                        'Tableau를 사용하여 분기별 매출 추이를 시각화하고, 주요 감소 요인을 분석하여 대시보드로 구성했습니다.',
                                        'SQL을 활용해 유저 행동 로그를 쿼리하고, 코호트 분석을 통해 리텐션이 급감하는 구간을 식별했습니다.',
                                        'Python pandas와 scikit-learn을 이용하여 사용자 기반 협업 필터링 알고리즘을 구현해보았습니다.'
                                    ][i % 3]}
                                </p>

                                {/* Footer Info */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}></div>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)' }}>User{i}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={14} /> {20 + i * 5}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} /> {100 + i * 23}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Placeholder */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '60px' }}>
                    <button className="btn btn-secondary" style={{ width: '40px', height: '40px', padding: 0 }}>1</button>
                    <button className="btn" style={{ width: '40px', height: '40px', padding: 0, background: 'transparent', color: 'var(--text-tertiary)' }}>2</button>
                    <button className="btn" style={{ width: '40px', height: '40px', padding: 0, background: 'transparent', color: 'var(--text-tertiary)' }}>3</button>
                </div>

            </div>
        </div>
    );
}
