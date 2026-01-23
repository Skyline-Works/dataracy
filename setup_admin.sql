-- 1. 첫 번째로 가입한 유저를 'ADMIN'으로 승격 (본인 계정)
UPDATE public.profiles
SET role = 'ADMIN'
WHERE id = (SELECT id FROM public.profiles ORDER BY created_at ASC LIMIT 1);

-- 2. 관리자(ADMIN)는 모든 글을 삭제할 수 있는 권한 부여 (RLS Policy)
-- 기존 정책 충돌 방지를 위해 삭제 후 재생성
DROP POLICY IF EXISTS "Admins can delete any post" ON public.posts;

CREATE POLICY "Admins can delete any post" ON public.posts
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'ADMIN'
  )
);

-- 3. 관리자(ADMIN)는 모든 글을 수정할 수 있는 권한 부여 (선택 사항)
DROP POLICY IF EXISTS "Admins can update any post" ON public.posts;

CREATE POLICY "Admins can update any post" ON public.posts
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'ADMIN'
  )
);
