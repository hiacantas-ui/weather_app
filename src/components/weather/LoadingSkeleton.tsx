import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

/**
 * 날씨 데이터 로딩 중 표시할 스켈레톤 UI
 */
export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* 현재 날씨 카드 스켈레톤 */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-gray-200 to-gray-300">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-16 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-32 rounded-lg" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 예보 카드 스켈레톤 */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-9 flex-1 rounded-lg" />
              <Skeleton className="h-9 flex-1 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


