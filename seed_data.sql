-- Insert Dummy Posts
-- It automatically picks the first user found in 'profiles' table as the author.

DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- 1. Get the first user ID from profiles
  SELECT id INTO target_user_id FROM public.profiles LIMIT 1;

  -- If no user exists, do nothing (or raise notice)
  IF target_user_id IS NULL THEN
    RAISE NOTICE 'No user found in profiles table. Please sign up at least once first.';
    RETURN;
  END IF;

  -- 2. Insert dummy posts linked to that user
  INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at)
  VALUES
  (
    '2026년 대중교통 데이터로 본 서울의 밤, 그리고 올빼미 버스',
    '서울시 심야버스 데이터 분석 결과입니다. 유동인구가 가장 많은 지역은 강남역과 홍대입구였으며, 새벽 2시~3시 사이에 승차 거부가 가장 많이 발생하는 것으로 추정됩니다...',
    '심야 버스 노선 최적화를 위한 데이터 분석 사례. 유동인구 패턴과 실제 승하차 데이터를 결합하여 올빼미 버스의 효율성을 개선할 수 있는 방안을 제시합니다.',
    'GENERAL',
    ARRAY['교통분석', '서울', '시각화'],
    target_user_id,
    NOW()
  ),
  (
    '전국 도서관 이용 현황 2025 (Cleaned Data)',
    '전국 1200개 공공도서관의 대출 데이터를 전처리하여 CSV로 제공합니다. 지역별 선호 도서 장르와 연령대별 이용률이 포함되어 있습니다. 파일 다운로드는 링크를 참고하세요.',
    '지역별 독서 취향과 대출 빈도수를 분석할 수 있는 로우 데이터셋입니다. 결측치 제거 완료.',
    'DATA',
    ARRAY['도서관', '공공데이터', '전처리완료'],
    target_user_id,
    NOW() - INTERVAL '2 hours'
  ),
  (
    '이번 주 ''쇼핑몰 고객 이탈 예측'' 스터디원 충원합니다',
    '안녕하세요. 캐글 데이터를 활용한 이탈 예측 모델링 스터디입니다. 현재 3명 모였고 2분 더 모십니다. 매주 수요일 저녁 8시 디스코드.',
    '2분 모십니다. 매주 수요일 저녁 8시 온라인 진행. 머신러닝 기초 있으신 분 환영합니다.',
    'STUDY',
    ARRAY['머신러닝', '이탈예측', '스터디'],
    target_user_id,
    NOW() - INTERVAL '1 day'
  ),
  (
    '소상공인 상권 분석 패키지 (유동인구 + 매출)',
    '창업 예정자를 위한 필수 데이터 팩입니다. 서울시 주요 골목상권 100곳의 유동인구와 추정 매출액을 매핑했습니다.',
    '창업 입지 분석에 필수적인 유동인구 및 매출 추이 통합 데이터. 엑셀 파일 포함.',
    'DATA',
    ARRAY['상권분석', '소상공인', '부동산'],
    target_user_id,
    NOW() - INTERVAL '3 days'
  ),
  (
    'R vs Python 속도 차이가 실제 업무에서 큰가요?',
    '현재 R을 주로 쓰는데 대용량 데이터 처리할 때 파이썬으로 넘어가야 할지 고민입니다. 현업에 계신 선배님들의 조언 부탁드립니다.',
    '현업에 계신 분들의 의견이 궁금합니다. 대용량 처리 시 실제로 체감되는 차이가 있는지요?',
    'GENERAL',
    ARRAY['질문', '진로', 'R'],
    target_user_id,
    NOW() - INTERVAL '5 days'
  ),
  (
    '이어가기 프로젝트: 제주도 관광객 예측 모델 고도화하실 분',
    '지난 달에 공유했던 제주도 입도객 예측 모델(RMSE 1200)을 더 개선해보고 싶습니다. 시계열 분석 고수님 계신가요?',
    '기존 베이스라인 모델을 바탕으로 파생변수 추가 및 앙상블 적용해보실 팀원을 찾습니다.',
    'CONTINUE',
    ARRAY['시계열', '제주', '팀빌딩'],
    target_user_id,
    NOW() - INTERVAL '1 week'
  );

END $$;
