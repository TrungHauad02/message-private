/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from "socket.io-client";
import type { SocketEvents } from "../types";

class SocketService {
  private socket: Socket | null = null;
  private serverUrl: string =
    import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:3000";

  connect(): Socket {
    if (!this.socket) {
      this.socket = io(this.serverUrl, {
        transports: ["websocket", "polling"],
        autoConnect: true,
      });

      this.socket.on("connect", () => {
        console.log("Connected to server:", this.socket?.id);
      });

      this.socket.on("disconnect", (reason) => {
        console.log("Disconnected from server:", reason);
      });

      this.socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });
    }

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Room methods
  joinRoom(userName: string, roomId: string): void {
    console.log("Joining room:", roomId, "as", userName);
    this.socket?.emit("join-room", { userName, roomId });
  }

  leaveRoom(userName?: string, roomId?: string): void {
    this.socket?.emit("leave-room", { userName, roomId });
  }

  // Message methods
  sendMessage(roomId: string, userName: string, message: string): void {
    this.socket?.emit("send-message", { roomId, userName, message });
  }

  // Typing methods
  startTyping(roomId: string, userName: string): void {
    this.socket?.emit("typing-start", { roomId, userName });
  }

  stopTyping(roomId: string, userName: string): void {
    this.socket?.emit("typing-stop", { roomId, userName });
  }

  // Room info
  getRoomInfo(roomId: string): void {
    this.socket?.emit("get-room-info", { roomId });
  }

  // Event listeners
  on<K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]): void {
    this.socket?.on(event, callback as any);
  }

  off<K extends keyof SocketEvents>(
    event: K,
    callback?: SocketEvents[K]
  ): void {
    this.socket?.off(event, callback as any);
  }

  // Get socket instance
  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
