export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated logo/icon */}
        <div className="relative">
          <div className="w-16 h-16 border-2 border-green-500/30 rounded-full animate-spin">
            <div className="absolute top-1 left-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute inset-0 w-16 h-16 border-2 border-green-500/10 rounded-full animate-ping"></div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Loading Krivya AI</h2>
          <p className="text-gray-400 text-sm">Initializing misinformation detection system...</p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}
