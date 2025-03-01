"use client";

import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "./components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">無效的重置連結</h1>
          <p className="mt-2 text-gray-600">
            此密碼重置連結無效或已過期，請重新申請重置密碼。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex h-screen items-center justify-center">
      <ResetPasswordForm token={token} />
    </div>
  );
}
