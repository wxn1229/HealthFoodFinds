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

export const LoginForm: React.FC<{ setTab: (tab: string) => void }> = ({
  setTab,
}) => {
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
          <CardTitle>登入</CardTitle>
          <CardDescription>請輸入您的帳號密碼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">電子郵件</Label>
            <Input
              id="email"
              type="email"
              placeholder="請輸入電子郵件"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">密碼</Label>
            <Input
              id="password"
              type="password"
              placeholder="請輸入密碼"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          {loginError && <p className="text-sm text-red-500">{loginError}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "登入中..." : "登入"}
          </Button>
          <Button
            onClick={() => setTab("forgot")}
            variant="link"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            忘記密碼？
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
