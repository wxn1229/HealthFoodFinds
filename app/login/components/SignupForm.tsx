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
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { SignupCredentials } from "@/lib/types/api";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  signup,
  setError,
  clearSignupError,
} from "@/lib/store/features/userSlice";

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
          <CardTitle>Signup</CardTitle>
          <CardDescription>Create an account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              placeholder="Username"
              value={signupData.username}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
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
                <SelectValue placeholder="選擇性別" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">女生</SelectItem>
                <SelectItem value="false">男生</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>生日</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !signupData.birthday && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {signupData.birthday ? (
                    format(new Date(signupData.birthday), "PPP")
                  ) : (
                    <span>選擇生日</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start"
                side="top"
                sideOffset={4}
              >
                <Calendar
                  mode="single"
                  selected={
                    signupData.birthday
                      ? new Date(signupData.birthday)
                      : undefined
                  }
                  onSelect={(date) =>
                    setSignupData((prev) => ({
                      ...prev,
                      birthday: date ? date.toISOString() : "",
                    }))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {signupError && <p className="text-red-500">{signupError}</p>}
        </CardContent>
        <CardFooter>
          {loading ? (
            <Button type="submit" className="w-full" disabled>
              Signup
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Signup
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};
