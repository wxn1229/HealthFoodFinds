import { AxiosResponse } from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API 響應類型
export type UserResponse = AxiosResponse<User>;
export type AuthApiResponse = AxiosResponse<AuthResponse>;

// 後端登入響應的類型
export interface LoginResponse {
  msg: string;
  token: string;
  user_name: string;
  user_id: string; // 或 number，取決於你的 Id 欄位類型
}

// API 錯誤響應類型
export interface ApiError {
  message: string;
}

export type LoginApiResponse = AxiosResponse<LoginResponse>;

// 註冊請求的參數類型
export interface SignupCredentials {
  email: string;
  username: string;
  password: string;
  birthday: string;
  gender: boolean | null;
}

// 註冊成功響應的用戶類型
export interface User {
  Id: string;
  Email: string;
  Name: string;
  Password: string; // 雖然後端會返回，但前端最好不要使用
  Age: number;
  Gender: string;
  // 其他可能的欄位...
}

// 註冊成功的響應類型
export interface SignupResponse {
  result: User;
}

// 註冊錯誤的響應狀態碼對應
export enum SignupErrorStatus {
  UserExists = 406,
  NameExists = 407,
  ServerError = 500,
}

// API 錯誤類型
export interface ApiError {
  status: number;
  message: string;
}

// 用於 Axios 響應類型
export type SignupApiResponse = AxiosResponse<SignupResponse>;

export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}
