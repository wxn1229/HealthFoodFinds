"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { checkAuth } from "@/lib/store/features/userSlice";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>;
};
