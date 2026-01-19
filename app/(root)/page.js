"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <main className="relative min-h-screen w-full bg-[#fafafa] dark:bg-zinc-950 flex items-center justify-center px-4 overflow-hidden">
      {/* Posh Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px] dark:bg-blue-900/20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px] dark:bg-indigo-900/20" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px] z-10"
      >
        {/* Top Branding Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.div
            variants={itemVariants}
            className="mb-4 p-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800"
          >
            <MessageCircle className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome Back
          </motion.h1>
          <motion.p variants={itemVariants} className="text-zinc-500 dark:text-zinc-400 mt-2">
            Your workspace is ready for action.
          </motion.p>
        </div>

        <Card className="border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-blue-500/5 overflow-hidden">
          <CardContent className="p-8">
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "h-10 w-10" } }} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full" />
                </div>
                <div>
                  <p className="text-sm font-medium">Account Active</p>
                  <p className="text-xs text-zinc-500">Premium Member</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-none">
                Online
              </Badge>
            </motion.div>

            <div className="space-y-4">
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-medium">Fast Sync</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium">Encrypted</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/conversation" className="block w-full">
                  <Button className="w-full h-14 rounded-2xl bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-base font-medium transition-all group">
                    Start Chatting
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center gap-6 text-zinc-400 dark:text-zinc-600"
        >
          <div className="flex items-center gap-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5" /> AI Powered
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-800 mt-1.5" />
          <div className="text-xs tracking-tight hover:text-zinc-900 cursor-pointer transition-colors">
            View Updates
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}