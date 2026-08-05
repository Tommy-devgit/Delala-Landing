"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/signin");
  }, [router]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAF8F4] flex items-center justify-center p-4">
      <div className="text-xs font-mono-label text-[#736F4E] animate-pulse">
        Redirecting to Sign In...
      </div>
    </div>
  );
}
