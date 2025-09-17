import { MessageCircle } from "lucide-react";

export default function HeaderForm() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
        <MessageCircle className="w-8 h-8 text-indigo-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Private Message</h1>
      <p className="text-gray-600">
        Anonymous chat rooms for private conversations
      </p>
    </div>
  );
}
