import { useState } from "react";
import { LogIn, Clipboard } from "lucide-react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useChatStore } from "../../../stores/chatStores";

export default function JoinRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [hasPreFilled, setHasPreFilled] = useState(false);
  const [roomId, setRoomId] = useState("");
  const { joinRoom, isLoading } = useChatStore();

  const isFormValid = userName.trim().length >= 2 && roomId.trim().length > 0;

  if (location.state?.roomId && !roomId && !hasPreFilled) {
    setRoomId(location.state.roomId);
    setHasPreFilled(true);
    location.state.roomId = null; // Clear state to prevent re-filling on re-renders
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: join room logic
    const success = await joinRoom(userName.trim(), roomId.trim());

    if (success) {
      toast.success("Joined room successfully");
      navigate(`/room/${roomId}`);
    } else {
      toast.error("Failed to join room");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        let roomIdToSet = text.trim();

        // Nếu paste toàn bộ URL, extract roomId từ URL
        if (text.includes("/room/")) {
          const urlMatch = text.match(/\/room\/([^/?#]+)/);
          if (urlMatch && urlMatch[1]) {
            roomIdToSet = urlMatch[1];
          }
        }

        setRoomId(roomIdToSet);
      }
    } catch (error) {
      // Fallback for browsers without clipboard API or when permission denied
      console.log("Clipboard access denied or not supported: ", error);

      // Alternative: Focus input and let user paste manually
      const input = document.getElementById("roomId") as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
        toast.success("Please paste the room link manually");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="joinUserName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="joinUserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your display name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          minLength={2}
          maxLength={20}
          required
        />
        {userName.trim().length > 0 && userName.trim().length < 2 && (
          <p className="text-red-500 text-xs mt-1">
            Name must be at least 2 characters
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="roomId"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Room ID
        </label>
        <div className="relative">
          <input
            type="text"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room ID to join"
            className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors font-mono"
            required
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Paste from clipboard"
          >
            <Clipboard className="w-4 h-4" />
          </button>
        </div>
        {roomId.trim().length === 0 && roomId.length > 0 && (
          <p className="text-red-500 text-xs mt-1">Room ID cannot be empty</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          Ask the room creator for the room ID
        </p>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <LogIn className="w-5 h-5" />
        )}
        {isLoading ? "Joining..." : "Join Room"}
      </button>
    </form>
  );
}
