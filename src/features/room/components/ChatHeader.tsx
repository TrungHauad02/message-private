import { useState } from "react";
import { useChatStore } from "../../../stores/chatStores";
import { getUserColor } from "../../../utils";

interface ChatHeaderProps {
  roomId?: string;
  onShowUserList: () => void;
}

export default function ChatHeader({
  roomId,
  onShowUserList,
}: ChatHeaderProps) {
  const { room, user } = useChatStore();
  const [copySuccess, setCopySuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const copyRoomUrl = async () => {
    if (!roomId) return;

    // Tạo full URL từ window.location
    const fullUrl = `${window.location.origin}/room/${roomId}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy room URL:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const clearData = () => {
    if (
      typeof useChatStore.persist !== "undefined" &&
      useChatStore.persist.clearStorage
    ) {
      useChatStore.persist.clearStorage();
      setShowConfirm(false);
      // Reload page để reset state
      window.location.reload();
    }
  };

  return (
    <>
      <header className="chat-header">
        <div className="room-info">
          <h1 className="room-title">{room?.name || `Room: ${roomId}`}</h1>
          <div className="room-stats">
            <span className="user-count">
              {room?.userCount || 0} users online
            </span>
            {user && (
              <div className="current-user-info">
                <div
                  className="current-user-avatar"
                  style={{ backgroundColor: getUserColor(user) }}
                >
                  {user.charAt(0).toUpperCase()}
                </div>
                <span className="current-user-name">{user}</span>
              </div>
            )}
          </div>
        </div>

        <div className="header-actions">
          <button
            className="action-button share-button"
            onClick={copyRoomUrl}
            title="Share room link"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16,6 12,2 8,6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            {copySuccess ? "Copied!" : "Share"}
          </button>

          <button
            className="action-button users-button"
            onClick={onShowUserList}
            title="View participants"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Users ({room?.userCount || 0})
          </button>

          <button
            className="action-button clear-button"
            onClick={() => setShowConfirm(true)}
            title="Clear all data"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3,6 5,6 21,6" />
              <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            Clear your identity
          </button>
        </div>
      </header>

      {/* Confirmation Modal */}
      {showConfirm && (
        <>
          <div
            className="modal-backdrop"
            onClick={() => setShowConfirm(false)}
          />
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3>Clear All Data</h3>
              <p>
                This will clear all stored chat data including your username and
                messages. You'll need to rejoin the room.
              </p>
              <div className="modal-actions">
                <button
                  className="modal-button cancel-button"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="modal-button confirm-button"
                  onClick={clearData}
                >
                  Clear Data
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
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
          align-items: center;
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

        .current-user-info {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 8px;
          background: #f8fafc;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
        }

        .current-user-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .current-user-name {
          font-size: 13px;
          color: #374151;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          background: white;
          color: #64748b;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #374151;
        }

        .share-button.action-button:hover {
          background: #dbeafe;
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .users-button.action-button:hover {
          background: #ecfdf5;
          border-color: #10b981;
          color: #10b981;
        }

        .clear-button.action-button:hover {
          background: #fef2f2;
          border-color: #ef4444;
          color: #ef4444;
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: fadeIn 0.2s ease-out;
        }

        .confirmation-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          animation: modalSlide 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 24px;
          max-width: 400px;
          width: 90vw;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .modal-content h3 {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .modal-content p {
          margin: 0 0 20px 0;
          font-size: 14px;
          color: #64748b;
          line-height: 1.5;
        }

        .modal-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .modal-button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-button {
          background: #f1f5f9;
          color: #64748b;
        }

        .cancel-button:hover {
          background: #e2e8f0;
          color: #374151;
        }

        .confirm-button {
          background: #ef4444;
          color: white;
        }

        .confirm-button:hover {
          background: #dc2626;
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

          .current-user-info {
            margin-top: 8px;
            justify-self: center;
          }

          .room-stats {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
