import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 스크린 리더에서만 읽히는 숨겨진 텍스트
 * 접근성 향상을 위한 컴포넌트
 */
export function VisuallyHidden({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}


