import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Messages({
  fromCurrentUser,
  senderImage,
  senderName,
  content,
  seen,
  createdAt,
  lastByUser,
  isGroup,
  type,
}) {
  const initials = senderName ? senderName.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={`flex items-start gap-3 mb-4 ${
        fromCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Left avatar (for other users) */}
      {!fromCurrentUser && (
        <Avatar>
          <AvatarImage src={senderImage} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col max-w-lg">
        {/* Bubble */}
        <div
          className={`rounded-lg px-3 py-2 break-words shadow ${
            fromCurrentUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {isGroup && !fromCurrentUser && (
            <div className="text-xs font-semibold mb-1">{senderName}</div>
          )}

          {/* Text or media */}
          {type === "text" && <div>{content}</div>}
          {type === "image" && (
            <img
              src={content}
              alt="sent image"
              className="rounded-md max-h-60 object-cover"
            />
          )}

          {/* Time */}
          <div className="mt-2 text-xs text-muted-foreground text-right">
            {new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Seen status (only for current user messages) */}
        {fromCurrentUser && seen && (
          <div className="mt-1">{seen}</div>
        )}
      </div>

      {/* Right avatar (for current user) */}
      {fromCurrentUser && (
        <Avatar>
          <AvatarImage src={senderImage} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
