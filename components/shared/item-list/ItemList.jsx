'use client'

import { Card } from '@/components/ui/card'
import React from 'react'
import { cn } from '@/lib/utils'
import { useConversation } from '@/hooks/useConversation'

const ItemList = ({ children, title, Action }) => {
  const { isActive } = useConversation()
  return (
    <Card
      className={cn(
        'hidden h-full w-full lg:w-80 lg:flex-none p-2',{
            "block" : !isActive,
            "lg:block" : isActive
        }
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
          {title}
        </h1>
        {Action && <div>{Action}</div>}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {children?.length > 0 ? (
          children
        ) : emptyMessage ? (
          <div className="text-sm text-muted-foreground text-center py-8">{emptyMessage}</div>
        ) : null}
      </div>
    </Card>
  )
}

export default ItemList
