import { ArrowRight, BarChart2, MessageSquare, Users, Sparkles, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="section-padding flex-center" style={{ minHeight: '100vh', paddingTop: '160px', position: 'relative', overflow: 'hidden' }}>

        {/* Background Elements */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(150px)', opacity: '0.15', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: 'var(--secondary)', filter: 'blur(150px)', opacity: '0.15', borderRadius: '50%' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="animate-fade-in">
            <div className="bg-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: 'var(--radius-full)', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Sparkles size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>New: AI 기반 코드 리뷰 기능</span>
            </div>

            <h1 className="hero-title-mobile" style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '24px', letterSpacing: '-1px' }}>
              데이터 분석가들이 <br />
              <span className="text-gradient">함께 성장하는 공간</span>
            </h1>

            <p className="hero-text-mobile" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: '1.6', wordBreak: 'keep-all' }}>
              국내 최고의 데이터 전문가 커뮤니티에 참여하세요. SQL, Python, R 코드를 공유하고 피드백을 받으며 커리어를 레벨업할 수 있습니다.
            </p>

            <div className="flex-center flex-col-mobile items-center-mobile" style={{ gap: '16px' }}>
              <Link href="/projects" className="btn btn-primary btn-mobile-adjust" style={{ height: '56px', padding: '0 32px', fontSize: '1.1rem' }}>
                시작하기 <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </Link>
              <Link href="#" className="btn btn-secondary btn-mobile-adjust" style={{ height: '56px', padding: '0 32px', fontSize: '1.1rem' }}>
                데모 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="grid-mobile-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            {[
              { val: '10K+', label: '활동 분석가' },
              { val: '50K+', label: '코드 리뷰' },
              { val: '100+', label: '참여 기업' },
              { val: '4.9/5', label: '사용자 평점' }
            ].map((stat, i) => (
              <div key={i} style={{ background: 'var(--bg-primary)', padding: '40px 24px', textAlign: 'center' }}>
                <div className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
                  {stat.val}
                </div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '1px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Projects Section (Figma Style Grid) */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title-mobile" style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '16px' }}>인기 프로젝트</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              멤버들이 진행한 데이터 분석 프로젝트를 확인해보세요.
            </p>
          </div>

          <div className="project-card-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProjectCard key={i} i={i} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button className="btn btn-secondary" style={{ padding: '12px 32px' }}>
              프로젝트 더보기
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="section-title-mobile" style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '16px' }}>왜 Dataracy인가요?</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>단순한 포럼 그 이상, 당신의 커리어 액셀러레이터입니다.</p>
          </div>

          <div className="grid-mobile-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: <MessageSquare size={32} color="var(--primary)" />, title: '동료 코드 리뷰', desc: '현직 시니어 분석가들로부터 내 분석 코드에 대한 상세한 피드백을 받아보세요.' },
              { icon: <Users size={32} color="var(--secondary)" />, title: '멘토링 서클', desc: 'A/B 테스트, 머신러닝 등 특정 스킬을 깊이 있게 배우는 소규모 그룹에 참여하세요.' },
              { icon: <BarChart2 size={32} color="var(--accent-pink)" />, title: '포트폴리오 빌더', desc: '데이터 직군에 최적화된 멋진 포트폴리오로 당신의 역량을 증명하세요.' }
            ].map((feature, i) => (
              <div key={i} className="bg-glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', transition: 'var(--transition-smooth)' }}>
                <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.05)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-tertiary)', lineHeight: '1.6', wordBreak: 'keep-all' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
        <div className="container">
          <p>Copyright © 2025 Dataracy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
