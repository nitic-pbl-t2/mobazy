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
import { useAuth } from "@/Provider/AuthProvider";

const FormSchema = z.object({
  email: z.string(),
  passcode: z
    .string()
    .min(5, {
      message: "5桁の数字を入力してください",
    })
    .max(5, {
      message: "5桁の数字を入力してください",
    }),
});

type requestFormProps = {
  option: "borrow" | "return";
};

const RequestForm: FC<requestFormProps> = ({ option }) => {
  const router = useRouter();

  const [message, setMessage] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string>("");

  const { user } = useAuth();
  const email = user?.email;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: email,
      passcode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: `/api/${option}  | POST`,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const res = await fetch("/api/" + option, {
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
        new Promise<void>((resolve) => {
          setTimeout(() => {
            router.push("/status"); // ページ遷移
            resolve();
          }, 3000);
        });
      }
      console.log(jsonData.status, jsonData.message);
    } else {
      console.log("エラー: サーバーから返答が返ってこない。");
      return null;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                <FormDescription></FormDescription>
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
                <Input {...field} placeholder="•••••" />
              </FormControl>
              <FormDescription>
                ステーションのディスプレイ上に表示されている5桁のパスコードを半角数字で入力してください。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {message && <div className={textColor + " font-bold"}>{message}</div>}
        {option == "borrow" ? (
          <Button type="submit">借りる</Button>
        ) : (
          <Button type="submit">返す</Button>
        )}
      </form>
    </Form>
  );
};

export default RequestForm;
