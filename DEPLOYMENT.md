# 배포 가이드

## Vercel 배포

### 1. Vercel 계정 준비
1. [Vercel](https://vercel.com) 회원가입
2. GitHub 계정 연동

### 2. 프로젝트 배포

#### 방법 1: Vercel Dashboard 사용
1. Vercel Dashboard에서 "New Project" 클릭
2. GitHub 레포지토리 선택
3. 프로젝트 설정:
   - Framework Preset: **Next.js**
   - Root Directory: `.`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. 환경 변수 설정:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   NEXT_PUBLIC_OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5
   ```

5. "Deploy" 클릭

#### 방법 2: Vercel CLI 사용
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 실행
vercel

# 환경 변수 설정
vercel env add NEXT_PUBLIC_OPENWEATHER_API_KEY
vercel env add NEXT_PUBLIC_OPENWEATHER_API_URL

# 프로덕션 배포
vercel --prod
```

### 3. 배포 후 확인사항
- ✅ API 호출이 정상 작동하는지 확인
- ✅ 모든 도시 선택이 동작하는지 확인
- ✅ 시간별/일별 탭 전환이 동작하는지 확인
- ✅ 모바일 반응형이 잘 적용되었는지 확인

---

## 환경 변수 관리

### 로컬 개발
`.env.local` 파일 사용 (Git에 커밋하지 않음)

### Vercel 프로덕션
Vercel Dashboard > Settings > Environment Variables에서 관리

### 중요!
- API 키는 절대 Git에 커밋하지 마세요
- `.gitignore`에 `.env*` (except `.env.example`) 포함 확인

---

## 성능 최적화 체크리스트

### 이미지 최적화
- ✅ `next/image` 사용 (현재 날씨 아이콘은 외부 URL 사용)
- ✅ `loading="lazy"` 적용됨

### 데이터 캐싱
- ✅ API 응답 10분 캐싱 (`revalidate: 600`)

### 번들 크기
- ✅ 필요한 컴포넌트만 import
- ✅ Client Component와 Server Component 적절히 분리

---

## 도메인 연결 (선택사항)

### Vercel에서 커스텀 도메인 설정
1. Vercel Dashboard > Settings > Domains
2. 도메인 입력 (예: weather.yourdomain.com)
3. DNS 설정 (Vercel이 자동 안내)
4. SSL 자동 적용

---

## 모니터링

### Vercel Analytics (무료)
```bash
npm install @vercel/analytics
```

`src/app/layout.tsx`에 추가:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 문제 해결

### API 키 오류
- Vercel 환경 변수가 올바르게 설정되었는지 확인
- 환경 변수 변경 후 재배포 필요

### 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build
```

### 성능 이슈
- Vercel Analytics에서 Core Web Vitals 확인
- 느린 API 응답 시 캐싱 시간 조정

---

## 다음 단계 (선택사항)

### Phase 8: 추가 기능
- 즐겨찾기 도시 저장
- Geolocation API로 현재 위치 자동 감지
- 미세먼지/자외선 지수 추가
- 다크모드 토글 버튼

---

**배포 완료 후 URL을 공유하세요!** 🎉



