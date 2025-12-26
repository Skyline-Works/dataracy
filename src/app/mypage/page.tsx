import Navbar from '@/components/Navbar';
import MyPageContent from '@/components/MyPageContent';

export default function MyPage() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
            <Navbar />

            {/* Navigation Padding */}
            <div style={{ height: '80px' }}></div>

            <div className="container section-padding">
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '40px', color: 'var(--text-primary)' }}>마이페이지</h1>
                <MyPageContent />
            </div>
        </div>
    );
}
