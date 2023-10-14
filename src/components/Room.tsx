import { useRef, useState } from "react";
import Peer from "peerjs";
import Chat from "./Chat";

const Room = () => {
  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  const [roomId, setRoomId] = useState("");
  const [flag, setFlag] = useState(false);

  const [name, setName] = useState("");

  const currentVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const screenStream = useRef(null);
  const peer = useRef(null);
  const remotePeer = useRef(null);
  const [screenShareStatus, setScreenShareStatus] = useState(false);

  const createRoom = () => {
    if (roomId == " " || roomId == "") {
      alert("Please enter room number");
      return;
    }
    peer.current = new Peer(roomId);
    peer.current.on("open", () => {
      getUserMedia({ video: true, audio: true }, (stream) => {
        setLocalStream(stream);
      });
    });
    peer.current.on("call", (call) => {
      call.answer(currentVideoRef.current.srcObject);
      call.on("stream", (stream) => {
        setRemoteStream(stream);
      });
      remotePeer.current = call;
    });
    setFlag(true);
  };

  const setLocalStream = (stream) => {
    currentVideoRef.current.srcObject = stream;
    currentVideoRef.current.play();
  };
  const setRemoteStream = (stream) => {
    remoteVideoRef.current.srcObject = stream;
    remoteVideoRef.current.play();
  };

  const joinRoom = () => {
    if (roomId == " " || roomId == "") {
      alert("Please enter room number");
      return;
    }
    peer.current = new Peer();
    peer.current.on("open", (id) => {
      getUserMedia({ video: true, audio: true }, (stream) => {
        setLocalStream(stream);
        let call = peer.current.call(roomId, stream);
        call.on("stream", (stream) => {
          setRemoteStream(stream);
        });
        remotePeer.current = call;
      });
    });
    setFlag(true);
  };

  const startScreenShare = () => {
    if (screenShareStatus) stopScreenShare();

    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
      screenStream.current = stream;
      let videoTrack = screenStream.current.getVideoTracks()[0];
      videoTrack.onended = () => stopScreenShare();

      if (peer.current) {
        let sender = remotePeer.current.peerConnection
          .getSenders()
          .find((s) => s.track.kind == videoTrack.kind);
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
        .find((s) => s.track.kind == videoTrack.kind);
      sender.replaceTrack(videoTrack);
    }
    screenStream.current.getTracks().forEach((track) => track.stop());
    setScreenShareStatus(false);
  };

  const disconnect = () => {
    peer.current = null;
    remotePeer.current = null;
    screenStream.current = null;
    currentVideoRef.current = null;
    remoteVideoRef.current = null;
    setScreenShareStatus(false);
    setFlag(false);
  };

  return (
    <div>
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center p-6">
          <div className="flex m-2">
            <span className="inline-flex items-center px-3 text-base text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName((prev) => e.target.value)}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-base border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name"
            />
          </div>
          <div className="flex m-2">
            <span className="inline-flex items-center px-3 text-base text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </span>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId((prev) => e.target.value)}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-base border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="room"
            />
          </div>

          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              onClick={createRoom}
              className="inline-flex items-center px-4 py-2 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
            <button
              onClick={joinRoom}
              className="inline-flex items-center px-4 py-2 text-base font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Join
            </button>
          </div>
        </div>
      </div>
      {flag ? (
        <Chat
          currentVideoRef={currentVideoRef}
          remoteVideoRef={remoteVideoRef}
          screenShareStatus={screenShareStatus}
          startScreenShare={startScreenShare}
          stopScreenShare={stopScreenShare}
          disconnect={disconnect}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Room;
