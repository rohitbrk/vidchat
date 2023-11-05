// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import ChatWindow from "./ChatWindow";
import RoomLogin from "./RoomLogin";

const Main = () => {
  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  const [roomId, setRoomId] = useState("");
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [name, setName] = useState("");

  const currentVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const screenStream = useRef(null);
  const peer = useRef(null);
  const remotePeer = useRef(null);
  const [screenShareStatus, setScreenShareStatus] = useState(false);

  const createRoom = () => {
    if (roomId === " " || roomId === "" || name === " " || name === "") {
      alert("Please enter room id and name");
      return;
    }
    // manipulating roomId so that it won't collide
    peer.current = new Peer(`yth1${roomId}bvn2`);
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
    setShowChatWindow(true);
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
    if (roomId === " " || roomId === "" || name === " " || name === "") {
      alert("Please enter room id and name");
      return;
    }
    peer.current = new Peer();
    peer.current.on("open", (id) => {
      getUserMedia({ video: true, audio: true }, (stream) => {
        setLocalStream(stream);
        // manipulating roomId so that it won't collide
        let call = peer.current.call(`yth1${roomId}bvn2`, stream);
        call.on("stream", (stream) => {
          setRemoteStream(stream);
        });
        remotePeer.current = call;
      });
    });
    setShowChatWindow(true);
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

  const disconnect = () => {
    window.location.reload();
  };

  return (
    <div>
      {showChatWindow ? (
        <div></div>
      ) : (
        <RoomLogin
          name={name}
          setName={setName}
          roomId={roomId}
          setRoomId={setRoomId}
          createRoom={createRoom}
          joinRoom={joinRoom}
        />
      )}
      {showChatWindow ? (
        <ChatWindow
          currentVideoRef={currentVideoRef}
          remoteVideoRef={remoteVideoRef}
          screenShareStatus={screenShareStatus}
          startScreenShare={startScreenShare}
          stopScreenShare={stopScreenShare}
          disconnect={disconnect}
          roomId={roomId}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Main;
