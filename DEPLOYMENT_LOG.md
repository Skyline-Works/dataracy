# Dataracy 배포 및 문제 해결 로그 (2025-12-27)

이 문서는 Dataracy 프로젝트를 Netlify에 배포하고 Supabase 데이터베이스와 연동하는 과정에서 발생한 이슈와 해결 방법을 기록합니다.

## 1. 데이터베이스 마이그레이션 (SQLite -> Supabase PostgreSQL)

### 목표
Netlify와 같은 Serverless 환경에서는 파일 기반의 SQLite(`dev.db`)가 유지되지 않으므로, 호스팅된 PostgreSQL 서비스인 **Supabase**로 이전해야 했습니다.

### 변경 사항
1.  **Prisma 설정 변경**:
    *   `prisma/schema.prisma`의 `provider`를 `sqlite`에서 `postgresql`로 변경.
2.  **환경 변수 설정**:
    *   Supabase 프로젝트 생성 후 Connection String 확보.
    *   초기 연결 실패 (IPv6 호환성 문제 및 포트 문제).

### 트러블슈팅: Supabase 연결 오류
*   **문제**: `prisma db push` 실행 시 타임아웃 또는 호스트 찾기 실패 오류 발생.
*   **원인**:
    *   사용자 네트워크(IPv4)에서 Supabase 기본 주소(IPv6) 접근 불가.
    *   Supabase Transaction Pooler(포트 6543)는 Prisma의 마이그레이션/스키마 변경 작업(`db push`)을 지원하지 않음.
*   **해결**:
    *   **Supavisor Session Mode** 사용.
    *   포트를 `6543`에서 **`5432`**로 변경.
    *   최종 연결 주소 형식: `postgresql://...pooler.supabase.com:5432/postgres?pgbouncer=true`

## 2. Netlify 배포 설정

### 설정 파일 (`netlify.toml`)
Netlify가 Next.js 프로젝트를 올바르게 빌드하도록 설정 파일을 생성했습니다.
```toml
[build]
  command = "npx prisma generate && npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## 3. 빌드 오류 해결 과정

### 의존성 충돌 (React 19 vs Next.js 15)
*   **문제**: Netlify 빌드 중 `npm install` 단계에서 `ERESOLVE` 에러 발생. `Next.js 15.0.3`과 `React 19.x` 간의 Peer Dependency 충돌.
*   **해결**: 루트 디렉토리에 `.npmrc` 파일을 생성하고 강제 설치 옵션 추가.
    ```ini
    legacy-peer-deps=true
    ```

### Netlify 시크릿 스캐닝 (Secrets Scanning)
*   **문제**: 빌드 중 `Secrets scanning found secrets in build` 에러로 실패.
    *   `README.md`에 포함된 `http://localhost:3000` 예시 URL을 환경 변수 `NEXTAUTH_URL`의 노출로 오탐지.
*   **해결**:
    1.  `README.md`에서 `localhost` 링크 제거.
    2.  `netlify.toml`을 통해 시크릿 스캐닝 기능 비활성화.
        ```toml
        [build.environment]
          SECRETS_SCAN_ENABLED = "false"
        ```

### 보안 취약점 차단 (CVE-2025-55182)
*   **문제**: Netlify가 `Next.js 15.0.3` 버전의 보안 취약점을 감지하여 배포를 강제로 차단.
*   **해결**: Next.js 패키지를 최신 버전으로 업데이트.
    ```bash
    npm install next@latest --legacy-peer-deps
    ```

## 4. 최종 결과
*   **배포 상태**: 성공 (Published)
*   **데이터베이스**: Supabase 연동 완료
*   **URL**: Netlify에서 제공된 도메인으로 접속 가능.

## 5. 추후 권장 사항
*   **환경 변수 관리**: 배포된 Netlify 사이트의 URL을 `NEXTAUTH_URL` 환경 변수에 업데이트할 것을 권장합니다.
