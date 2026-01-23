-- 1. 게시글 테이블에 이미지/파일 URL 컬럼 추가
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS file_url text;

-- 2. Storage 버킷(저장소) 생성 ('images'와 'files')
-- 주의: 권한 문제로 SQL에서 생성이 안 될 수도 있습니다. 
-- 만약 에러가 나거나 업로드가 안 되면, Supabase 대시보드 -> Storage에서 'images', 'files' 버킷을 직접 만들고 'Public'으로 설정해주세요.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true), ('files', 'files', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage 보안 정책 설정 (누구나 읽기 가능, 로그인한 사람만 업로드 가능)
-- 기존 정책 충돌 방지를 위해 삭제 후 생성
DROP POLICY IF EXISTS "Public Access Images" ON storage.objects;
DROP POLICY IF EXISTS "Auth Upload Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access Files" ON storage.objects;
DROP POLICY IF EXISTS "Auth Upload Files" ON storage.objects;

CREATE POLICY "Public Access Images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Auth Upload Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Public Access Files" ON storage.objects FOR SELECT USING (bucket_id = 'files');
CREATE POLICY "Auth Upload Files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'files' AND auth.role() = 'authenticated');
