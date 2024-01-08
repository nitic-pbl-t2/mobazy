"use client";
import { useAuth } from "@/Provider/AuthProvider";
import { Payment, columns } from "@/components/DataTable/Columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { User } from "@supabase/auth-helpers-nextjs";
import { FC, useEffect, useState } from "react";

// const sampleData = {
//   status: "borrowing",
//   stationName: "茨城高専",
//   port: 1,
//   borrowedAt: "2024-01-08T12:00:00",
//   returnedAt: "2024-01-08T14:00:00",
//   usageTime: "120",
// };

const convertToDisplayFormat = (userHistories: Payment[]): Payment[] => {
  return userHistories.map((history) => ({
    ...history,
    status: history.status === "borrowing" ? "貸出中" : "返却済",
    borrowedAt: new Date(history.borrowedAt).toLocaleString(),
    returnedAt:
      history.returnedAt !== null
        ? new Date(history.returnedAt).toLocaleString()
        : "",
  }));
};

const Status: FC = () => {
  const [userHistories, setUserHistories] = useState<Payment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        const response = await fetch(`/api/user/${user.email}/history`);
        const responseData = await response.json();
        setUserHistories(responseData.userHistories);
      } else {
        console.log(
          "貸出状況確認ページ内部で、正しくユーザを取得できていません。"
        );
      }
    };

    fetchHistory();
    console.log("貸出履歴を取得するAPIを叩きました");
  }, [user]);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={convertToDisplayFormat(userHistories)}
      />
    </div>
  );
};

export default Status;
