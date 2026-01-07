import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Cloud, Droplets, Eye, Wind, Thermometer } from "lucide-react";
import {
  getWeatherGradient,
  getWeatherTextColor,
  getWeatherEmoji,
  getTemperatureAdvice,
} from "@/lib/utils/weatherHelpers";

interface CurrentWeatherCardProps {
  data: {
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    visibility: number;
  };
  cityName: string;
}

/**
 * 현재 날씨 카드 컴포넌트
 * 현재 기온, 체감온도, 습도, 풍속 등을 표시
 * 날씨 상태에 따라 배경색이 동적으로 변경됨
 */
export function CurrentWeatherCard({ data, cityName }: CurrentWeatherCardProps) {
  const weatherIcon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`;
  const weatherMain = data.weather[0].main;
  
  // 날씨에 따른 동적 스타일
  const gradientClass = getWeatherGradient(weatherMain);
  const textColorClass = getWeatherTextColor(weatherMain);
  const weatherEmoji = getWeatherEmoji(weatherMain);
  const tempAdvice = getTemperatureAdvice(data.main.temp);

  return (
    <Card className="overflow-hidden" role="region" aria-label="현재 날씨 정보">
      <CardHeader className={`bg-gradient-to-br ${gradientClass} ${textColorClass}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
              {cityName} 날씨 {weatherEmoji}
            </CardTitle>
            <CardDescription className="opacity-90 mt-1 text-sm">
              현재 기상 정보
            </CardDescription>
          </div>
          <div className="sm:text-right">
            <p className="text-xs sm:text-sm opacity-80">{tempAdvice}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* 메인 온도 및 날씨 아이콘 */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={iconUrl}
              alt={`${data.weather[0].description} 날씨 아이콘`}
              className="w-24 h-24 sm:w-32 sm:h-32"
              loading="lazy"
            />
            <div>
              <p className="text-5xl sm:text-6xl font-bold" aria-label={`현재 온도 ${data.main.temp.toFixed(1)}도`}>
                {data.main.temp.toFixed(1)}°
              </p>
              <p className="text-lg sm:text-xl text-muted-foreground capitalize mt-1 sm:mt-2">
                {data.weather[0].description}
              </p>
            </div>
          </div>

          {/* 상세 정보 그리드 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 rounded-lg bg-secondary p-2.5 sm:p-3" role="group" aria-label="체감온도">
              <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">체감온도</p>
                <p className="text-base sm:text-lg font-semibold">
                  {data.main.feels_like.toFixed(1)}°
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-secondary p-2.5 sm:p-3" role="group" aria-label="습도">
              <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">습도</p>
                <p className="text-base sm:text-lg font-semibold">{data.main.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-secondary p-2.5 sm:p-3" role="group" aria-label="풍속">
              <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">풍속</p>
                <p className="text-base sm:text-lg font-semibold">
                  {data.wind.speed.toFixed(1)} m/s
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-secondary p-2.5 sm:p-3" role="group" aria-label="가시거리">
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">가시거리</p>
                <p className="text-base sm:text-lg font-semibold">
                  {(data.visibility / 1000).toFixed(1)} km
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

