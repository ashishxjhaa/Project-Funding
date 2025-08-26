"use client";

import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { usePathname } from "next/navigation";

export default function TopLoader() {
    const ref = useRef<LoadingBarRef>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (ref.current) {
            ref.current.continuousStart();
            ref.current.complete();
        }
    }, [pathname]);

  return (
    <LoadingBar
      color="#3b82f6"
      height={4}
      shadow={true}
      ref={ref}
      style={{ zIndex: 9999 }}
    />
  );
}
