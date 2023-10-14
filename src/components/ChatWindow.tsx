const ChatWindow = ({
  currentVideoRef,
  remoteVideoRef,
  screenShareStatus,
  startScreenShare,
  stopScreenShare,
  disconnect,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <video
            className="w-full h-auto max-w-xl border border-gray-200 rounded-lg"
            preload="none"
            ref={currentVideoRef}
          />
        </div>
        <div>
          <video
            className="w-full h-auto max-w-xl border border-gray-200 rounded-lg"
            preload="none"
            ref={remoteVideoRef}
          />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex justify-center mt-4 md:mt-6">
          {screenShareStatus ? (
            <button
              className="inline-flex items-center px-4 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={stopScreenShare}
            >
              Stop Screen share
            </button>
          ) : (
            <button
              className="inline-flex items-center px-4 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={startScreenShare}
            >
              Share screen
            </button>
          )}
        </div>
        <div className="flex justify-center mt-4 md:mt-6">
          <button
            onClick={disconnect}
            className="inline-flex items-center px-4 py-2 text-base font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
