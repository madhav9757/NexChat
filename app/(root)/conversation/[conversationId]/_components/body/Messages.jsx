import React from "react";
import { format } from "date-fns";

const Messages = ({
  fromCurrentUser,
  senderImage,
  senderName,
  lastByUser,
  showTimestamp,
  content,
  createdAt,
  type,
}) => {
  const formatDate = (timestamp) => {
    try {
      return format(new Date(timestamp), "HH:mm");
    } catch {
      return "";
    }
  };

  return (
    <div
      className={`flex items-end gap-2 px-2 ${fromCurrentUser ? "justify-end" : "justify-start"
        }`}
    >
      {!fromCurrentUser && !lastByUser && (
        <img
          src={senderImage}
          alt={`${senderName}'s avatar`}
          loading="lazy"
          className="w-8 h-8 rounded-full self-end"
        />
      )}

      <div
        className={`max-w-[70%] px-3 py-2 text-sm shadow-sm
          ${fromCurrentUser
            ? "bg-blue-500 text-white rounded-2xl"
            : "bg-gray-200 text-gray-900 rounded-2xl"
          }
        `}
      >
        {!fromCurrentUser && !lastByUser && (
          <p className="text-xs font-semibold mb-1">{senderName}</p>
        )}

        {/* Content */}
        {Array.isArray(content) ? (
          <p>{content.join(" ")}</p>
        ) : (
          <p>{content}</p>
        )}

        {/* Only show timestamp if last in group */}
        {showTimestamp && (
          <p
            className={`text-[10px] mt-1 text-right ${fromCurrentUser ? "text-gray-200" : "text-gray-500"
              }`}
          >
            {formatDate(createdAt)}
          </p>
        )}
      </div>
    </div>
  );
};
export default Messages;
