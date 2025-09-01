'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useConversation } from '@/hooks/useConversation'

const ItemList = ({ children, title, Action, className }) => {
  const { isActive } = useConversation()

  return (
    <Card
      className={cn(
        'h-full w-full lg:w-80 lg:flex-none p-4 flex flex-col',
        {
          'hidden lg:flex': isActive, // hide on large if conversation active
          flex: !isActive,            // show if not active
        },
        className
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {Action && <div>{Action}</div>}
      </div>

      {/* Content */}
      <div className="flex-1 w-full overflow-y-auto space-y-2">
        {children}
      </div>
    </Card>
  )
}

export default ItemList
