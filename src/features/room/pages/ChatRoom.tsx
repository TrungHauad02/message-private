import { useParams } from "react-router-dom";
import { useState } from "react";
import { useChatRoom } from "../hooks/useChatRoom";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import UserList from "../components/UserList";
import ChatHeader from "../components/ChatHeader";
import RoomNotFound from "../components/RoomNotFound";

export default function ChatRoom() {
  const { roomId } = useParams();
  const { room, isLoading } = useChatRoom(roomId);
  const [showUserList, setShowUserList] = useState(false);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading room info...</p>
        </div>
      </div>
    );
  }

  if (!room && !isLoading) {
    return <RoomNotFound roomId={roomId} />;
  }

  return (
    <div className="chat-room-container">
      {/* Header */}
      <ChatHeader
        roomId={roomId}
        onShowUserList={() => setShowUserList(true)}
      />

      {/* User List */}
      <UserList isOpen={showUserList} onClose={() => setShowUserList(false)} />

      {/* Chat Content */}
      <div className="chat-content">
        <MessageList />
        <MessageInput />
      </div>

      <style jsx>{`
        .chat-room-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
          overflow: hidden;
        }

        .loading-container,
        .error-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }

        .loading-content,
        .error-content {
          text-align: center;
          color: #64748b;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .error-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .error-content h2 {
          margin: 0 0 8px 0;
          color: #374151;
        }

        .error-content p {
          margin: 0;
          color: #6b7280;
        }

        .chat-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .room-info {
          flex: 1;
        }

        .room-title {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .room-stats {
          display: flex;
          gap: 16px;
        }

        .user-count {
          font-size: 14px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .user-count::before {
          content: "👥";
          font-size: 16px;
        }

        .chat-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .chat-header {
            padding: 12px 16px;
          }

          .room-title {
            font-size: 18px;
          }

          .header-actions {
            gap: 6px;
          }

          .action-button {
            padding: 6px 10px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .chat-header {
            padding: 12px;
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          .room-info {
            text-align: center;
          }

          .room-title {
            font-size: 16px;
          }

          .header-actions {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
