import { useChatStore } from "../../../stores/chatStores";
import { getUserColor } from "../../../utils";

interface UserListProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserList({ isOpen, onClose }: UserListProps) {
  const { room, user } = useChatStore();

  const getStatusText = (username: string) => {
    return username === user ? "You" : "Online";
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="user-list-backdrop" onClick={onClose} />

      {/* User List Panel */}
      <div className="user-list-panel">
        <div className="user-list-header">
          <h3>Participants ({room?.userCount || 0})</h3>
          <button className="close-button" onClick={onClose}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="users-list">
          {room?.users?.map((username, index) => (
            <div key={`${username}-${index}`} className="user-item">
              <div
                className="user-avatar"
                style={{ backgroundColor: getUserColor(username) }}
              >
                {username.charAt(0).toUpperCase()}
              </div>

              <div className="user-info">
                <div className="user-name">
                  {username}
                  {username === user && <span className="you-badge">You</span>}
                </div>
                <div className="user-status">
                  <div className="status-indicator online"></div>
                  {getStatusText(username)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .user-list-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .user-list-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 320px;
          height: 100vh;
          background: white;
          border-left: 1px solid #e2e8f0;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease-out;
          box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .user-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .user-list-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .close-button {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button:hover {
          background: #e2e8f0;
          color: #374151;
        }

        .users-list {
          flex: 1;
          overflow-y: auto;
          padding: 16px 0;
        }

        .user-item {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          gap: 12px;
          transition: background-color 0.2s ease;
        }

        .user-item:hover {
          background: #f1f5f9;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .user-info {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .you-badge {
          background: #3b82f6;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 10px;
          text-transform: uppercase;
        }

        .user-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .status-indicator.online {
          background: #10b981;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .user-list-panel {
            width: 280px;
          }

          .user-list-header {
            padding: 16px 20px;
          }

          .user-list-header h3 {
            font-size: 16px;
          }

          .user-item {
            padding: 10px 20px;
          }

          .user-avatar {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .user-list-panel {
            width: 100vw;
            border-left: none;
          }
        }

        /* Custom scrollbar */
        .users-list::-webkit-scrollbar {
          width: 6px;
        }

        .users-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .users-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .users-list::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
}
