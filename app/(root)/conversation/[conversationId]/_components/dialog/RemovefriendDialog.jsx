'use client'

import { api } from '@/convex/_generated/api'
import useMutationState from '@/hooks/useMutationState'
import { ConvexError } from 'convex/values'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

const RemoveFriendDialog = ({ conversationId, open, setOpen }) => {
    const [removeFriend, pending] = useMutationState(api.friend.removeFriend)

    const handleRemove = async () => {
        try {
            await removeFriend({ conversationId })
            toast.success('Friend removed successfully')
            setOpen(false)
        } catch (error) {
            toast.error(
                error instanceof ConvexError ? error.data : 'Unexpected error occurred'
            )
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Remove Friend</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to remove this friend? You will lose the
                        conversation history and won’t be able to chat unless you add them
                        again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleRemove}
                        disabled={pending}
                        className="bg-destructive text-white hover:bg-destructive/90"
                    >
                        {pending ? 'Removing...' : 'Remove'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RemoveFriendDialog
