/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: number;
}

export interface Room {
  roomId: string;
  name: string;
  createdAt: number;
  userCount: number;
  users: string[];
}

export interface SocketEvents {
  // Room events
  "join-room": (data: { userName: string; roomId: string }) => void;
  "leave-room": (data?: { userName: string; roomId: string }) => void;
  "room-joined": (data: {
    roomId: string;
    roomInfo: Room;
    message: string;
  }) => void;
  "room-left": (data: { roomId: string; message: string }) => void;
  "user-joined": (data: {
    userName: string;
    userCount: number;
    users: string[];
  }) => void;
  "user-left": (data: { userName: string; userCount: number }) => void;

  // Message events
  "send-message": (data: {
    roomId: string;
    userName: string;
    message: string;
  }) => void;
  "new-message": (message: Message) => void;
  "previous-messages": (data: { messages: Message[]; roomId: string }) => void;

  // Room info
  "get-room-info": (data: { roomId: string }) => void;
  "room-info": (data: { roomId: string; roomInfo: Room }) => void;

  // Typing
  "typing-start": (data: { roomId: string; userName: string }) => void;
  "typing-stop": (data: { roomId: string; userName: string }) => void;
  "user-typing": (data: { userName: string; isTyping: boolean }) => void;

  // Error
  error: (data: { message: string }) => void;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  roomId?: string;
  roomInfo?: Room;
  messages?: Message[];
  count?: number;
  isInRoom?: boolean;
}
