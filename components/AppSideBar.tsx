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
            <Button variant="outline" onClick={toggleSidebar}>
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
          <Button variant="outline" onClick={toggleSidebar}>
            <PanelLeftOpen />
          </Button>
        )}

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
                      <User2 /> Username
                      <ChevronUp className="ml-auto" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
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
                    <DropdownMenuItem>
                      <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Billing</span>
                    </DropdownMenuItem>
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
