import { useState } from "react";
import { Plus, LogIn, HelpCircle, X, AlertTriangle } from "lucide-react";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";
import ConnectionStatus from "../components/ConnectionStatus";
import HeaderForm from "../components/HeaderForm";
import Instructions from "../components/Instructions";
import KnownIssues from "../components/KnownIssues";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"join" | "create">("join");
  const [showInstructions, setShowInstructions] = useState(false);
  const [showKnownIssues, setShowKnownIssues] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="flex gap-6 w-full max-w-6xl justify-center">
        {/* Form Section - Increased size */}
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg animate-fade-in">
          <HeaderForm />

          {/* Tab Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab("join")}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === "join"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LogIn className="w-4 h-4" />
              Join Room
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === "create"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Plus className="w-4 h-4" />
              Create Room
            </button>
          </div>

          {activeTab === "create" ? <CreateRoom /> : <JoinRoom />}

          {/* Connection Status */}
          <ConnectionStatus />

          {/* Help Buttons */}
          <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              {showInstructions ? "Hide Instructions" : "How does this work?"}
            </button>

            <button
              onClick={() => setShowKnownIssues(!showKnownIssues)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              {showKnownIssues ? "Hide Known Issues" : "Known Issues & Bugs"}
            </button>
          </div>
        </div>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative animate-modal-in">
            {/* Close Button */}
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Instructions Content */}
            <div className="p-6">
              <Instructions />
            </div>
          </div>
        </div>
      )}

      {/* Known Issues Modal */}
      {showKnownIssues && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto relative animate-modal-in">
            {/* Close Button */}
            <button
              onClick={() => setShowKnownIssues(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Known Issues Content */}
            <div className="p-6">
              <KnownIssues />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delayed {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.8s ease-out 0.2s both;
        }

        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
