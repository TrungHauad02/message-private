export default function KnownIssues() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Known Issues</h3>

      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">
              Page Refresh Issues
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              When you refresh the page, you'll be notified about leaving and
              rejoining the room. If you're the last person in the room,
              refreshing will cause the room to disappear.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                Known limitation
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">
              Performance Related
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              The application may experience slower performance with many
              concurrent users or in rooms with extensive chat history.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Under optimization
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Appeal */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.045 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
            </svg>
          </div>
          <h4 className="font-semibold text-gray-900">
            💝 A Friendly Request to Fellow Developers
          </h4>
        </div>
        <div className="text-gray-700 text-sm space-y-2">
          <p className="flex items-center gap-2">
            <span className="text-lg">🙏</span>
            <span>
              <strong>Hey there, awesome developers!</strong> This is a learning
              project built with love and late-night coding sessions.
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-lg">🚫</span>
            <span>
              Please <strong>don't hack or DDoS</strong> this little site. It's
              like kicking a puppy - technically possible, but why would you? 😢
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-lg">🤝</span>
            <span>
              Instead, if you find vulnerabilities, I'd be{" "}
              <strong>super grateful</strong> if you could reach out and help me
              learn!
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-lg">💪</span>
            <span>
              Let's build each other up, not tear each other down.{" "}
              <strong>Developer solidarity!</strong> ✊
            </span>
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
            <span className="mr-1">🌱</span>
            Learning Project
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
            <span className="mr-1">❤️</span>
            Made with Love
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            <span className="mr-1">🤝</span>
            Be Kind
          </span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <h4 className="font-semibold text-gray-900">Reporting Issues</h4>
        </div>
        <p className="text-gray-700 text-sm">
          If you encounter any bugs or have suggestions for improvement, please
          be patient as this is a learning project. Your feedback helps me
          improve the application. Contact: trunghauad03@gmail.com
        </p>
      </div>
    </div>
  );
}
