"use client";
import ItemDetail from "@/app/healthfood/[id]/components/ItemDetail";
import LoginNoticeModal from "@/components/LoginNoticeModal";
import { useState } from "react";
import { useParams } from "next/navigation";
const HealthFood = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  return (
    <div className="w-full h-full ">
      <ItemDetail id={id as string} setIsOpen={setIsOpen} />
      <LoginNoticeModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};

export default HealthFood;
