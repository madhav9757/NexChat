// Import avatar, card, or other Shadcn primitives as needed
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Messages({
  fromCurrentUser,
  senderImage,
  senderName,
  content,
  seen ,
  createdAt,
  lastByUser,
  isGroup,
  type,
}) {
  return (
    <div
      className={`flex items-start gap-3 mb-4 ${fromCurrentUser ? "justify-end" : "justify-start"
        }`}
    >
      {!fromCurrentUser && (
        <Avatar>
          <AvatarImage src={senderImage} />
          <AvatarFallback>{senderName?.toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`rounded-lg px-3 py-2 max-w-lg break-words shadow ${fromCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
          }`}
      >
        {isGroup && !fromCurrentUser && (
          <div className="text-xs font-semibold mb-1">{senderName}</div>
        )}
        <div>{content}</div>
        <div className="mt-2 text-xs text-muted-foreground text-right">
          {new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        {seen}
      </div>
      {fromCurrentUser && (
        <Avatar>
          <AvatarImage src={senderImage} />
          <AvatarFallback>{senderName?.toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
