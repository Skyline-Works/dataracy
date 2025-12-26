import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Heart, MessageSquare, Share2, Bookmark, Eye, Calendar, User } from 'lucide-react';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // In a real app, fetch data based on id
    // This is a dummy static page for layout demonstration
    const dummyPost = {
        title: '이커머스 고객 이탈 예측 및 분석 보고서',
        author: 'DataAnalyst_Kim',
        date: '2024. 12. 21',
        views: 1234,
        likes: 45,
        description: '머신러닝 알고리즘을 활용하여 고객의 행동 패턴을 분석하고, 이탈 위험이 높은 고객군을 식별하여 마케팅 전략을 제안합니다.',
        tags: ['Python', 'Pandas', 'Scikit-learn', 'Tableau'],
        content: `
      <h2>1. 프로젝트 개요</h2>
      <p>본 프로젝트는 이커머스 플랫폼의 고객 행동 데이터를 분석하여 이탈 가능성이 높은 고객을 사전에 예측하고, 이를 방지하기 위한 맞춤형 마케팅 전략을 수립하는 것을 목표로 합니다.</p>
      
      <h2>2. 데이터 수집 및 전처리</h2>
      <p>고객의 구매 이력, 웹사이트 방문 로그, 장바구니 이용 패턴 등 다양한 행동 데이터를 수집하였습니다. 결측치 처리 및 이상치 제거 과정을 거쳐 분석에 적합한 데이터셋을 구축했습니다.</p>
      
      <h2>3. 모델링 및 분석 결과</h2>
      <p>Random Forest와 XGBoost 알고리즘을 비교 분석한 결과, XGBoost 모델이 89%의 정확도로 가장 우수한 성능을 보였습니다. 주요 이탈 요인으로는 '최근 3개월 간 구매 없음', '고객센터 문의 횟수' 등이 식별되었습니다.</p>
      
      <h2>4. 결론 및 제언</h2>
      <p>이탈 위험군 고객에게 할인 쿠폰을 발송하는 A/B 테스트를 진행한 결과, 리텐션 비율이 기존 대비 15% 상승하는 효과를 확인했습니다.</p>
    `
    };

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <Navbar />
            <div style={{ height: '80px' }}></div>

            <div className="container section-padding">

                {/* Top Header Section (Purple Gradient) - Simulating the top image/banner */}
                <div style={{
                    background: 'linear-gradient(135deg, #4A148C 0%, #311B92 100%)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '40px',
                    marginBottom: '40px',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                            {dummyPost.tags.map(tag => (
                                <span key={tag} style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>#{tag}</span>
                            ))}
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.3' }}>{dummyPost.title}</h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{dummyPost.description}</p>
                    </div>
                    {/* Abstract Background Decoration */}
                    <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 300px', gap: '40px' }}>

                    {/* Main Content Column */}
                    <div>
                        {/* Featured Image/Video Placeholder */}
                        <div style={{ width: '100%', height: '400px', borderRadius: 'var(--radius-lg)', background: '#1e1e1e', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                            <span style={{ color: 'var(--text-tertiary)' }}>프로젝트 대표 이미지 / 시연 영상</span>
                        </div>

                        {/* Blog Content */}
                        <div className="blog-content" style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                            <div dangerouslySetInnerHTML={{ __html: dummyPost.content }} />
                        </div>

                        {/* Comments Section */}
                        <div style={{ marginTop: '80px', padding: '40px', background: 'var(--glass-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <MessageSquare size={20} /> 댓글
                            </h3>
                            {/* Dummy Comment Form */}
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}></div>
                                <div style={{ flex: 1 }}>
                                    <textarea rows={3} placeholder="프로젝트에 대한 의견을 남겨주세요." style={{ width: '100%', padding: '16px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', resize: 'vertical' }}></textarea>
                                    <div style={{ textAlign: 'right', marginTop: '8px' }}>
                                        <button className="btn btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>등록</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <aside>
                        {/* Author Profile Card */}
                        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                                {dummyPost.author[0]}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>{dummyPost.author}</h3>
                            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '24px' }}>데이터의 숨겨진 가치를 찾아내는 분석가입니다.</p>

                            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>14</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Projects</div>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>1.2k</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Followers</div>
                                </div>
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }}>Follow</button>
                            <button className="btn btn-secondary" style={{ width: '100%' }}>Message</button>
                        </div>

                        {/* Project Stats */}
                        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px' }}>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '16px', color: 'var(--text-secondary)' }}>Project Stats</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-tertiary)' }}>Views</span>
                                    <span style={{ fontWeight: 'bold' }}>{dummyPost.views.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-tertiary)' }}>Likes</span>
                                    <span style={{ fontWeight: 'bold' }}>{dummyPost.likes.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-tertiary)' }}>Date</span>
                                    <span style={{ fontWeight: 'bold' }}>{dummyPost.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-secondary" style={{ flex: 1, gap: '8px' }}><Heart size={18} /> Like</button>
                            <button className="btn btn-secondary" style={{ flex: 1, gap: '8px' }}><Bookmark size={18} /> Save</button>
                            <button className="btn btn-secondary" style={{ flex: 1, gap: '8px' }}><Share2 size={18} /> Share</button>
                        </div>
                    </aside>

                </div>

                {/* Related Projects Section */}
                <div style={{ marginTop: '100px' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '32px' }}>관련 프로젝트</h3>
                    <div className="project-card-grid">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="project-card">
                                <div className="card-image-wrapper" style={{ height: '180px' }}>
                                    <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${['rgba(112,0,255,0.3)', 'rgba(0,194,255,0.3)', 'rgba(255,0,128,0.3)'][i % 3]}, var(--bg-primary))` }}></div>
                                </div>
                                <div className="card-content">
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>비슷한 기술 스택을 사용한 프로젝트 {i}</h4>
                                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                                        <span>#Python</span> <span>#Analysis</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
