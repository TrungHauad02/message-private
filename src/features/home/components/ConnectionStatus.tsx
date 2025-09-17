import { useChatStore } from "../../../stores/chatStores";

export default function ConnectionStatus() {
  const { isConnected } = useChatStore();

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-center gap-2 text-sm">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className={isConnected ? "text-green-600" : "text-red-600"}>
          {isConnected ? "Connected to server" : "Disconnected from server"}
        </span>
      </div>
    </div>
  );
}
