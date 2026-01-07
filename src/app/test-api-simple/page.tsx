import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { fetchCurrentWeatherSimple, fetch5DayForecast } from "@/lib/api/weather-simple";
import { KOREAN_CITIES, DEFAULT_CITY } from "@/lib/constants/cities";
import { CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Phase 3 Simple API 테스트 페이지
 * 무료 플랜에서 확실히 작동하는 API 테스트
 */
export default async function TestApiSimplePage() {
  let currentWeather = null;
  let forecast = null;
  let error = null;

  try {
    currentWeather = await fetchCurrentWeatherSimple(DEFAULT_CITY.lat, DEFAULT_CITY.lon);
    forecast = await fetch5DayForecast(DEFAULT_CITY.lat, DEFAULT_CITY.lon);
  } catch (err) {
    error = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Phase 3 Simple API 테스트 ✅
          </h1>
          <p className="text-lg text-muted-foreground">
            무료 플랜 API (Current Weather + 5 Day Forecast)
          </p>
        </div>

        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API 호출 실패</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>API 호출 성공! 🎉</AlertTitle>
            <AlertDescription>
              무료 플랜 API가 정상적으로 작동합니다!
            </AlertDescription>
          </Alert>
        )}

        {currentWeather && (
          <Card>
            <CardHeader>
              <CardTitle>현재 날씨 (서울)</CardTitle>
              <CardDescription>
                Current Weather API - 100% 무료
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">온도</p>
                  <p className="text-3xl font-bold">
                    {currentWeather.main.temp.toFixed(1)}°C
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">체감 온도</p>
                  <p className="text-3xl font-bold">
                    {currentWeather.main.feels_like.toFixed(1)}°C
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">습도</p>
                  <p className="text-3xl font-bold">
                    {currentWeather.main.humidity}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">풍속</p>
                  <p className="text-3xl font-bold">
                    {currentWeather.wind.speed.toFixed(1)} m/s
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">날씨</p>
                  <p className="text-2xl font-bold">
                    {currentWeather.weather[0].description}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">가시거리</p>
                  <p className="text-3xl font-bold">
                    {(currentWeather.visibility / 1000).toFixed(1)} km
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {forecast && (
          <Card>
            <CardHeader>
              <CardTitle>5일 예보 (3시간 간격)</CardTitle>
              <CardDescription>
                5 Day Forecast API - 100% 무료 (처음 8개 표시)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {forecast.list.slice(0, 8).map((item: any, index: number) => {
                  const date = new Date(item.dt * 1000);
                  return (
                    <div
                      key={index}
                      className="space-y-2 rounded-lg border p-3 text-center"
                    >
                      <p className="text-xs font-medium text-muted-foreground">
                        {date.toLocaleDateString("ko-KR", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        {date.toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-xl font-bold">
                        {item.main.temp.toFixed(1)}°C
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.weather[0].description}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        💧 {(item.pop * 100).toFixed(0)}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>한국 주요 도시</CardTitle>
            <CardDescription>
              총 {KOREAN_CITIES.length}개 도시
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              {KOREAN_CITIES.map((city) => (
                <div
                  key={city.id}
                  className="rounded-lg border bg-secondary/50 p-3 text-center"
                >
                  <p className="font-bold">{city.name}</p>
                  <p className="text-xs text-muted-foreground">{city.nameEn}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-4 text-sm text-muted-foreground">
          <p>✅ 이 API는 무료 플랜에서 100% 작동합니다!</p>
          <p className="mt-2">
            메인 페이지:{" "}
            <a href="/" className="text-primary hover:underline">
              여기를 클릭
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


