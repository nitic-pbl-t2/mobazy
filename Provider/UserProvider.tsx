"use client";
// import { getURL } from "@/util/getUrl";
// import { PrismaClient } from "@prisma/client";
import { Data } from "@react-google-maps/api";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  isBatteryBorrowed: boolean;
  borrowedAt: Date | null;
  fetchUserData: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const supabase = createClientComponentClient();
  const [isBatteryBorrowed, setIsBatteryBorrowed] = useState<boolean>(false);
  const [borrowedAt, setBorrowedAt] = useState<Date | null>(null);

  const fetchUserData = async () => {
    const { data: userData, error } = await supabase.auth.getUser();

    if (userData.user) {
      const res = await fetch("/api/getUserdata/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gmail: userData.user.email }),
      });
      if (res && res.ok) {
        const data = await res.json();
        console.log(data);
        setIsBatteryBorrowed(data.isBatteryBorrowed);
        setBorrowedAt(data.borrowedAt);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{ borrowedAt, isBatteryBorrowed, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
}
