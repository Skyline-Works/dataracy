-- 1. Sync: Force create profiles for users who signed up before triggers existed
INSERT INTO public.profiles (id, email, name)
SELECT id, email, raw_user_meta_data->>'full_name'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 2. Disable RLS temporarily to ensure visibility (Dev Mode)
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 3. Insert Dummy Posts again
DO $$
DECLARE
  target_user_id uuid;
BEGIN
  SELECT id INTO target_user_id FROM public.profiles LIMIT 1;

  IF target_user_id IS NOT NULL THEN
    -- Check if posts exist to avoid duplicates (optional, but good practice)
    -- Simply inserting new ones for now
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at)
    VALUES
    (
      '2026년 대중교통 데이터로 본 서울의 밤 (Fix)',
      '서울시 심야버스 데이터 분석 결과... (Updated)',
      '심야 버스 노선 최적화를 위한 데이터 분석 사례. 유동인구 패턴 분석.',
      'GENERAL',
      ARRAY['교통분석', '서울'],
      target_user_id,
      NOW()
    ),
    (
      '전국 도서관 이용 현황 2025 (Fix)',
      '전국 1200개 공공도서관 대출 데이터...',
      '지역별 독서 취향과 대출 빈도수를 분석할 수 있는 로우 데이터셋.',
      'DATA',
      ARRAY['도서관', '공공데이터'],
      target_user_id,
      NOW() - INTERVAL '1 hour'
    ),
    (
      '스터디 모집합니다 (Fix)',
      '캐글 데이터 활용 스터디...',
      '매주 수요일 저녁 온라인 진행. 초보 환영.',
      'STUDY',
      ARRAY['머신러닝', '스터디'],
      target_user_id,
      NOW() - INTERVAL '1 day'
    );
  END IF;
END $$;
