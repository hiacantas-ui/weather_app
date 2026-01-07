interface HeaderProps {
  selectedCity?: string;
}

/**
 * Header 컴포넌트
 * 서비스 로고/명칭과 선택된 지역을 표시합니다.
 * 접근성 개선: aria-label, semantic HTML
 */
export function Header({ selectedCity = "서울" }: HeaderProps) {
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* 로고 및 서비스명 */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div 
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
            aria-hidden="true"
          >
            <svg 
              className="h-5 w-5 sm:h-6 sm:w-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-label="날씨 아이콘"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">
              <span className="text-blue-600 dark:text-blue-400">Eun Jung</span>'s Weather Forecast
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              실시간 기상 정보 서비스
            </p>
          </div>
        </div>

        {/* 선택된 지역 표시 */}
        <div 
          className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-secondary px-2 py-1.5 sm:px-4 sm:py-2"
          role="status"
          aria-live="polite"
          aria-label={`선택된 지역: ${selectedCity}`}
        >
          <span className="text-xs sm:text-sm font-medium text-muted-foreground hidden xs:inline">
            현재 지역:
          </span>
          <span className="text-sm sm:text-base font-bold">{selectedCity}</span>
        </div>
      </div>
    </header>
  );
}

