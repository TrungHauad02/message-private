import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useChatStore } from "../../../stores/chatStores";
import type { Room } from "../../../types";
import { socketService } from "../../../services/socketService";

export const useChatRoom = (roomId: string | undefined) => {
  const navigate = useNavigate();
  const { user, room, isLoading, setRoom, joinRoom } = useChatStore();

  // Setup socket listeners cho user joined/left events
  useEffect(() => {
    const handleUserJoined = (data: {
      userName: string;
      userCount: number;
      users: string[];
    }) => {
      if (!room) return;
      setRoom({
        ...room,
        userCount: data.userCount,
        users: data.users,
      } as Room);
      toast.success(`${data.userName} joined the room.`);
    };

    const handleUserLeft = (data: { userName: string; userCount: number }) => {
      if (!room) return;
      setRoom({
        ...room,
        userCount: data.userCount,
        users: room.users.filter((u) => u !== data.userName),
      } as Room);
      toast.success(`${data.userName} left the room.`);
    };

    socketService.on("user-joined", handleUserJoined);
    socketService.on("user-left", handleUserLeft);

    console.log("Set up socket listeners for user-joined and user-left");

    return () => {
      socketService.off("user-joined", handleUserJoined);
      socketService.off("user-left", handleUserLeft);
      console.log("Cleaned up socket listeners for user-joined and user-left");
    };
  }, [room]);

  // Handle room initialization
  useEffect(() => {
    const initializeRoom = async () => {
      // Early return với proper navigation
      if (!roomId || !user) {
        navigate("/", { replace: true, state: { roomId } });
        return;
      }

      if (room && room.roomId === roomId) {
        console.log("Room already loaded:", room);
        return; // Room đã được tải, không cần gọi lại
      }

      // Kiểm tra socket connection trước khi join room
      if (!socketService.isConnected()) {
        console.log("Socket not connected, waiting...");

        // Chờ socket connect rồi mới join room
        const waitForConnection = () => {
          if (socketService.isConnected()) {
            joinRoom(user, roomId);
          } else {
            setTimeout(waitForConnection, 100); // Retry sau 100ms
          }
        };

        waitForConnection();
        return;
      }

      await joinRoom(user, roomId);
    };

    initializeRoom();
  }, [roomId, user]);

  return {
    user,
    room,
    isLoading,
    roomId,
  };
};
