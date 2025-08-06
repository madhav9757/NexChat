import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexChat",
  description: "Realtime chat app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppShell>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </AppShell>
      </body>
    </html>
  );
}
