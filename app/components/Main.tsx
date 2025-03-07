"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const Main = ({ children }: { children: React.ReactNode }) => {
  const { toggleSidebar } = useSidebar();
  return (
    <main className="h-screen w-screen overflow-hidden">
      <Button
        variant="default"
        size="icon"
        className="absolute top-2 left-2"
        onClick={toggleSidebar}
      >
        <Menu />
      </Button>
      <div className="h-full w-full overflow-hidden ">{children}</div>
    </main>
  );
};

export default Main;
