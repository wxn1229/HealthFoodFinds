import type { Metadata } from "next";
import { Nunito, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Providers } from "@/lib/store/provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";
import { AuthProvider } from "./providers/AuthProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const notoTC = Noto_Sans_TC({
  variable: "--font-noto-tc",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health Food Finds",
  description: "Find the best health food for your body",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-hidden">
      <body className={` ${notoTC.variable} ${nunito.variable}  antialiased`}>
        <Providers>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <main className="h-screen w-screen overflow-hidden">
                  <div className="h-full w-full overflow-hidden ">
                    {children}
                  </div>
                </main>
              </SidebarProvider>
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
