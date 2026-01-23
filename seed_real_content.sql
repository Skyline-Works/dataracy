-- Insert 10 High-Quality Dummy Posts
-- Run this in Supabase SQL Editor

DO $$
DECLARE
  target_user_id uuid;
BEGIN
  SELECT id INTO target_user_id FROM public.profiles LIMIT 1;

  IF target_user_id IS NOT NULL THEN
    
    -- 1. 서울 심야버스
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '데이터로 다시 보는 서울의 밤: 올빼미 버스 최적화 분석',
      '## 1. 서론: 서울의 밤은 잠들지 않는다\n서울은 전 세계에서 가장 역동적인 밤 문화를 가진 도시 중 하나입니다. 하지만 지하철이 끊긴 새벽 1시, 귀가 전쟁은 시작됩니다. 우리는 2025년 서울시 유동인구 데이터와 택시 승차 거부 데이터를 교차 분석하여, 올빼미 버스(N버스) 노선이 과연 효율적으로 운영되고 있는지 파헤쳐 보았습니다.\n\n## 2. 데이터 수집 및 전처리\n- **서울시 공공데이터 포털**: 심야 시간대(00:00~04:00) 유동인구 데이터\n- **카카오 모빌리티 리포트**: 택시 호출 실패율이 높은 지역 히트맵\n\n분석 결과, 강남역-신논현역 구간은 여전히 "교통의 블랙홀"이었습니다. 흥미로운 점은 홍대입구보다 "합정역" 인근의 택시 매칭 실패율이 1.5배 높다는 것입니다. 이는 N62번 버스의 배차 간격 조정이 시급함을 시사합니다.\n\n## 3. 결론 및 제언\n단순히 노선을 늘리는 것이 능사가 아닙니다. 요일별 유동인구 패턴(불금 vs 평일)에 따라 가변적인 배차 시스템을 도입해야 합니다. 데이터는 거짓말을 하지 않습니다. 이제 행정이 응답할 차례입니다.',
      '서울시 심야 유동인구와 택시 승차 실패율을 분석하여 N버스 노선의 사각지대를 찾아냈습니다. 합정역과 강남역의 숨겨진 데이터 패턴을 공개합니다.',
      'GENERAL',
      ARRAY['데이터분석', '서울', '교통', 'GIS'],
      target_user_id,
      NOW()
    );

    -- 2. 파이썬 판다스 팁
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '실무에서 바로 쓰는 Pandas 트릭 5선 (메모리 최적화 필수)',
      '데이터 분석가라면 하루 종일 붙잡고 있는 라이브러리, Pandas. 하지만 1GB가 넘는 CSV를 로드하다가 "Memory Error"를 만난 적이 있나요?\n\n### 1. dtype 지정의 마법\n대부분의 범주형 컬럼은 `object` 대신 `category` 타입으로 바꾸는 것만으로도 메모리 사용량을 90%까지 줄일 수 있습니다.\n\n```python\n# Before\ndf["grade"] = df["grade"].astype("object")\n\n# After\ndf["grade"] = df["grade"].astype("category")\n```\n\n### 2. `read_csv`에서 필요한 컬럼만 불러오기\n`usecols` 파라미터를 적극 활용하세요. 우리가 분석에 필요한 건 전체 100개 컬럼 중 보통 5개 미만입니다.\n\n이 글에서는 이 외에도 `chaining` 기법과 `parquet` 포맷 활용법에 대해 다룹니다. 여러분의 퇴근 시간을 지켜드리겠습니다.',
      '대용량 데이터를 다룰 때 꼭 알아야 할 Pandas 메모리 최적화 팁과 속도 향상 노하우를 공유합니다. 코드는 간단하지만 효과는 강력합니다.',
      'GENERAL',
      ARRAY['Python', 'Pandas', '코딩팁'],
      target_user_id,
      NOW() - INTERVAL '3 hours'
    );

    -- 3. 스타벅스 입지 분석
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '스타벅스 옆에 이디야가 생기는 진짜 이유 (상권 분석)',
      '## "스세권"은 과학이다\n우리나라 스타벅스 매장은 1,900개가 넘습니다. 흔히 스타벅스가 들어오면 이디야가 옆에 생긴다고 하죠. 이것이 단순한 "따라하기" 전략일까요? 데이터를 통해 두 브랜드의 출점 전략을 비교 분석했습니다.\n\n### 거리기반 상관관계 분석\n전국 스타벅스 매장 반경 200m 내에 이디야 매장이 존재하는 비율은 무려 72%였습니다. 하지만 매출 데이터를 추정해 보면 재미있는 현상이 발견됩니다. 스타벅스가 "약속 장소"로서의 수요를 담당한다면, 이디야는 "테이크아웃 및 가성비" 수요를 흡수하며 상호 보완적인 관계를 형성하고 있습니다.\n\n지도 시각화(Folium)를 통해 본 서울시 구별 커피 전쟁, 지금 확인해보세요.',
      '스타벅스와 이디야의 매장 위치 데이터를 GIS로 시각화하여 상관관계를 분석했습니다. 단순 경쟁이 아닌 상호 보완적 생태계의 비밀을 파헤칩니다.',
      'DATA',
      ARRAY['상권분석', '부동산', '시각화'],
      target_user_id,
      NOW() - INTERVAL '1 day'
    );

    -- 4. 통계의 함정
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '평균의 배신: 당신의 분석이 틀린 이유 (심슨의 역설)',
      '전체 데이터로 보면 A 치료법이 B 치료법보다 완치율이 높습니다. 하지만 경증 환자와 중증 환자로 나누어 보면 정반대의 결과가 나옵니다. 이것이 바로 **심슨의 역설(Simpson''s Paradox)**입니다.\n\n데이터 분석가들이 가장 흔하게 저지르는 실수가 바로 "쪼개보지 않고 합쳐서 보는 것"입니다. \n이 글에서는 실제 병원 데이터 예시를 통해, 어떻게 그룹별 가중치를 고려해야 올바른 의사결정을 내릴 수 있는지 수학적이지 않은 언어로 쉽게 설명합니다.\n\n**핵심 요약:**\n1. 데이터는 항상 쪼개봐야 한다 (Disaggregation)\n2. 교란 변수(Confounding Variable)를 찾아라',
      '데이터 전체의 평균만 믿다가 범하게 되는 치명적 오류, 심슨의 역설을 실제 사례로 설명합니다. 그룹별 분석의 중요성을 깨닫게 될 것입니다.',
      'GENERAL',
      ARRAY['통계', '데이터리터러시'],
      target_user_id,
      NOW() - INTERVAL '2 days'
    );

    -- 5. 영화 리뷰 감성 분석
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '네이버 영화 리뷰 10만 건으로 본 "AI가 느낀 기생충"',
      '자연어 처리(NLP) 기술을 이용해 영화 [기생충]의 관람객 리뷰 10만 건을 분석했습니다. KoNLPy와 WordCloud를 사용했습니다.\n\n### 긍정 키워드 Top 5\n1. 냄새 (의외로 긍정적인 맥락의 서스펜스 묘사)\n2. 봉준호\n3. 연기력\n\n### 소름 돋는 발견\n단순히 "재미있다"는 평보다 "불쾌하다"는 평이 평점 10점과 함께 나타나는 기이한 현상. 영화가 주는 충격이 긍정적 불쾌함으로 전달되었음을 데이터가 증명합니다. 직접 크롤링한 데이터셋도 첨부합니다.',
      '자연어 처리(NLP)로 분석한 영화 리뷰 감성 분석 프로젝트. 긍정/부정 단어 구름과 함께 소스코드를 공유합니다.',
      'DATA',
      ARRAY['NLP', '텍스트마이닝', '영화'],
      target_user_id,
      NOW() - INTERVAL '3 days'
    );

    -- 6. 데이터 전처리의 중요성
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '데이터 과학자의 업무 80%는 "청소"다 (전처리의 현실)',
      '머신러닝 모델을 돌리는 건 찰나입니다. 우리는 그 모델에 들어갈 데이터를 닦고, 조이고, 기름칠하는 데 인생을 바칩니다.\n\n현업에서 마주하는 데이터는 교과서처럼 깨끗하지 않습니다.\n- 날짜 형식이 제각각인 경우 (`20240101`, `24.1.1`)\n- 주소가 구/동 단위로 섞여 있는 경우\n- `NULL` 값이 의미 있는 정보일 때\n\n더러운 데이터(Dirty Data)를 다루는 저만의 노하우와 정규표현식(Regex) 꿀팁을 정리했습니다. 이 글을 읽고 나면 전처리가 더 이상 노가다로 느껴지지 않을... 수는 없겠지만, 조금은 빨라질 겁니다.',
      '현업 데이터 분석가가 겪는 전처리의 고통과 노하우. 정규표현식과 결측치 처리 팁을 통해 야근을 줄여드립니다.',
      'GENERAL',
      ARRAY['전처리', '커리어', '노하우'],
      target_user_id,
      NOW() - INTERVAL '4 days'
    );

    -- 7. SQL 쿼리 최적화
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '10분 걸리던 쿼리, 3초 만에 끝내기 (인덱싱의 원리)',
      '개발자가 아니어도 알면 좋은 DB 튜닝의 기초.\n\n"SELECT * FROM users WHERE name = ''Kim''"\n이 간단한 쿼리가 왜 데이터가 쌓이면 느려질까요? 도서관의 색인(Index) 원리를 빗대어 B-Tree 인덱스 구조를 설명합니다.\n\n### 실행 계획(Explain Plan) 읽는 법\nFull Table Scan이 보인다면 일단 긴장하세요. 인덱스를 태우는 방법과, 오히려 인덱스가 독이 되는 경우(카디널리티가 낮은 경우)까지 상세히 알아봅니다.',
      '느린 SQL 쿼리 때문에 고통받는 분석가를 위한 인덱싱 기초 가이드. 실행 계획(Explain)을 읽는 법부터 최적화까지.',
      'GENERAL',
      ARRAY['SQL', 'DB', '최적화'],
      target_user_id,
      NOW() - INTERVAL '5 days'
    );

     -- 8. 스터디 모집
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '강남역 오프라인: 밑바닥부터 시작하는 딥러닝 3기 모집',
      '혼자 공부하다 지쳐서 도망치신 분들 주목.\n\n- **교재**: 밑바닥부터 시작하는 딥러닝 1권\n- **장소**: 강남역 인근 스터디룸\n- **시간**: 매주 토요일 오전 10시 ~ 12시\n- **커리큘럼**: 퍼셉트론부터 CNN까지, 수식을 코드로 구현까지.\n\n현재 개발자 2명, 통계학과 학생 1명 있습니다. 비전공자라도 열정만 있다면 환영합니다. 코드 한 줄 한 줄 씹어먹을 분들만 오세요.',
      '금요일 마감. 강남역 토요일 오전 딥러닝 이론 스터디원 충원합니다. 끈기 있는 분들만 지원해주세요.',
      'STUDY',
      ARRAY['딥러닝', '스터디', '강남'],
      target_user_id,
      NOW() - INTERVAL '6 days'
    );

    -- 9. UX 데이터를 위한 통계
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '디자이너를 위한 A/B 테스트 입문서 (p-value가 뭔데?)',
      '버튼 색깔을 파란색으로 바꿨더니 클릭률이 2% 올랐습니다. 자, 이게 "우연"일까요 "필연"일까요? 이걸 판별해주는 것이 통계입니다.\n\n수학 공식을 몰라도 됩니다. 직관적으로 설명해드립니다.\n- **귀무가설**: "색깔 바꿔도 차이 없어"\n- **p-value**: "우연히 이렇게 차이가 날 확률"\n\np-value가 0.05보다 작다는 건, 우연이라기엔 너무 희박하다(=진짜 효과가 있다)는 뜻입니다. 이제 개발팀에게 자신 있게 "데이터 근거"를 제시하세요.',
      'UX/UI 디자이너가 알아야 할 A/B 테스트의 기초 통계 지식. p-value와 신뢰구간을 직관적으로 설명합니다.',
      'GENERAL',
      ARRAY['통계', 'UX', 'AB테스트'],
      target_user_id,
      NOW() - INTERVAL '1 week'
    );

    -- 10. 미래 전망
    INSERT INTO public.posts (title, content, excerpt, type, tags, author_id, created_at) VALUES (
      '2030년, AI가 대체할 수 없는 분석가의 역량은?',
      'ChatGPT와 Copilot이 코드를 대신 짜주는 시대입니다. 이제 "파이썬 문법을 잘 아는 것"은 경쟁력이 아닙니다.\n\n제가 생각하는 미래 분석가의 3대 핵심 역량:\n1. **문제 정의 능력**: 무엇을 풀어야 할지 아는 것\n2. **도메인 지식**: 데이터가 나온 현장을 이해하는 힘\n3. **커뮤니케이션**: 숫자를 사람의 언어로 번역하는 능력\n\n기술은 도구일 뿐입니다. 그 도구로 어떤 이야기를 만들어낼지는 여전히 인간의 몫입니다.',
      '생성형 AI 시대에 데이터 분석가는 어떻게 살아남아야 할까? 기술보다 더 중요한 문제 해결 능력과 도메인 지식에 대하여.',
      'GENERAL',
      ARRAY['커리어', 'AI', '인사이트'],
      target_user_id,
      NOW() - INTERVAL '1 week'
    );

  END IF;
END $$;
