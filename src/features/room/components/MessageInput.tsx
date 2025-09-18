import { useState } from "react";
import { useChatStore } from "../../../stores/chatStores";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function MessageInput() {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { user, room, sendMessage } = useChatStore();

  const emojis = [
    // Smileys & Emotion
    "😊",
    "😂",
    "🤣",
    "😅",
    "😆",
    "😉",
    "😋",
    "😎",
    "🤩",
    "🥳",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😚",
    "😙",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤐",
    "🙂",
    "😐",
    "😑",
    "😶",
    "😌",
    "😇",
    "🤤",
    "😴",
    "😪",
    "🥺",
    "😥",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😵",
    "😵‍💫",
    "🤓",
    "🧐",
    "😛",

    // Gestures & People
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👏",
    "🙌",
    "🤝",
    "👐",
    "🤲",
    "🙏",
    "✍️",
    "💪",
    "🦾",
    "🦿",
    "🦵",

    // Hearts & Love
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "♥️",

    // Celebrations & Objects
    "🎉",
    "🎊",
    "🎈",
    "🎁",
    "🎀",
    "🎂",
    "🍰",
    "🧁",
    "🥳",
    "🎯",
    "🎪",
    "🎭",
    "🎨",
    "🎬",
    "🎤",
    "🎵",
    "🎶",
    "🎼",
    "🎹",
    "🥁",

    // Nature & Weather
    "🌟",
    "⭐",
    "🌠",
    "💫",
    "✨",
    "🌞",
    "🌝",
    "🌛",
    "🌜",
    "🌚",
    "🌕",
    "🌖",
    "🌗",
    "🌘",
    "🌑",
    "🌒",
    "🌓",
    "🌔",
    "☀️",
    "🌤️",
    "⛅",
    "🌦️",
    "🌧️",
    "⛈️",
    "🌩️",
    "🌨️",
    "❄️",
    "☃️",
    "⛄",
    "🌈",
    "🔥",
    "💧",
    "🌊",
    "⚡",
    "🌸",
    "💐",
    "🌹",
    "🌺",
    "🌻",
    "🌷",

    // Animals
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🙈",
    "🙉",
    "🙊",
    "🐒",
    "🦆",
    "🐧",
    "🐦",
    "🐤",
    "🐣",
    "🐥",
    "🦅",
    "🦉",
    "🦇",
    "🐺",
    "🐗",

    // Food & Drink
    "🍎",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🫐",
    "🍈",
    "🍒",
    "🥭",
    "🍑",
    "🍍",
    "🥥",
    "🥝",
    "🍅",
    "🍆",
    "🥑",
    "🥦",
    "🥒",
    "🌽",
    "🥕",
    "🫒",
    "🥬",
    "🥒",
    "🌶️",
    "🫑",
    "🧄",
    "🧅",
    "🥔",
    "🍞",
    "🥖",
    "🫓",
    "🥨",
    "🥯",
    "🧀",
    "🥚",
    "🍳",
    "🧈",
    "🥞",
    "🧇",
    "🥓",
    "🍗",
    "🍖",
    "🌭",
    "🍔",
    "🍟",
    "🍕",
    "🥙",
    "🌮",

    // Activities & Sports
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🥏",
    "🎱",
    "🏓",
    "🏸",
    "🏒",
    "🏑",
    "🥍",
    "🏏",
    "🥅",
    "⛳",
    "🪃",
    "🥊",
    "🥋",
    "🎽",
    "🛹",
    "🛼",
    "🛴",
    "🚴",
    "🏆",
    "🥇",
    "🥈",
    "🥉",

    // Symbols & Misc
    "💯",
    "💢",
    "💥",
    "💫",
    "💦",
    "💨",
    "🕳️",
    "💬",
    "👁️‍🗨️",
    "🗨️",
    "🗯️",
    "💭",
    "💤",
    "📢",
    "📣",
    "📯",
    "🔔",
    "🔕",
    "🎵",
    "🎶",
  ];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

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
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const isDisabled = !room || !user;

  return (
    <div className="message-input-container">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <>
          <div
            className="emoji-backdrop"
            onClick={() => setShowEmojiPicker(false)}
          />
          <div className="emoji-picker">
            <div className="emoji-header">
              <span>Choose an emoji</span>
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="emoji-close"
              >
                ×
              </button>
            </div>
            <div className="emoji-grid">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="emoji-button"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSendMessage} className="message-form">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          disabled={isDisabled}
          className="emoji-trigger-button"
          title="Add emoji"
        >
          😊
        </button>

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
          position: relative;
          box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .message-form {
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 100%;
        }

        .emoji-trigger-button {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: #f8fafc;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .emoji-trigger-button:hover:not(:disabled) {
          background: #e2e8f0;
          transform: scale(1.05);
        }

        .emoji-trigger-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
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

        /* Emoji Picker Styles */
        .emoji-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: transparent;
          z-index: 999;
        }

        .emoji-picker {
          position: absolute;
          bottom: 70px;
          left: 16px;
          width: 350px;
          max-height: 320px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          border: 1px solid #e2e8f0;
          z-index: 1000;
          animation: emojiPickerSlide 0.2s ease-out;
        }

        @keyframes emojiPickerSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .emoji-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .emoji-close {
          background: none;
          border: none;
          font-size: 20px;
          color: #64748b;
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s ease;
        }

        .emoji-close:hover {
          background: #f1f5f9;
        }

        .emoji-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 4px;
          padding: 12px;
          max-height: 240px;
          overflow-y: auto;
        }

        .emoji-button {
          width: 24px;
          height: 24px;
          border: none;
          background: none;
          font-size: 16px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .emoji-button:hover {
          background: #f1f5f9;
          transform: scale(1.2);
        }

        /* Mobile responsive */
        @media (max-width: 480px) {
          .emoji-picker {
            width: calc(100vw - 32px);
            left: 16px;
            right: 16px;
          }
        }

        /* Custom scrollbar for emoji grid */
        .emoji-grid::-webkit-scrollbar {
          width: 6px;
        }

        .emoji-grid::-webkit-scrollbar-track {
          background: transparent;
        }

        .emoji-grid::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
