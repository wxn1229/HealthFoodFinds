"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginNoticeModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  const handleClose = () => {};

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>需要登入</DialogTitle>
          <DialogDescription>請先登入帳號以使用此功能</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={handleLogin}>登入帳號</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
