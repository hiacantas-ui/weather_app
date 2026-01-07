import type { WeatherApiResponse, WeatherApiError } from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
// One Call API 2.5 사용 (무료)
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * API 에러 클래스
 */
export class WeatherApiErrorClass extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public cod?: string | number
  ) {
    super(message);
    this.name = "WeatherApiError";
  }
}

/**
 * API 키 검증
 */
function validateApiKey(): void {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new WeatherApiErrorClass(
      "API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.",
      401
    );
  }
}

/**
 * One Call API 2.5로 날씨 데이터 조회 (무료)
 * @param lat - 위도
 * @param lon - 경도
 * @returns 날씨 데이터
 */
export async function fetchWeatherData(
  lat: number,
  lon: number
): Promise<WeatherApiResponse> {
  validateApiKey();

  // One Call API 2.5 사용 (무료 플랜)
  const url = `${API_BASE_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr&exclude=minutely,alerts`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 }, // 10분마다 재검증
    });

    if (!response.ok) {
      const errorData: WeatherApiError = await response.json();
      throw new WeatherApiErrorClass(
        errorData.message || "날씨 데이터를 가져오는데 실패했습니다.",
        response.status,
        errorData.cod
      );
    }

    const data: WeatherApiResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherApiErrorClass) {
      throw error;
    }

    // 네트워크 에러 등
    throw new WeatherApiErrorClass(
      "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
      500
    );
  }
}

/**
 * 현재 날씨만 조회 (간단한 버전)
 * @param lat - 위도
 * @param lon - 경도
 * @returns 현재 날씨 데이터
 */
export async function fetchCurrentWeather(lat: number, lon: number) {
  const data = await fetchWeatherData(lat, lon);
  return {
    current: data.current,
    timezone: data.timezone,
  };
}

/**
 * 시간별 예보 조회 (다음 48시간)
 * @param lat - 위도
 * @param lon - 경도
 * @param hours - 조회할 시간 수 (기본 24시간)
 * @returns 시간별 예보 데이터
 */
export async function fetchHourlyForecast(
  lat: number,
  lon: number,
  hours: number = 24
) {
  const data = await fetchWeatherData(lat, lon);
  return {
    hourly: data.hourly.slice(0, hours),
    timezone: data.timezone,
  };
}

/**
 * 일별 예보 조회 (다음 8일)
 * @param lat - 위도
 * @param lon - 경도
 * @param days - 조회할 일 수 (기본 7일)
 * @returns 일별 예보 데이터
 */
export async function fetchDailyForecast(
  lat: number,
  lon: number,
  days: number = 7
) {
  const data = await fetchWeatherData(lat, lon);
  return {
    daily: data.daily.slice(0, days),
    timezone: data.timezone,
  };
}

