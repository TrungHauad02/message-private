import { useState } from "react";
import { Plus } from "lucide-react";
import { apiService } from "../../../services/apiService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../../../stores/chatStores";

export default function CreateRoom() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  const { joinRoom, isLoading } = useChatStore();

  const isFormValid =
    userName.trim().length >= 2 && roomName.trim().length >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: create room logic
    const result = await apiService.createRoom(
      userName.trim(),
      roomName.trim()
    );
    if (result.success) {
      toast.success(`Room "${roomName}" created successfully!`);
      if (!result.roomId) {
        toast.error("No room ID returned from server.");
        return;
      }
      const success = await joinRoom(userName.trim(), result.roomId.trim());

      if (success) {
        toast.success("Joined room successfully");
        navigate(`/room/${result.roomId}`);
      } else {
        toast.error("Failed to join room");
      }
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="createUserName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="createUserName"
          name="userName"
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
          htmlFor="roomName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Room Name
        </label>
        <input
          type="text"
          name="roomName"
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          minLength={2}
          maxLength={30}
          required
        />
        {roomName.trim().length > 0 && roomName.trim().length < 2 && (
          <p className="text-red-500 text-xs mt-1">
            Room name must be at least 2 characters
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
        {isLoading ? "Created..." : "Create Room"}
      </button>
    </form>
  );
}
