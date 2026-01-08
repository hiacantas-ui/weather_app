/**
 * OpenWeatherMap API 응답 타입 정의
 */

// 날씨 상태 정보
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// 현재 날씨 정보
export interface CurrentWeather {
  dt: number; // 타임스탬프
  sunrise: number;
  sunset: number;
  temp: number; // 현재 온도
  feels_like: number; // 체감 온도
  pressure: number; // 기압
  humidity: number; // 습도
  dew_point: number; // 이슬점
  uvi: number; // 자외선 지수
  clouds: number; // 구름
  visibility: number; // 가시거리
  wind_speed: number; // 풍속
  wind_deg: number; // 풍향
  wind_gust?: number; // 돌풍
  weather: WeatherCondition[];
}

// 시간별 날씨 정보
export interface HourlyWeather {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  pop: number; // 강수 확률
}

// 일별 온도 정보
export interface DailyTemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

// 일별 체감 온도
export interface DailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

// 일별 날씨 정보
export interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: DailyTemp;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number; // 강수 확률
  rain?: number;
  uvi: number;
}

// One Call API 3.0 응답
export interface WeatherApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

// 도시 정보
export interface City {
  id: string;
  name: string;
  nameEn: string;
  lat: number;
  lon: number;
}

// API 에러 응답
export interface WeatherApiError {
  cod: string | number;
  message: string;
}

// 날씨 아이콘 매핑
export type WeatherIconCode = 
  | "01d" | "01n" // 맑음
  | "02d" | "02n" // 구름 조금
  | "03d" | "03n" // 구름
  | "04d" | "04n" // 흐림
  | "09d" | "09n" // 소나기
  | "10d" | "10n" // 비
  | "11d" | "11n" // 천둥번개
  | "13d" | "13n" // 눈
  | "50d" | "50n"; // 안개



