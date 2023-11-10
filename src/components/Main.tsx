// @ts-nocheck
import { useRef, useState } from "react";
import ChatWindow from "./ChatWindow";
import RoomLogin from "./RoomLogin";

const Main = () => {
  const [userInfo, setUserInfo] = useState({ name: "", room: "" });
  const peer = useRef(null);
  const remotePeer = useRef(null);

  const currentVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [showChatWindow, setShowChatWindow] = useState(false);

  return (
    <div>
      {showChatWindow ? (
        <div></div>
      ) : (
        <RoomLogin
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          currentVideoRef={currentVideoRef}
          remoteVideoRef={remoteVideoRef}
          peer={peer}
          remotePeer={remotePeer}
          setShowChatWindow={setShowChatWindow}
        />
      )}
      {showChatWindow ? (
        <ChatWindow
          room={userInfo.room}
          currentVideoRef={currentVideoRef}
          remoteVideoRef={remoteVideoRef}
          peer={peer}
          remotePeer={remotePeer}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Main;
