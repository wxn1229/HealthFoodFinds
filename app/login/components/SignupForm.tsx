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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

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

          <div className="space-y-2">
            <Label htmlFor="start-date">開始日期</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="start-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !signupData.birthday && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {signupData.birthday
                    ? format(new Date(signupData.birthday), "PPP")
                    : "選擇日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    signupData.birthday
                      ? new Date(signupData.birthday)
                      : undefined
                  }
                  onSelect={(date) => {
                    setSignupData({
                      ...signupData,
                      birthday: date ? date.toISOString() : "",
                    });
                  }}
                  initialFocus
                  month={
                    signupData.birthday
                      ? new Date(signupData.birthday)
                      : new Date()
                  }
                  onMonthChange={(month) => {
                    setSignupData({
                      ...signupData,
                      birthday: month.toISOString(),
                    });
                  }}
                  components={{
                    Caption: ({ displayMonth }) => {
                      const years = Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - i
                      );
                      const months = [
                        "一月",
                        "二月",
                        "三月",
                        "四月",
                        "五月",
                        "六月",
                        "七月",
                        "八月",
                        "九月",
                        "十月",
                        "十一月",
                        "十二月",
                      ];

                      return (
                        <div className="flex justify-center gap-1 items-center py-1">
                          <select
                            value={displayMonth.getFullYear()}
                            onChange={(e) => {
                              const newDate = new Date(displayMonth);
                              newDate.setFullYear(
                                Number.parseInt(e.target.value)
                              );
                              setSignupData({
                                ...signupData,
                                birthday: newDate.toISOString(),
                              });
                            }}
                            className="z-10 px-2 py-1 text-sm rounded border border-input bg-background"
                          >
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={displayMonth.getMonth()}
                            onChange={(e) => {
                              const newDate = new Date(displayMonth);
                              newDate.setMonth(Number.parseInt(e.target.value));
                              setSignupData({
                                ...signupData,
                                birthday: newDate.toISOString(),
                              });
                            }}
                            className="z-10 px-2 py-1 text-sm rounded border border-input bg-background"
                          >
                            {months.map((month, index) => (
                              <option key={month} value={index}>
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    },
                  }}
                />
              </PopoverContent>
            </Popover>
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
