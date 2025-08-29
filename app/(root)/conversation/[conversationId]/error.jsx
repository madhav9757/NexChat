'use client'

import React, { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import ConversationFallback from "@/components/shared/conversation/ConversationFallback"

const ErrorPage = (error) => {
  const router = useRouter()

  useEffect(() => {
    router.push("/conversation")
  }, [router, error])

  return (
   <ConversationFallback/>
  )
}

export default ErrorPage
