"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  status: string;

  stationName: string;
  port: number;

  borrowedAt: string;
  returnedAt: string | null;
  usageTime: string | null;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "貸出状況",
  },
  {
    accessorKey: "stationName",
    header: "ステーション",
  },
  {
    accessorKey: "port",
    header: "ポート",
  },
  {
    accessorKey: "borrowedAt",
    header: "借りた時間",
  },
  {
    accessorKey: "returnedAt",
    header: "返した時間",
  },
  {
    accessorKey: "usageTime",
    header: "利用時間",
  },
];
