import type { City } from "@/types/weather";

/**
 * 한국 주요 도시 좌표 데이터
 * OpenWeatherMap API에 사용할 위경도 좌표
 */
export const KOREAN_CITIES: City[] = [
  {
    id: "seoul",
    name: "서울",
    nameEn: "Seoul",
    lat: 37.5665,
    lon: 126.9780,
  },
  {
    id: "busan",
    name: "부산",
    nameEn: "Busan",
    lat: 35.1796,
    lon: 129.0756,
  },
  {
    id: "incheon",
    name: "인천",
    nameEn: "Incheon",
    lat: 37.4563,
    lon: 126.7052,
  },
  {
    id: "daegu",
    name: "대구",
    nameEn: "Daegu",
    lat: 35.8714,
    lon: 128.6014,
  },
  {
    id: "daejeon",
    name: "대전",
    nameEn: "Daejeon",
    lat: 36.3504,
    lon: 127.3845,
  },
  {
    id: "gwangju",
    name: "광주",
    nameEn: "Gwangju",
    lat: 35.1595,
    lon: 126.8526,
  },
  {
    id: "ulsan",
    name: "울산",
    nameEn: "Ulsan",
    lat: 35.5384,
    lon: 129.3114,
  },
  {
    id: "suwon",
    name: "수원",
    nameEn: "Suwon",
    lat: 37.2636,
    lon: 127.0286,
  },
  {
    id: "sejong",
    name: "세종",
    nameEn: "Sejong",
    lat: 36.4800,
    lon: 127.2890,
  },
  {
    id: "jeju",
    name: "제주",
    nameEn: "Jeju",
    lat: 33.4996,
    lon: 126.5312,
  },
];

/**
 * 도시 ID로 도시 정보 찾기
 */
export function getCityById(id: string): City | undefined {
  return KOREAN_CITIES.find((city) => city.id === id);
}

/**
 * 기본 도시 (서울)
 */
export const DEFAULT_CITY = KOREAN_CITIES[0];


