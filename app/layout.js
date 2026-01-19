// layout.jsx (server component)
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexChat | Realtime Intelligent Messaging",
  description: "Experience the next generation of collaborative intelligence with NexChat. Fast, secure, and beautiful realtime messaging.",
  keywords: ["chat", "realtime", "ai", "collaboration", "nextjs", "convex"],
  authors: [{ name: "Keshav" }],
  openGraph: {
    title: "NexChat | Realtime Intelligent Messaging",
    description: "Fast, secure, and beautiful realtime messaging for the modern web.",
    url: "https://nex-chat.vercel.app",
    siteName: "NexChat",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexChat preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexChat",
    description: "Fast, secure, and beautiful realtime messaging.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <AppShell>
              {children}
              <Toaster richColors position="top-right" />
            </AppShell>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
