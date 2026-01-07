import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Cloud, Droplets } from "lucide-react";

interface ForecastCardProps {
  data: {
    list: Array<{
      dt: number;
      main: {
        temp: number;
        temp_min: number;
        temp_max: number;
      };
      weather: Array<{
        description: string;
        icon: string;
      }>;
      pop: number;
      dt_txt: string;
    }>;
  };
}

/**
 * 예보 정보 카드 컴포넌트
 * 시간별 및 일별 예보를 Tabs로 전환
 */
export function ForecastCard({ data }: ForecastCardProps) {
  // 시간별 예보 (다음 24시간, 3시간 간격 = 8개)
  const hourlyForecast = data.list.slice(0, 8);

  // 일별 예보 (하루에 하나씩, 정오 데이터 사용)
  const dailyForecast = data.list.filter((item) => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12; // 정오 데이터만 선택
  });

  return (
    <Card role="region" aria-label="날씨 예보">
      <CardHeader>
        <CardTitle>날씨 예보</CardTitle>
        <CardDescription>향후 날씨 변화</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hourly" className="w-full" aria-label="예보 유형 선택">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hourly">시간별</TabsTrigger>
            <TabsTrigger value="daily">일별</TabsTrigger>
          </TabsList>

          {/* 시간별 예보 */}
          <TabsContent value="hourly" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {hourlyForecast.map((item, index) => {
                const date = new Date(item.dt * 1000);
                const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-lg border p-3 text-center hover:bg-secondary transition-colors"
                  >
                    <p className="text-xs font-medium text-muted-foreground">
                      {index === 0
                        ? "지금"
                        : date.toLocaleTimeString("ko-KR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                    </p>
                    <img
                      src={iconUrl}
                      alt={item.weather[0].description}
                      className="w-12 h-12"
                    />
                    <p className="text-xl font-bold">
                      {item.main.temp.toFixed(0)}°
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.weather[0].description}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Droplets className="h-3 w-3 text-blue-500" />
                      <p className="text-xs text-blue-600 font-medium">
                        {(item.pop * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* 일별 예보 */}
          <TabsContent value="daily" className="mt-4">
            <div className="space-y-3">
              {dailyForecast.map((item, index) => {
                const date = new Date(item.dt * 1000);
                const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <p className="font-medium w-20">
                        {index === 0
                          ? "오늘"
                          : date.toLocaleDateString("ko-KR", {
                              month: "short",
                              day: "numeric",
                              weekday: "short",
                            })}
                      </p>
                      <img
                        src={iconUrl}
                        alt={item.weather[0].description}
                        className="w-10 h-10"
                      />
                      <p className="text-sm text-muted-foreground flex-1">
                        {item.weather[0].description}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <p className="text-sm font-medium text-blue-600">
                          {(item.pop * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                          {item.main.temp_min.toFixed(0)}°
                        </p>
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full" />
                        <p className="text-sm font-bold">
                          {item.main.temp_max.toFixed(0)}°
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

