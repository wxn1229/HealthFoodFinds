import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { SignupErrorStatus } from "@/lib/types/api";
import type {
  LoginCredentials,
  LoginResponse,
  LoginApiResponse,
  SignupCredentials,
  SignupResponse,
  SignupApiResponse,
} from "@/lib/types/api";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user_id: string | null; // 匹配後端返回的 user_id
  user_name: string | null; // 匹配後端返回的 user_name
  isAuthenticated: boolean;
  loading: boolean;
  errors: {
    login: string | null;
    signup: string | null;
  };
  isAdmin: boolean;
}

interface SetErrorPayload {
  type: keyof UserState["errors"];
  message: string;
}

const initialState: UserState = {
  user_id: null,
  user_name: null,
  isAuthenticated: false,
  loading: false,
  errors: {
    login: null,
    signup: null,
  },
  isAdmin: false,
};

export const login = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const response: LoginApiResponse = await axios.post(
      "/user/login",
      credentials
    );

    // 儲存 token
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // 根據後端的錯誤響應處理不同的錯誤情況
    if (axiosError.response?.status === 405) {
      return rejectWithValue("User does not exist");
    } else if (axiosError.response?.status === 401) {
      return rejectWithValue("Incorrect password");
    } else {
      return rejectWithValue("Server error");
    }
  }
});

export const signup = createAsyncThunk<
  SignupResponse,
  SignupCredentials,
  { rejectValue: string }
>("user/signup", async (credentials, { rejectWithValue }) => {
  try {
    const response: SignupApiResponse = await axios.post(
      "/user/signup",
      credentials
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // 根據不同的錯誤狀態返回對應的錯誤信息
    switch (axiosError.response?.status) {
      case SignupErrorStatus.UserExists:
        return rejectWithValue("User already exists");
      case SignupErrorStatus.NameExists:
        return rejectWithValue("Username already exists");
      case SignupErrorStatus.ServerError:
        return rejectWithValue("Server error occurred");
      default:
        return rejectWithValue("Signup failed");
    }
  }
});

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.get("/user/verifyToken");
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.log("🚀 ~ error:", axiosError);
      localStorage.removeItem("token");
      return rejectWithValue("Invalid token");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user_id = null;
      state.user_name = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      localStorage.removeItem("token");
    },
    setError: (state, action: PayloadAction<SetErrorPayload>) => {
      const { type, message } = action.payload;
      if (type) {
        state.errors[type] = message;
      }
    },
    clearLoginError: (state) => {
      state.errors.login = null;
    },
    clearSignupError: (state) => {
      state.errors.signup = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errors.login = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user_id = action.payload.user_id;
        state.user_name = action.payload.user_name;
        state.isAuthenticated = true;
        state.errors.login = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors.login = action.payload || "Login failed";
        state.isAuthenticated = false;
        state.isAdmin = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.errors.signup = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user_id = action.payload.result.Id;
        state.user_name = action.payload.result.Name;
        state.isAuthenticated = true;
        state.errors.signup = null;
        state.isAdmin = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.errors.signup = action.payload || "Signup failed";
        state.isAuthenticated = false;
        state.isAdmin = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user_id = action.payload.user_id;
        state.user_name = action.payload.user_name;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user_id = null;
        state.user_name = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      });
  },
});

export const { logout, clearLoginError, clearSignupError, setError } =
  userSlice.actions;
export default userSlice.reducer;
