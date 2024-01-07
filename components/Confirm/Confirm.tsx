import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BorrowForm from "@/components/BorrowForm/BorrowForm";

const Confirm: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>借りる</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogTitle>本当にバッテリーを借りますか？</DialogTitle>
        </DialogHeader>
        {/* form は長いのでコンポーネント化する */}
        <BorrowForm />
      </DialogContent>
    </Dialog>
  );
};

export default Confirm;
