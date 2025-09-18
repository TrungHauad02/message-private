export default function HeaderForm() {
  return (
    <div className="text-center mb-12 relative">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -top-4 -right-12 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-75"></div>
      </div>

      {/* Icon container with enhanced styling */}
      <div className="relative inline-flex items-center justify-center mb-6">
        {/* Outer glow ring */}
        <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-40 animate-pulse"></div>

        {/* Main icon container */}
        <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full shadow-lg border border-indigo-100/50 flex items-center justify-center backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/80 to-indigo-50/80 flex items-center justify-center shadow-inner">
            <img
              src="/icon.svg"
              alt="Private Message"
              className="w-10 h-10 drop-shadow-sm"
            />
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce delay-150"></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Title with gradient text */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Private Message
        </span>
      </h1>

      {/* Subtitle with enhanced styling */}
      <p className="text-lg text-gray-600 mb-4 max-w-md mx-auto leading-relaxed">
        Anonymous chat rooms for{" "}
        <span className="text-purple-600 font-semibold">private</span>{" "}
        conversations
      </p>

      {/* Subtle animated line */}
      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="w-8 h-px bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
