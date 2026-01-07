"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { CitySelector } from "@/components/weather/CitySelector";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { ForecastCard } from "@/components/weather/ForecastCard";
import { LoadingSkeleton } from "@/components/weather/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fetchCurrentWeatherSimple, fetch5DayForecast } from "@/lib/api/weather-simple";
import { getCityById, DEFAULT_CITY } from "@/lib/constants/cities";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getErrorMessage } from "@/lib/utils/errorHandler";

/**
 * 메인 페이지 - 날씨 정보 서비스
 */
export default function Page() {
  const [selectedCityId, setSelectedCityId, isStorageLoaded] = useLocalStorage(
    "selectedCity",
    DEFAULT_CITY.id
  );
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCity = getCityById(selectedCityId) || DEFAULT_CITY;

  useEffect(() => {
    if (!isStorageLoaded) return;

    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [weatherData, forecastData] = await Promise.all([
          fetchCurrentWeatherSimple(selectedCity.lat, selectedCity.lon),
          fetch5DayForecast(selectedCity.lat, selectedCity.lon),
        ]);

        setCurrentWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedCityId, selectedCity, isStorageLoaded]);

  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Header with selected city */}
      <Header selectedCity={selectedCity.name} />
      
      <div className="container mx-auto p-4 md:p-8 space-y-6">
        {/* 도시 선택 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              <span className="text-blue-600 dark:text-blue-400">Eun Jung</span>'s Weather Forecast
            </h2>
            <p className="text-sm text-muted-foreground">
              지역을 선택하여 날씨를 확인하세요
            </p>
          </div>
          <CitySelector
            selectedCityId={selectedCityId}
            onCityChange={handleCityChange}
          />
        </div>

      {/* 에러 표시 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류 발생</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <p>{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="w-fit"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              다시 시도
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* 로딩 상태 */}
      {isLoading && <LoadingSkeleton />}

      {/* 날씨 데이터 */}
      {!isLoading && !error && currentWeather && forecast && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <CurrentWeatherCard
            data={currentWeather}
            cityName={selectedCity.name}
          />
          <ForecastCard data={forecast} />
        </div>
      )}
      </div>
    </>
  );
}
