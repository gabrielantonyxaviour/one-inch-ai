"use client";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Layout from "@/components/sections/layout";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/config";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body
            className={cn(
              "h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Layout>
                {children}
                <ThemeSwitcher />
                <Toaster />
              </Layout>
            </ThemeProvider>
          </body>
        </html>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
