/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Message, Room } from "../types";
import { socketService } from "../services/socketService";

interface ChatStore {
  user: string; // Logged in user
  room: Room | null; // Current chat room
  messages: Message[]; // Messages in the current room
  isConnected: boolean; // Socket connection status
  isLoading: boolean; // Loading state for async operations
  typingUsers: string[]; // Users currently typing

  // Actions to update the state
  setUser: (user: string) => void;
  setRoom: (room: Room | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setConnected: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  addTypingUser: (username: string) => void;
  removeTypingUser: (username: string) => void;
  resetChat: () => void;
  // Socket actions
  connectSocket: () => void;
  disconnectSocket: () => void;
  initializeSocket: () => void;
  // Room actions
  getRoomInfo: (roomId: string) => void;
  joinRoom: (userName: string, roomId: string) => Promise<boolean>;
  // Message actions
  sendMessage: (message: string, roomId: string, user: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      user: "",
      room: null,
      messages: [],
      isConnected: false,
      isLoading: false,
      typingUsers: [],

      setUser: (user) => set({ user }),
      setRoom: (room) => set({ room }),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      setMessages: (messages) => set({ messages }),
      setConnected: (isConnected) => set({ isConnected }),
      setLoading: (isLoading) => set({ isLoading }),
      addTypingUser: (user) =>
        set((state) => ({
          typingUsers: state.typingUsers.includes(user)
            ? state.typingUsers
            : [...state.typingUsers, user],
        })),
      removeTypingUser: (user) =>
        set((state) => ({
          typingUsers: state.typingUsers.filter((u) => u !== user),
        })),
      resetChat: () =>
        set({
          user: "",
          room: null,
          messages: [],
          typingUsers: [],
        }),
      connectSocket: () => {
        const socket = socketService.connect();
        set({ isConnected: socket.connected });
      },
      disconnectSocket: () => {
        socketService.disconnect();
        set({ isConnected: false });
      },
      initializeSocket: () => {
        const socket = socketService.connect();

        socket.on("connect", () => {
          set({ isConnected: true });
        });

        socket.on("disconnect", () => {
          set({ isConnected: false });
        });

        socket.on("connect_error", () => {
          set({ isConnected: false });
        });

        set({ isConnected: socket.connected });
      },
      getRoomInfo: (roomId: string) => {
        set({ isLoading: true });
        // Cleanup existing listener
        socketService.off("room-info");

        // Add new listener
        socketService.on("room-info", (data) => {
          set({
            room: data.roomInfo || null,
            isLoading: false,
          });
          console.log("Received room-info:", data);
          socketService.off("room-info");
        });

        socketService.getRoomInfo(roomId);

        setTimeout(() => {
          set({ isLoading: false });
          socketService.off("room-info");
        }, 5000);
      },
      joinRoom: async (userName: string, roomId: string) => {
        return new Promise((resolve) => {
          set({ isLoading: true });

          // Setup listeners TRƯỚC khi emit join room
          const handlePreviousMessages = (data: {
            messages: Message[];
            roomId: string;
          }) => {
            console.log("Received previous messages:", data);
            set({ messages: data.messages || [] });
          };

          const handleRoomJoined = (data: {
            roomId: string;
            roomInfo: Room;
            message: string;
          }) => {
            console.log("Room joined successfully:", data);

            set({
              room: data.roomInfo,
              user: userName,
              isLoading: false,
            });

            // Cleanup listeners
            cleanup();
            resolve(true);
          };

          const handleError = (data: { message: string }) => {
            console.log("Join room error:", data);
            set({ isLoading: false });

            // Cleanup listeners
            cleanup();
            resolve(false);
          };

          const cleanup = () => {
            socketService.off("room-joined", handleRoomJoined);
            socketService.off("error", handleError);
            socketService.off("previous-messages", handlePreviousMessages);
          };

          // Add ALL listeners trước khi emit
          socketService.on("room-joined", handleRoomJoined);
          socketService.on("error", handleError);
          socketService.on("previous-messages", handlePreviousMessages);

          // Emit join room
          socketService.joinRoom(userName, roomId);

          // Timeout fallback
          setTimeout(() => {
            console.log("Join room timeout");
            cleanup();
            set({ isLoading: false });
            resolve(false);
          }, 5000);
        });
      },
      sendMessage: (message: string, roomId: string, user: string) => {
        if (roomId && user && message.trim()) {
          socketService.sendMessage(roomId, user, message);
        }
      },
    }),
    {
      name: "chat-storage", // Tên key trong localStorage
      storage: createJSONStorage(() => localStorage), // Sử dụng localStorage

      // Chỉ lưu những field cần thiết
      partialize: (state) => ({
        user: state.user,
      }),

      // Skip hydration khi server-side rendering
      skipHydration: false,
    }
  )
);
