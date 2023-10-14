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
      <div>
        <video
          className="w-96 block max-w-sm bg-white border border-gray-200 rounded-md shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          preload="none"
          ref={currentVideoRef}
        />
      </div>
      <div>
        <video
          className="w-96 block max-w-sm bg-white border border-gray-200 rounded-md shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          preload="none"
          ref={remoteVideoRef}
        />
      </div>
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
  );
};

export default ChatWindow;
