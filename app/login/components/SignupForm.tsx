"use client";

import { useState, useEffect } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { SignupCredentials } from "@/lib/types/api";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  signup,
  setError,
  clearSignupError,
} from "@/lib/store/features/userSlice";
import React from "react";
import BirthdaySelect from "@/app/login/components/BirthdaySelect";

export const SignupForm = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearSignupError());
  }, [dispatch]);

  const { loading, errors } = useAppSelector((state) => state.user);
  const router = useRouter();

  const [signupData, setSignupData] = useState<SignupCredentials>({
    email: "",
    username: "",
    password: "",
    birthday: "",
    gender: null,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  // 只使用 signup 相關的錯誤
  const signupError = errors.signup;

  const [dateInputs, setDateInputs] = useState({
    year: new Date().getFullYear(),
    month: 1,
    day: 1,
  });

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== confirmPassword) {
      dispatch(setError({ type: "signup", message: "Passwords do not match" }));
      return;
    }

    const result = await dispatch(signup(signupData));

    if (signup.fulfilled.match(result)) {
      // 註冊成功，可以導航到其他頁面
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <Card>
        <CardHeader>
          <CardTitle>註冊</CardTitle>
          <CardDescription>創建新帳號</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1">
            <Label htmlFor="username">用戶名稱</Label>
            <Input
              id="username"
              placeholder="請輸入用戶名稱"
              value={signupData.username}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">電子郵件</Label>
            <Input
              id="email"
              type="email"
              placeholder="請輸入電子郵件"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">密碼</Label>
            <Input
              id="password"
              type="password"
              placeholder="請輸入密碼"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">確認密碼</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="請再次輸入密碼"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="gender">性別</Label>
            <Select
              value={signupData.gender?.toString()}
              onValueChange={(value) => {
                setSignupData((prev) => ({
                  ...prev,
                  gender: value === "true",
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="請選擇性別" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">女生</SelectItem>
                <SelectItem value="false">男生</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <BirthdaySelect
              dateInputs={dateInputs}
              onDateChange={(date) => {
                setDateInputs({
                  year: date.getFullYear(),
                  month: date.getMonth() + 1,
                  day: date.getDate(),
                });
              }}
            />
          </div>
          {signupError && <p className="text-sm text-red-500">{signupError}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "註冊中..." : "註冊"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
