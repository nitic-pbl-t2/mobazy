"use client";
import React, { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string(),
  passcode: z.string().min(2, {
    message: "2文字より少ないです。",
  }),
});

type messegeType = {
  message: string;
} | null;

const BorrowForm: FC = () => {
  const router = useRouter();

  const [message, setMessage] = useState<messageType>(null);
  const [textColor, setTextColor] = useState<string>("");

  const email = "inoueyt113@gmail.com";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: email,
      passcode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "以下の内容で貸出申請を送信しました！",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const res = await fetch("/api/borrow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonData = await res.json();

    if (jsonData.status) {
      setMessage(jsonData.message);

      if (jsonData.status == 400) {
        setTextColor("text-red-600");
      } else {
        setTextColor("text-green-400");
        // メッセージを読ませるため、3秒待機しページ遷移
        new Promise((resolve) => {
          setTimeout(() => {
            router.push("/status"); // ページ遷移
            resolve();
          }, 3000);
        });
      }
      console.log(jsonData.status, jsonData.message);
    } else {
      console.log(
        "エラー: 貸出申請をしたものの、サーバーから返答が返ってこない。"
      );
      return null;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
        action="http://localhost:3000/api/borrow"
        method="POST"
      >
        <div className="hidden">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  ステーションのディスプレイ上に表示されている2桁のパスコードを入力してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="passcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passcode</FormLabel>
              <FormControl>
                <Input {...field} placeholder="••••" />
              </FormControl>
              <FormDescription>
                ステーションのディスプレイ上に表示されている2桁のパスコードを入力してください。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {message && <div className={textColor + " font-bold"}>{message}</div>}
        <Button type="submit">借りる</Button>
      </form>
    </Form>
  );
};

export default BorrowForm;
