'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@radix-ui/react-tooltip'
import { useNavigation } from '@/hooks/useNavigation'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

const DesktopNav = () => {
    const paths = useNavigation()

    return (
        <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4 shadow-md">
            <nav className="w-full">
                <ul className="flex flex-col items-center gap-4">
                    {paths.map(({ href, icon, name, active }, index) => (
                        <li key={index} className="relative">
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <Link href={href} aria-label={name}>
                                        <Button
                                            size="icon"
                                            variant={active ? 'default' : 'ghost'}
                                            className="w-10 h-10"
                                        >
                                            {icon}
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    className={cn(
                                        "bg-purple-500 text-white rounded-md px-3 py-1.5 text-sm shadow-lg",
                                        "animate-fade-in"
                                    )}
                                    sideOffset={8}
                                >
                                    {name}
                                </TooltipContent>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex flex-col items-center gap-4">
                <UserButton />
            </div>
        </Card>
    )
}

export default DesktopNav
