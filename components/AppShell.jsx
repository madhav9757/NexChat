"use client";

import ConvexClientProvider from "@/provider/ConvexClientProvider";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import LoadingLogo from "@/components/shared/LoadingLogo";
import { motion } from "framer-motion";
import { LayoutDashboard, LockKeyhole, Sparkles, UserPlus, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppShell({ children }) {
  return (
    <ConvexClientProvider>
      <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 text-zinc-900 dark:text-zinc-100">
        
        {/* --- LOADING STATE --- */}
        <AuthLoading>
          <div className="flex items-center justify-center min-h-screen">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <LoadingLogo />
            </motion.div>
          </div>
        </AuthLoading>

        {/* --- AUTHENTICATED STATE --- */}
        <Authenticated>
          {children}
        </Authenticated>

        {/* --- UNAUTHENTICATED STATE --- */}
        <Unauthenticated>
          <main className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
            
            {/* Subtle Posh Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-blue-50/40 to-transparent dark:from-blue-950/10 pointer-events-none" />
            
            {/* The Dot Grid Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[420px] z-10"
            >
              {/* Branding Section */}
              <div className="flex flex-col items-center mb-10 text-center">
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="mb-6 p-4 bg-white dark:bg-zinc-900 rounded-[1.5rem] shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800"
                >
                  <LayoutDashboard className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                </motion.div>
                
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-zinc-50 dark:to-zinc-500">
                  Nexus AI
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-sm font-medium">
                  The future of collaborative intelligence.
                </p>
              </div>

              {/* Login/Signup Actions */}
              <div className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-500/5">
                <div className="space-y-4">
                  <SignInButton mode="modal">
                    <Button className="w-full h-14 rounded-2xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold shadow-lg shadow-zinc-300 dark:shadow-none transition-all flex items-center justify-center gap-2 group">
                      <LockKeyhole className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={2} />
                      Sign In to Nexus
                    </Button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold transition-all flex items-center justify-center gap-2">
                      <UserPlus className="w-4 h-4" strokeWidth={2} />
                      Join the Beta
                    </Button>
                  </SignUpButton>
                </div>

                {/* Micro-features list */}
                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Global</span>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Secure</span>
                  </div>
                </div>
              </div>

              {/* Legal/Footer */}
              <div className="mt-8 flex justify-center items-center gap-4 text-[12px] text-zinc-400">
                <span className="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors font-medium">Privacy</span>
                <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <span className="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors font-medium">Terms</span>
                <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <span className="font-mono text-[10px]">VER_0.4.2</span>
              </div>
            </motion.div>
          </main>
        </Unauthenticated>

      </div>
    </ConvexClientProvider>
  );
}