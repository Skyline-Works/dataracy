'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye, ArrowRight, MessageSquare } from 'lucide-react';

export default function ProjectCard({ i }: { i: number }) {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="project-card">
            {/* Visual Header */}
            <div className="card-image-wrapper">
                <Link href={`/projects/${i}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: `url('/images/project-thumb-${(i % 3) + 1}.png') no-repeat center/cover`
                    }}></div>
                </Link>
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600', color: 'white', backdropFilter: 'blur(4px)', pointerEvents: 'none' }}>
                    Python
                </div>
            </div>

            {/* Content Body */}
            <div className="card-content">
                <Link href={`/projects/${i}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4', cursor: 'pointer' }}>
                        이커머스 고객 이탈 예측 및 분석 보고서 Vol.{i}
                    </h3>
                </Link>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    머신러닝 알고리즘을 활용하여 고객의 행동 패턴을 분석하고, 이탈 위험이 높은 고객군을 식별하여 마케팅 전략을 제안합니다.
                </p>

                {/* Footer Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}></div>
                        <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)' }}>User{i}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={14} /> 24</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} /> 1.2k</span>
                    </div>
                </div>

                {/* Continue Action */}
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '10px', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', gap: '8px' }}
                >
                    이어가기 <ArrowRight size={16} />
                </button>

                {/* Expanded Comments */}
                {showComments && (
                    <div className="animate-fade-in" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MessageSquare size={14} /> 최근 댓글
                        </div>

                        {/* Comment 1 */}
                        <div style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#555' }}></div>
                                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>AnalysisMaster</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>2시간 전</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', paddingLeft: '28px' }}>XGBoost 모델 튜닝 파라미터 공유 가능하신가요? 결과가 인상적이네요.</p>
                        </div>

                        {/* Comment 2 */}
                        <div style={{ fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#777' }}></div>
                                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Newbie_Dev</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>5시간 전</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', paddingLeft: '28px' }}>데이터 전처리 과정에서 결측치는 어떻게 처리하셨나요?</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
