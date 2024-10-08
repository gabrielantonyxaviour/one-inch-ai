import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cookieToInitialState } from "wagmi";
import { config } from "@/styles/wagmi-config";
import AppKitProvider from "@/components/sections/provider";

export const metadata: Metadata = {
  title: "1Inch AI",
  description: "AI powered DeFi tool for Beginners",
  icons: "/logo.png",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <AppKitProvider initialState={initialState}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "h-screen bg-black font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ThemeSwitcher />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AppKitProvider>
  );
}
