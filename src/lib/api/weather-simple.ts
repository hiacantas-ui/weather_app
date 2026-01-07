/**
 * 무료 플랜에서 확실히 작동하는 Simple Weather API
 * Current Weather API + 5 Day Forecast API 사용
 */

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

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

function validateApiKey(): void {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new WeatherApiErrorClass(
      "API 키가 설정되지 않았습니다.",
      401
    );
  }
}

/**
 * 현재 날씨 조회 (무료 API)
 */
export async function fetchCurrentWeatherSimple(lat: number, lon: number) {
  validateApiKey();

  const url = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new WeatherApiErrorClass(
        errorData.message || "날씨 데이터를 가져오는데 실패했습니다.",
        response.status,
        errorData.cod
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof WeatherApiErrorClass) {
      throw error;
    }
    throw new WeatherApiErrorClass(
      "네트워크 오류가 발생했습니다.",
      500
    );
  }
}

/**
 * 5일 예보 조회 (3시간 간격, 무료 API)
 */
export async function fetch5DayForecast(lat: number, lon: number) {
  validateApiKey();

  const url = `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new WeatherApiErrorClass(
        errorData.message || "예보 데이터를 가져오는데 실패했습니다.",
        response.status,
        errorData.cod
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof WeatherApiErrorClass) {
      throw error;
    }
    throw new WeatherApiErrorClass(
      "네트워크 오류가 발생했습니다.",
      500
    );
  }
}


