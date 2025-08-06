import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useConversation = () => {
    const params = useParams();

    const consversationId = useMemo(() => params?.consversationId || "", [params?.consversationId]);

    const isActive = useMemo(() => !!consversationId, [consversationId]);

    return
        isActive,
        consversationId;
}