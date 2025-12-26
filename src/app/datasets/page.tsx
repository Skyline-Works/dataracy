import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Database, Download, FileText, Search, Upload, Filter, MoreVertical, HardDrive } from 'lucide-react';

export default function DatasetsPage() {
    const dummyDatasets = [
        { id: 1, title: '서울시 상권 분석 데이터 2024', description: '서울시내 25개 자치구별 상권 유동인구 및 매출 데이터입니다.', format: 'CSV', size: '2.4 GB', downloads: 1250, uploader: 'PublicData', date: '2024.12.01' },
        { id: 2, title: '이커머스 고객 행동 로그', description: '온라인 쇼핑몰 유저의 클릭, 장바구니, 구매 전환 로그 데이터셋 (비식별화 완료)', format: 'JSON', size: '540 MB', downloads: 890, uploader: 'ShoppingLab', date: '2024.11.28' },
        { id: 3, title: '한국 부동산 실거래가 추이', description: '국토교통부 제공 아파트 매매 실거래가 API 수집본 (2015-2024)', format: 'XLSX', size: '120 MB', downloads: 3400, uploader: 'RealEstate_Insights', date: '2024.12.15' },
        { id: 4, title: '글로벌 주식 시장 틱 데이터', description: '주요 50개국 증시 1분 단위 틱 데이터 (KOSPI, NASDAQ, etc)', format: 'PARQUET', size: '15 GB', downloads: 120, uploader: 'QuantMaster', date: '2024.10.10' },
        { id: 5, title: '영화 리뷰 감성 분석 코퍼스', description: '네이버 영화 및 왓챠피디아 리뷰 텍스트와 감성 레이블링 데이터', format: 'TXT', size: '45 MB', downloads: 4400, uploader: 'NLP_Study', date: '2024.11.05' },
    ];

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <Navbar />
            <div style={{ height: '80px' }}></div>

            <div className="container section-padding">

                {/* Header Area */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Database size={36} color="var(--secondary)" />
                            데이터셋 라이브러리
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
                            연구와 분석에 필요한 고품질 데이터셋을 탐색하고, 내가 가진 데이터를 커뮤니티에 공유해보세요.
                        </p>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload size={18} /> 데이터셋 공유하기
                    </button>
                </div>

                {/* Search & Statistics Bar */}
                <div className="bg-glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '40px', display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                        <input type="text" placeholder="관심있는 데이터 토픽을 검색해보세요 (예: 금융, 의료, 자연어처리)" style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '32px', paddingLeft: '32px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>총 데이터셋</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>1,240</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>이번 주 다운로드</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>45.2k</div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    {['전체', '금융/경제', '공공데이터', '헬스케어', '소셜미디어', '이미지/비전'].map((tag, i) => (
                        <button key={i} className={`btn ${i === 0 ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '8px 20px', fontSize: '0.9rem', height: 'auto' }}>
                            {tag}
                        </button>
                    ))}
                    <button className="btn btn-secondary" style={{ marginLeft: 'auto', gap: '8px' }}><Filter size={16} /> 필터</button>
                </div>

                {/* Datasets List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {dummyDatasets.map((data) => (
                        <div key={data.id} className="bg-glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '24px', transition: 'var(--transition-smooth)' }}>
                            {/* Icon Box */}
                            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <FileText size={24} color="var(--text-secondary)" />
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', marginTop: '4px', color: 'var(--text-tertiary)' }}>{data.format}</span>
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{data.title}</h3>
                                    <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(112, 0, 255, 0.2)', color: 'var(--primary--light)' }}>Updated {data.date}</span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '12px' }}>{data.description}</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ccc' }}></div>
                                        {data.uploader}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <HardDrive size={14} /> {data.size}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Download size={14} /> {data.downloads.toLocaleString()} downloads
                                    </div>
                                </div>
                            </div>

                            {/* Action */}
                            <div>
                                <button className="btn btn-secondary" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Download size={18} /> 다운로드
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination (Reused style) */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '60px' }}>
                    <button className="btn btn-secondary" style={{ width: '40px', height: '40px', padding: 0 }}>1</button>
                    <button className="btn" style={{ width: '40px', height: '40px', padding: 0, background: 'transparent', color: 'var(--text-tertiary)' }}>2</button>
                    <button className="btn" style={{ width: '40px', height: '40px', padding: 0, background: 'transparent', color: 'var(--text-tertiary)' }}>3</button>
                </div>

            </div>
        </div>
    );
}
