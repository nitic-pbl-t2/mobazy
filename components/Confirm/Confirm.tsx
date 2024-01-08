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
import RequestForm from "@/components/RequestForm/RequestForm";

type ConfirmProps = {
  option: "borrow" | "return";
};

const Confirm: FC<ConfirmProps> = ({ option }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {option == "borrow" ? <Button>借りる</Button> : <Button>返す</Button>}
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogHeader>
          {option == "borrow" ? (
            <DialogTitle>本当にバッテリーを借りますか？</DialogTitle>
          ) : (
            <DialogTitle>本当にバッテリーを返しますか？</DialogTitle>
          )}
        </DialogHeader>
        {/* form は長いのでコンポーネント化する */}
        {option == "borrow" ? (
          <RequestForm option={"borrow"} />
        ) : (
          <RequestForm option={"return"} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Confirm;
