"use client";

import { useUser } from "@/src/context/user.provider";
import { handleGoogleAuthSuccess } from "@/src/services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading } = useUser();

  useEffect(() => {
    const handleAuth = async () => {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");

      if (accessToken && refreshToken) {
        const result = await handleGoogleAuthSuccess(accessToken, refreshToken);
        if (result.success) {
          setIsLoading(true);
          router.push("/");
        } else {
          router.push("/login?error=auth_failed");
        }
      }
    };

    handleAuth();
  }, [searchParams, router, setIsLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Completing authentication...</h1>
        <p>Please wait while we redirect you.</p>
      </div>
    </div>
  );
}
