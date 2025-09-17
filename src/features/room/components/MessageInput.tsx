import { useState } from "react";
import { useChatStore } from "../../../stores/chatStores";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function MessageInput() {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const { user, room, sendMessage } = useChatStore();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !roomId || !user) return;

    if (message.length > 500) {
      toast.error("Message is too long. Maximum length is 500 characters.");
      return;
    }

    console.log("Sending message:", {
      roomId: roomId,
      userName: user,
      message,
    });
    sendMessage(message, roomId, user);

    // Clear input
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const isDisabled = !room || !user;

  return (
    <div className="message-input-container">
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            isDisabled ? "Join a room to send messages" : "Type a message..."
          }
          disabled={isDisabled}
          className="message-input"
        />
        <button
          type="submit"
          disabled={!message.trim() || isDisabled}
          className="send-button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </form>

      <style jsx>{`
        .message-input-container {
          padding: 16px;
          background: white;
          border-top: 1px solid #e2e8f0;
        }

        .message-form {
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 100%;
        }

        .message-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 25px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          background: #f8fafc;
        }

        .message-input:focus {
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .message-input:disabled {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .message-input::placeholder {
          color: #94a3b8;
        }

        .send-button {
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .send-button:hover:not(:disabled) {
          background: #2563eb;
          transform: scale(1.05);
        }

        .send-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .send-button:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
          transform: none;
        }

        .send-button svg {
          transition: transform 0.2s ease;
        }

        .send-button:hover:not(:disabled) svg {
          transform: translateX(1px);
        }
      `}</style>
    </div>
  );
}
