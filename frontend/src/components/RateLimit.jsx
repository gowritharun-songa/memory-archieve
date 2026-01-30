import { ZapIcon, ClockIcon } from "lucide-react";

const RateLimit = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Top accent bar */}
          <div className="h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

          <div className="p-8 md:p-10 space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-100 rounded-full blur-xl opacity-60 animate-pulse" />
                <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full p-5 shadow-lg">
                  <ZapIcon className="w-12 h-12 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Slow Down a Bit
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                You've reached the rate limit for now.
              </p>

              <div className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-50 rounded-xl text-indigo-700 font-medium">
                <ClockIcon className="w-5 h-5" />
                <span>Please wait a few seconds</span>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                We're working hard to keep the experience smooth for everyone ✨
              </p>
            </div>

            <div className="pt-4">
              <p className="text-xs text-gray-400 text-center">
                The page will refresh automatically when ready
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default RateLimit;