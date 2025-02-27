"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { login, clearLoginError } from "@/lib/store/features/userSlice";
import { useRouter } from "next/navigation";
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
import { useState, useEffect } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearLoginError());
  }, [dispatch]);
  const { loading, errors } = useAppSelector((state) => state.user);

  // 只使用 login 相關的錯誤
  const loginError = errors.login;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(loginData));
    if (login.fulfilled.match(result)) {
      router.push("/");
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleLogin}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          {loginError && (
            <div className="text-red-500 text-sm">{loginError}</div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
