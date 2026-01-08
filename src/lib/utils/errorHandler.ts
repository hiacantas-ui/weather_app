import { WeatherApiErrorClass } from "@/lib/api/weather";

/**
 * 사용자 친화적인 에러 메시지 생성
 * @param error - 에러 객체
 * @returns 사용자에게 표시할 메시지
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof WeatherApiErrorClass) {
    // API 에러 처리
    switch (error.statusCode) {
      case 401:
        return "API 키가 유효하지 않습니다. 설정을 확인해주세요.";
      case 404:
        return "요청하신 지역의 날씨 정보를 찾을 수 없습니다.";
      case 429:
        return "API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.";
      case 500:
      case 502:
      case 503:
        return "날씨 서비스에 일시적인 문제가 발생했습니다.";
      default:
        return error.message || "날씨 정보를 불러오는데 실패했습니다.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
}

/**
 * 에러 로깅 (프로덕션에서는 외부 서비스로 전송)
 * @param error - 에러 객체
 * @param context - 에러 발생 컨텍스트
 */
export function logError(error: unknown, context?: string): void {
  const timestamp = new Date().toISOString();
  const errorMessage = getErrorMessage(error);

  console.error(`[${timestamp}] ${context ? `[${context}] ` : ""}${errorMessage}`, error);

  // 프로덕션 환경에서는 Sentry, LogRocket 등 외부 서비스로 전송
  if (process.env.NODE_ENV === "production") {
    // TODO: 외부 로깅 서비스 연동
    // Sentry.captureException(error);
  }
}

/**
 * 재시도 로직이 포함된 fetch 래퍼
 * @param fn - 실행할 함수
 * @param maxRetries - 최대 재시도 횟수
 * @param delay - 재시도 간격 (ms)
 * @returns 함수 실행 결과
 */
export async function retryFetch<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // 마지막 시도가 아니면 대기 후 재시도
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
}



