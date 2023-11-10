// @ts-nocheck
import { useRef, useState } from "react";

type ChatWindowProps = {
  room: string;
  currentVideoRef: null;
  remoteVideoRef: null;
  peer: null;
  remotePeer: null;
};

const ChatWindow = ({
  room,
  currentVideoRef,
  remoteVideoRef,
  peer,
  remotePeer,
}: ChatWindowProps) => {
  const [screenShareStatus, setScreenShareStatus] = useState(false);
  const screenStream = useRef(null);

  const startScreenShare = () => {
    if (screenShareStatus) stopScreenShare();

    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
      screenStream.current = stream;
      let videoTrack = screenStream.current.getVideoTracks()[0];
      videoTrack.onended = () => stopScreenShare();

      if (peer.current) {
        let sender = remotePeer.current.peerConnection
          .getSenders()
          .find((sender) => sender.track.kind == videoTrack.kind);
        sender.replaceTrack(videoTrack);
        setScreenShareStatus(true);
      }
    });
  };

  const stopScreenShare = () => {
    if (!screenShareStatus) return;
    let videoTrack = currentVideoRef.current.srcObject.getVideoTracks()[0];
    if (peer.current) {
      let sender = remotePeer.current.peerConnection
        .getSenders()
        .find((sender) => sender.track.kind == videoTrack.kind);
      sender.replaceTrack(videoTrack);
    }
    screenStream.current.getTracks().forEach((track) => track.stop());
    setScreenShareStatus(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="max-w-screen-md flex justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          <div className="mr-2 text-lg">{room}</div>
        </div>
        <div>
          <video
            className="w-full h-auto max-w-xl max-w-xl border border-gray-200 rounded-lg"
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
            onClick={() => window.location.reload()}
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
