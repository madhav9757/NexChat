'use client'

import { Card } from '@/components/ui/card'
import React from 'react'
import { cn } from '@/lib/utils'
import { useConversation } from '@/hooks/useConversation'

const ItemList = ({ children, title, Action, className }) => {
  const { isActive } = useConversation()

  return (
    <Card
      className={cn(
        'h-[calc(100svh-32px)] w-full lg:w-80 lg:flex-none p-2 flex flex-col',
        {
          'hidden lg:flex': isActive,
          'flex': !isActive,
        },
        className // <-- allows custom styles to be passed
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {Action && <div>{Action}</div>}
      </div>

      {/* Content */}
      <div className="w-full h-full flex flex-col items-center justify-start gap-2">
        {children}
      </div>
    </Card>
  )
}
export default ItemList
