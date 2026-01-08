"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { AlertCircle, RefreshCw } from "lucide-react";

/**
 * Error Boundary
 * 애플리케이션에서 발생하는 런타임 에러를 처리합니다.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (프로덕션 환경에서는 외부 서비스로 전송)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류가 발생했습니다</AlertTitle>
          <AlertDescription>
            {error.message || "예상치 못한 오류가 발생했습니다."}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-2 text-center">
          <Button onClick={reset} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            다시 시도
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="w-full"
          >
            페이지 새로고침
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && error.stack && (
          <details className="mt-4 rounded-lg border bg-muted p-4">
            <summary className="cursor-pointer text-sm font-medium">
              개발자 정보 (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto text-xs">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}



