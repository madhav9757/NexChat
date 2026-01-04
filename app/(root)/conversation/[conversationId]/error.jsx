'use client'

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ShieldCheck, Loader2 } from "lucide-react"

const ErrorPage = ({ error }) => {
  const router = useRouter()

  useEffect(() => {
    // We give the user 2 seconds to see the "Healing" state 
    // This feels more intentional than an instant, jarring jump
    const timeout = setTimeout(() => {
      router.push("/conversation")
    }, 2000)

    return () => clearTimeout(timeout)
  }, [router, error])

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        {/* --- VISUAL HEALING INDICATOR --- */}
        <div className="relative">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-full border border-dashed border-blue-500/30"
          />
          <div className="h-16 w-16 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center relative z-10">
            <ShieldCheck className="h-8 w-8 text-blue-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* --- TEXTUAL FEEDBACK --- */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 italic">
            Redirecting Safely
          </h2>
          <div className="flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            <p className="text-xs font-medium uppercase tracking-[0.2em]">
              Returning to vault
            </p>
          </div>
        </div>
      </motion.div>

      {/* Subtle Grain Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}

export default ErrorPage