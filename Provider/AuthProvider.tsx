"use client";
import {
  Session,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { createContext, useContext, useState, ReactNode } from "react";

// export const getURL = () => {
//   let url =
//     process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
//     process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
//     "http://localhost:3000/";
//   // Make sure to include `https://` when not localhost.
//   url = url.includes("http") ? url : `https://${url}`;
//   // Make sure to include a trailing `/`.
//   url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
//   url = url + "auth/callback";
//   return url;
// };

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
  fetchUser: () => void;
  isLogged: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  // const redirectUrl = getURL();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const login = async () => {
    console.log("ログイン処理を開始します...");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // redirectTo: redirectUrl,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("ログアウトに失敗しました。");
    } else {
      console.log("ログアウトしました");
      setUser(null);
    }
    window.location.reload();
  };

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    const isLogged: boolean = data.session !== null;
    setIsLogged(data.session !== null);

    if (isLogged) {
      console.log("sessionがあるので、userを取得します。");
      const { data: userData, error } = await supabase.auth.getUser();

      if (error) {
        console.error(
          "supabaseの認証済みユーザーリストからユーザーの取得に失敗しました。"
        );
      } else {
        setUser(userData.user);
      }
    } else {
      console.log("session ないので、user取得するのやめます。");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUser, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
