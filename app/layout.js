import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import { TooltipProvider } from "@radix-ui/react-tooltip";
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
  title: "NexChat",
  description: "Realtime chat app",
  openGraph: {
    title: "NexChat",
    description: "Realtime chat app with modern UI",
    url: "https://yourdomain.com",
    siteName: "NexChat",
    images: [
      {
        url: "/og-image.png", // replace with your image
        width: 1200,
        height: 630,
        alt: "NexChat preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexChat",
    description: "Realtime chat app with modern UI",
    images: ["/og-image.png"], // replace with your image
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
              <Toaster richColors />
            </AppShell>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
