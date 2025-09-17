import { useNavigate } from "react-router-dom";

interface RoomNotFoundProps {
  roomId?: string;
}

export default function RoomNotFound({ roomId }: RoomNotFoundProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="room-not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            <path d="M12 12v6" />
            <path d="M9 15h6" />
          </svg>
        </div>

        <h1 className="not-found-title">Room Not Found</h1>

        <div className="not-found-description">
          <p>The room you're looking for doesn't exist or may have expired.</p>
          {roomId && (
            <div className="room-id-display">
              <span>Room ID:</span>
              <code>{roomId}</code>
            </div>
          )}
        </div>

        <div className="not-found-suggestions">
          <h3>What you can do:</h3>
          <ul>
            <li>Check if the room ID is correct</li>
            <li>Ask the room creator for a new invite link</li>
            <li>Create your own room to chat with friends</li>
          </ul>
        </div>

        <div className="not-found-actions">
          <button
            onClick={handleGoHome}
            className="action-button primary-button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            Go Home
          </button>
        </div>
      </div>

      <style jsx>{`
        .room-not-found-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          box-sizing: border-box;
        }

        .not-found-content {
          background: white;
          border-radius: 16px;
          padding: 48px 40px;
          text-align: center;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .not-found-icon {
          color: #ef4444;
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }

        .not-found-title {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 16px 0;
        }

        .not-found-description {
          color: #64748b;
          margin-bottom: 32px;
        }

        .not-found-description p {
          font-size: 16px;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }

        .room-id-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          background: #f1f5f9;
          border-radius: 8px;
          font-size: 14px;
        }

        .room-id-display span {
          color: #64748b;
          font-weight: 500;
        }

        .room-id-display code {
          background: #e2e8f0;
          color: #374151;
          padding: 4px 8px;
          border-radius: 4px;
          font-family: "Monaco", "Menlo", monospace;
          font-weight: 600;
        }

        .not-found-suggestions {
          text-align: left;
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 32px;
        }

        .not-found-suggestions h3 {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 12px 0;
        }

        .not-found-suggestions ul {
          margin: 0;
          padding-left: 20px;
          list-style-type: disc;
        }

        .not-found-suggestions li {
          color: #64748b;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 4px;
        }

        .not-found-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .primary-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .secondary-button {
          background: white;
          color: #64748b;
          border: 2px solid #e2e8f0;
        }

        .secondary-button:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .room-not-found-container {
            padding: 16px;
          }

          .not-found-content {
            padding: 32px 24px;
          }

          .not-found-title {
            font-size: 24px;
          }

          .not-found-suggestions {
            padding: 20px;
          }

          .action-button {
            flex: 1;
            min-width: 140px;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .not-found-content {
            padding: 24px 20px;
          }

          .not-found-title {
            font-size: 20px;
          }

          .not-found-actions {
            flex-direction: column;
          }

          .action-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
