import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
    const pathname = usePathname();
    const requestsCount = useQuery(api.requests.count);
    const conversations = useQuery(api.conversations.get);

    const unseenMessagesCount = useMemo(()=>{
        return conversations?.reduce((acc, curr) => {
            return acc + curr.unseenCount;
        }, 0);
    }, [conversations])

    const paths = useMemo(
        () => [
            {
                name: "Conversation",
                href: "/conversation",
                icon: <MessageSquare />,
                active: pathname.startsWith('/conversation'),
                count : unseenMessagesCount
            },
            {
                name: "Friends",
                href: "/friends",
                icon: <Users />,
                active: pathname === '/friends',
                count : requestsCount 
            }
        ],
        [pathname, requestsCount, unseenMessagesCount]
    );
    return paths;
};