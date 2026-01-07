import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { fetchWeatherData } from "@/lib/api/weather";
import { KOREAN_CITIES, DEFAULT_CITY } from "@/lib/constants/cities";
import { CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Phase 3 API 테스트 페이지
 * OpenWeatherMap API 연동이 정상적으로 작동하는지 확인합니다.
 */
export default async function TestApiPage() {
  let weatherData = null;
  let error = null;

  // 서울 날씨 데이터 조회 시도
  try {
    weatherData = await fetchWeatherData(DEFAULT_CITY.lat, DEFAULT_CITY.lon);
  } catch (err) {
    error = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Phase 3 API 테스트 페이지 🔌
          </h1>
          <p className="text-lg text-muted-foreground">
            OpenWeatherMap API 연동 및 데이터 처리 테스트
          </p>
        </div>

        {/* API 상태 */}
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API 호출 실패</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>API 호출 성공! ✅</AlertTitle>
            <AlertDescription>
              OpenWeatherMap API가 정상적으로 작동합니다.
            </AlertDescription>
          </Alert>
        )}

        {/* 현재 날씨 데이터 */}
        {weatherData && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>현재 날씨 데이터 (서울)</CardTitle>
                <CardDescription>
                  fetchWeatherData() 함수 테스트
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      온도
                    </p>
                    <p className="text-2xl font-bold">
                      {weatherData.current.temp.toFixed(1)}°C
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      체감 온도
                    </p>
                    <p className="text-2xl font-bold">
                      {weatherData.current.feels_like.toFixed(1)}°C
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      습도
                    </p>
                    <p className="text-2xl font-bold">
                      {weatherData.current.humidity}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      풍속
                    </p>
                    <p className="text-2xl font-bold">
                      {weatherData.current.wind_speed.toFixed(1)} m/s
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      날씨 상태
                    </p>
                    <p className="text-xl font-bold">
                      {weatherData.current.weather[0].description}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      가시거리
                    </p>
                    <p className="text-2xl font-bold">
                      {(weatherData.current.visibility / 1000).toFixed(1)} km
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 시간별 예보 (처음 6시간) */}
            <Card>
              <CardHeader>
                <CardTitle>시간별 예보 (다음 6시간)</CardTitle>
                <CardDescription>
                  hourly 배열 데이터 테스트
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                  {weatherData.hourly.slice(0, 6).map((hour, index) => (
                    <div
                      key={index}
                      className="space-y-2 rounded-lg border p-3 text-center"
                    >
                      <p className="text-xs font-medium text-muted-foreground">
                        {index === 0
                          ? "지금"
                          : `${index}시간 후`}
                      </p>
                      <p className="text-xl font-bold">
                        {hour.temp.toFixed(1)}°C
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {hour.weather[0].description}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        💧 {(hour.pop * 100).toFixed(0)}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 일별 예보 (다음 7일) */}
            <Card>
              <CardHeader>
                <CardTitle>일별 예보 (다음 7일)</CardTitle>
                <CardDescription>
                  daily 배열 데이터 테스트
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weatherData.daily.slice(0, 7).map((day, index) => {
                    const date = new Date(day.dt * 1000);
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex-1">
                          <p className="font-medium">
                            {index === 0
                              ? "오늘"
                              : date.toLocaleDateString("ko-KR", {
                                  month: "short",
                                  day: "numeric",
                                  weekday: "short",
                                })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {day.weather[0].description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              최저/최고
                            </p>
                            <p className="font-bold">
                              {day.temp.min.toFixed(0)}° /{" "}
                              {day.temp.max.toFixed(0)}°
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              강수확률
                            </p>
                            <p className="font-bold text-blue-600">
                              {(day.pop * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* 도시 데이터 테스트 */}
        <Card>
          <CardHeader>
            <CardTitle>한국 주요 도시 데이터</CardTitle>
            <CardDescription>
              cities.ts 상수 테스트 (총 {KOREAN_CITIES.length}개 도시)
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
                  <p className="text-xs text-muted-foreground">
                    {city.nameEn}
                  </p>
                  <p className="text-xs mt-1">
                    {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API 응답 원본 (개발용) */}
        {weatherData && (
          <Card>
            <CardHeader>
              <CardTitle>API 응답 원본 (JSON)</CardTitle>
              <CardDescription>
                개발자 도구 - 전체 응답 구조 확인
              </CardDescription>
            </CardHeader>
            <CardContent>
              <details className="cursor-pointer">
                <summary className="font-medium mb-2">
                  JSON 데이터 보기 (클릭)
                </summary>
                <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs">
                  {JSON.stringify(weatherData, null, 2)}
                </pre>
              </details>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center py-4 text-sm text-muted-foreground">
          <p>
            API 테스트가 성공하면 Phase 4로 진행할 수 있습니다.
          </p>
          <p className="mt-2">
            메인 페이지로 돌아가려면:{" "}
            <a href="/" className="text-primary hover:underline">
              여기를 클릭
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


