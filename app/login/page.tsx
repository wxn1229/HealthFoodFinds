"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { useState } from "react";

const Login = () => {
  const [tab, setTab] = useState<string>("login");

  return (
    <div className="flex justify-center items-center h-full">
      <Tabs value={tab} onValueChange={setTab} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="login">登入</TabsTrigger>
          <TabsTrigger value="signup">註冊</TabsTrigger>
          <TabsTrigger value="forgot">忘記密碼</TabsTrigger>
        </TabsList>
        <TabsContent
          value="login"
          className="transition-opacity duration-200 ease-in-out"
        >
          <LoginForm setTab={setTab} />
        </TabsContent>
        <TabsContent
          value="signup"
          className="transition-opacity duration-200 ease-in-out"
        >
          <SignupForm />
        </TabsContent>
        <TabsContent
          value="forgot"
          className="transition-opacity duration-200 ease-in-out"
        >
          <ForgotPasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
