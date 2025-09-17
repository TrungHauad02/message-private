/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiResponse, Room, Message } from "../types";

class ApiService {
  private baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
      credentials: "include",
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Room methods
  async createRoom(userName: string, roomName: string): Promise<ApiResponse> {
    return this.request("/chats/rooms", {
      method: "POST",
      body: JSON.stringify({ userName, roomName }),
    });
  }

  async joinRoom(userName: string, roomId: string): Promise<ApiResponse> {
    return this.request("/chats/rooms/join", {
      method: "POST",
      body: JSON.stringify({ userName, roomId }),
    });
  }

  async getRoomInfo(roomId: string): Promise<ApiResponse<Room>> {
    return this.request(`/chats/rooms/${roomId}`);
  }

  async getRoomMessages(
    roomId: string,
    limit = 50
  ): Promise<ApiResponse<Message[]>> {
    return this.request(`/chats/rooms/${roomId}/messages?limit=${limit}`);
  }

  async leaveRoom(userName: string, roomId: string): Promise<ApiResponse> {
    return this.request("/chats/rooms/leave", {
      method: "POST",
      body: JSON.stringify({ userName, roomId }),
    });
  }

  async sendMessage(
    roomId: string,
    userName: string,
    message: string
  ): Promise<ApiResponse> {
    return this.request("/chats/messages", {
      method: "POST",
      body: JSON.stringify({ roomId, userName, message }),
    });
  }

  async checkUserInRoom(
    userName: string,
    roomId: string
  ): Promise<ApiResponse> {
    return this.request(
      `/chats/check-user?userName=${userName}&roomId=${roomId}`
    );
  }
}

export const apiService = new ApiService();
