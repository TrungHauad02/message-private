export default function Instructions() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">How It Works</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột 1: Các bước hoạt động */}
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-sm font-semibold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                No Registration Required
              </h4>
              <p className="text-gray-600 text-sm">
                Simply enter your display name to join or create a room. No
                account needed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-sm font-semibold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Simple Room Creation
              </h4>
              <p className="text-gray-600 text-sm">
                Create a chat room instantly and share the link with friends to
                start chatting.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-sm font-semibold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Temporary Rooms
              </h4>
              <p className="text-gray-600 text-sm">
                All chat data is automatically deleted when everyone leaves or
                after 1 hour of inactivity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-sm font-semibold">4</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Privacy First</h4>
              <p className="text-gray-600 text-sm">
                We don't collect personal information. Your conversations are
                private and temporary.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-sm font-semibold">5</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Anonymous Messaging
              </h4>
              <p className="text-gray-600 text-sm">
                Chat anonymously with others using only display names. No
                tracking or profiles.
              </p>
            </div>
          </div>
        </div>

        {/* Cột 2: Thông tin bổ sung */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <h4 className="font-semibold text-blue-900">Perfect For</h4>
            </div>
            <p className="text-blue-800 text-sm">
              Private discussions, quick collaborations, or any temporary group
              chat needs without the hassle of accounts.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <h4 className="font-semibold text-red-900">Warning</h4>
            </div>
            <p className="text-red-800 text-sm">
              This website has no encryption. Do not share sensitive information
              like passwords, personal details, or confidential data.
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">
                  Development Notice
                </h4>
                <p className="text-amber-800 text-sm">
                  This is a learning project by a newbie developer. Please use
                  with caution and avoid sharing sensitive information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
