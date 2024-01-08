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
  // isBorrowing: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const supabase = createClientComponentClient();
  const [isBorrowing, setIsBorrowing] = useState<Boolean>(false);

  const fetchIsBorrowing = async () => {
    // const response = await fetch(`/api/user/${email}/`)
  };

  return (
    <UserContext.Provider value={{ isBorrowing }}>
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
