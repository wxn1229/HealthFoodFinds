"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AxiosError } from "axios";
import axios from "@/lib/axios";

interface ErrorResponse {
  message: string;
}

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      await axios.post("/user/forgotPassword", { email });
      setStatus("success");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || "發送重置郵件時發生錯誤");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <Card>
        <CardHeader>
          <CardTitle>忘記密碼</CardTitle>
          <CardDescription>
            請輸入您的電子郵件地址，我們將發送重置密碼的連結給您
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">電子郵件</Label>
            <Input
              id="email"
              type="email"
              placeholder="請輸入您的電子郵件"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {status === "success" && (
            <p className="text-sm text-green-600">
              重置密碼的郵件已發送，請查看您的信箱
            </p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "發送中..." : "發送重置連結"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
