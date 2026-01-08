"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { KOREAN_CITIES } from "@/lib/constants/cities";

interface CitySelectorProps {
  selectedCityId: string;
  onCityChange: (cityId: string) => void;
}

/**
 * 도시 선택 컴포넌트
 * 한국 주요 도시를 선택할 수 있는 드롭다운
 */
export function CitySelector({ selectedCityId, onCityChange }: CitySelectorProps) {
  return (
    <Select value={selectedCityId} onValueChange={onCityChange}>
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue placeholder="도시를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        {KOREAN_CITIES.map((city) => (
          <SelectItem key={city.id} value={city.id}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}



