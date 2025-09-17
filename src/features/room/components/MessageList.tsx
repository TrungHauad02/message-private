import { useEffect, useRef } from "react";
import { useChatStore } from "../../../stores/chatStores";
import { socketService } from "../../../services/socketService";
import { getUserColor } from "../../../utils";

export default function MessageList() {
  const { messages, addMessage, user } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketService.off("new-message");

    socketService.on("new-message", (message) => {
      console.log("New message received:", message);
      addMessage(message);
    });
  }, [addMessage]);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const isMyMessage = (messageUser: string) => {
    return messageUser === user;
  };

  return (
    <div className="message-list-container">
      <div className="messages-wrapper">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMine = isMyMessage(msg.username);
            const prevMessage = index > 0 ? messages[index - 1] : null;
            const showAvatar =
              !prevMessage || prevMessage.username !== msg.username;
            const userColor = getUserColor(msg.username);

            return (
              <div
                key={`${msg.id || index}-${msg.timestamp}`}
                className={`message-row ${isMine ? "mine" : "theirs"}`}
              >
                <div className="message-group">
                  {!isMine && (
                    <div className="avatar-column">
                      {showAvatar && (
                        <div
                          className="message-avatar"
                          style={{ backgroundColor: userColor }}
                        >
                          {msg.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="content-column">
                    {!isMine && showAvatar && (
                      <div
                        className="message-sender"
                        style={{ color: userColor }}
                      >
                        {msg.username}
                      </div>
                    )}

                    <div
                      className={`message-bubble ${
                        isMine ? "my-bubble" : "their-bubble"
                      }`}
                      style={isMine ? {} : { borderLeftColor: userColor }}
                    >
                      <div className="message-text">{msg.message}</div>
                      <div className="message-time">
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <style jsx>{`
        .message-list-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f8fafc;
          overflow: hidden;
        }

        .messages-wrapper {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #64748b;
          text-align: center;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state p {
          font-size: 16px;
          margin: 0;
        }

        .message-row {
          display: flex;
          width: 100%;
          margin-bottom: 8px;
        }

        .message-row.mine {
          justify-content: flex-end;
        }

        .message-row.theirs {
          justify-content: flex-start;
        }

        .message-group {
          display: flex;
          align-items: flex-end;
          max-width: 75%;
          gap: 8px;
        }

        .mine .message-group {
          flex-direction: row-reverse;
        }

        .theirs .message-group {
          flex-direction: row;
        }

        .avatar-column {
          display: flex;
          flex-direction: column;
          width: 36px;
          align-items: center;
        }

        .message-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .content-column {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }

        .mine .content-column {
          align-items: flex-end;
        }

        .theirs .content-column {
          align-items: flex-start;
        }

        .message-sender {
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 4px;
          margin-left: 4px;
        }

        .message-bubble {
          position: relative;
          border-radius: 16px;
          max-width: 100%;
          word-wrap: break-word;
          word-break: break-word;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .my-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-bottom-right-radius: 6px;
        }

        .their-bubble {
          background: white;
          color: #1e293b;
          border: 1px solid #e2e8f0;
          border-left: 3px solid #e2e8f0;
          border-bottom-left-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .message-text {
          padding: 12px 16px 8px 16px;
          line-height: 1.4;
          font-size: 14px;
        }

        .message-time {
          padding: 0 16px 8px 16px;
          font-size: 11px;
          opacity: 0.7;
          text-align: right;
        }

        .their-bubble .message-time {
          color: #64748b;
          text-align: left;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .messages-wrapper {
            padding: 12px;
          }

          .message-group {
            max-width: 85%;
          }

          .message-avatar {
            width: 32px;
            height: 32px;
            font-size: 13px;
          }

          .avatar-column {
            width: 32px;
          }

          .message-text {
            padding: 10px 14px 6px 14px;
            font-size: 13px;
          }

          .message-time {
            padding: 0 14px 6px 14px;
          }
        }

        @media (max-width: 480px) {
          .messages-wrapper {
            padding: 8px;
          }

          .message-group {
            max-width: 90%;
          }

          .message-text {
            padding: 8px 12px 4px 12px;
          }

          .message-time {
            padding: 0 12px 6px 12px;
          }
        }

        /* Scoped scrollbar only for this component */
        .messages-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .messages-wrapper::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-wrapper::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .messages-wrapper::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Firefox scrollbar */
        .messages-wrapper {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
      `}</style>
    </div>
  );
}
