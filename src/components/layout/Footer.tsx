import { ExternalLink } from "lucide-react";

/**
 * Footer 컴포넌트
 * 데이터 출처 표기 및 저작권 정보를 표시합니다.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-6 md:px-8 md:py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* 데이터 출처 */}
          <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <p className="text-sm text-muted-foreground">
              데이터 제공:{" "}
              <a
                href="https://openweathermap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
              >
                OpenWeatherMap
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              실시간 기상 데이터 및 예보 정보
            </p>
          </div>

          {/* 저작권 정보 */}
          <div className="flex flex-col items-center gap-1 text-center md:items-end md:text-right">
            <p className="text-sm font-medium">
              © {currentYear} 날씨 정보 서비스
            </p>
            <p className="text-xs text-muted-foreground">
              All rights reserved.
            </p>
          </div>
        </div>

        {/* 추가 정보 (선택사항) */}
        <div className="mt-6 border-t pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            이 서비스는 교육 및 개인 프로젝트 목적으로 제작되었습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}


