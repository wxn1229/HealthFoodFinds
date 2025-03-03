"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChevronUp, User2, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import ThemeToggle from "@/components/ThemeToggle";

export function AppSidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { toggleSidebar, state } = useSidebar();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bold text-xl ">
            {state === "collapsed" ? "HF" : "Health Food Finds"}
          </Link>
          {state === "expanded" && (
            <Button variant="ghost" onClick={toggleSidebar}>
              <PanelLeftClose />
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        {state === "collapsed" && (
          <Button variant="ghost" onClick={toggleSidebar}>
            <PanelLeftOpen />
          </Button>
        )}
        <ThemeToggle />

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {user.isAuthenticated ? (
                    <>
                      <User2 /> {user.user_name}
                      <ChevronUp className="ml-auto" />
                    </>
                  ) : (
                    <>
                      <User2 /> 會員
                      <ChevronUp className="ml-auto" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-[--radix-popper-anchor-width]"
              >
                {!user.isAuthenticated && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.isAuthenticated && (
                  <>
                    <DropdownMenuItem onClick={handleLogout}>
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
