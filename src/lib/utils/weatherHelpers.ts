/**
 * 날씨 관련 유틸리티 함수들
 */

/**
 * 날씨 상태에 따른 배경 그라데이션 반환
 */
export function getWeatherGradient(weatherMain: string): string {
  const weatherLower = weatherMain.toLowerCase();

  // 맑음
  if (weatherLower.includes("clear")) {
    return "from-blue-400 via-cyan-400 to-blue-500";
  }

  // 구름 조금
  if (weatherLower.includes("few") || weatherLower.includes("scattered")) {
    return "from-blue-300 via-gray-200 to-blue-400";
  }

  // 흐림
  if (weatherLower.includes("cloud") || weatherLower.includes("overcast")) {
    return "from-gray-400 via-gray-500 to-gray-600";
  }

  // 비
  if (
    weatherLower.includes("rain") ||
    weatherLower.includes("drizzle") ||
    weatherLower.includes("shower")
  ) {
    return "from-slate-600 via-slate-700 to-slate-800";
  }

  // 천둥번개
  if (weatherLower.includes("thunderstorm") || weatherLower.includes("storm")) {
    return "from-purple-900 via-slate-800 to-gray-900";
  }

  // 눈
  if (weatherLower.includes("snow")) {
    return "from-blue-100 via-slate-200 to-blue-200";
  }

  // 안개
  if (
    weatherLower.includes("mist") ||
    weatherLower.includes("fog") ||
    weatherLower.includes("haze")
  ) {
    return "from-gray-300 via-gray-400 to-gray-500";
  }

  // 기본값
  return "from-blue-400 via-indigo-500 to-purple-600";
}

/**
 * 날씨 상태에 따른 텍스트 색상 반환
 */
export function getWeatherTextColor(weatherMain: string): string {
  const weatherLower = weatherMain.toLowerCase();

  // 어두운 배경 (흰색 텍스트)
  if (
    weatherLower.includes("rain") ||
    weatherLower.includes("thunderstorm") ||
    weatherLower.includes("storm")
  ) {
    return "text-white";
  }

  // 눈 (어두운 텍스트)
  if (weatherLower.includes("snow")) {
    return "text-gray-800";
  }

  // 기본값 (흰색)
  return "text-white";
}

/**
 * 날씨 상태를 이모지로 반환
 */
export function getWeatherEmoji(weatherMain: string): string {
  const weatherLower = weatherMain.toLowerCase();

  if (weatherLower.includes("clear")) return "☀️";
  if (weatherLower.includes("cloud")) return "☁️";
  if (weatherLower.includes("rain")) return "🌧️";
  if (weatherLower.includes("drizzle")) return "🌦️";
  if (weatherLower.includes("thunderstorm")) return "⛈️";
  if (weatherLower.includes("snow")) return "❄️";
  if (weatherLower.includes("mist") || weatherLower.includes("fog"))
    return "🌫️";

  return "🌤️";
}

/**
 * 시간대에 따른 인사말 반환
 */
export function getGreetingByTime(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "좋은 아침입니다";
  if (hour >= 12 && hour < 18) return "좋은 오후입니다";
  if (hour >= 18 && hour < 22) return "좋은 저녁입니다";
  return "안녕하세요";
}

/**
 * 온도에 따른 조언 반환
 */
export function getTemperatureAdvice(temp: number): string {
  if (temp < -10) return "매우 추워요! 방한 준비를 철저히 하세요.";
  if (temp < 0) return "추워요. 따뜻하게 입으세요.";
  if (temp < 10) return "쌀쌀해요. 겉옷을 챙기세요.";
  if (temp < 20) return "시원해요. 활동하기 좋은 날씨입니다.";
  if (temp < 28) return "따뜻해요. 가벼운 옷차림이 좋겠습니다.";
  if (temp < 33) return "더워요. 수분 섭취를 충분히 하세요.";
  return "매우 더워요! 야외 활동 시 주의하세요.";
}



