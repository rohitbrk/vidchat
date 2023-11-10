// @ts-nocheck
import { useContext, useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import ChatWindow from "./ChatWindow";
import RoomLogin from "./RoomLogin";
import { UserInfoContext } from "../context/UserInfoContext";
import { updateStream } from "../lib/room";

const Main = () => {
  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  const { name, room } = useContext(UserInfoContext);
  const [showChatWindow, setShowChatWindow] = useState(false);

  const currentVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const screenStream = useRef(null);
  const peer = useRef(null);
  const remotePeer = useRef(null);

  const [screenShareStatus, setScreenShareStatus] = useState(false);

  const createRoom = () => {
    if (room === " " || room === "" || name === " " || name === "") {
      alert("Please enter room id and name");
      return;
    }
    // manipulating room so that it won't collide
    peer.current = new Peer(`yth1${room}bvn2`);
    peer.current.on("open", () => {
      getUserMedia({ video: true, audio: true }, (stream) => {
        updateStream(currentVideoRef, stream);
      });
    });
    peer.current.on("call", (call) => {
      call.answer(currentVideoRef.current.srcObject);
      call.on("stream", (stream) => {
        updateStream(remoteVideoRef, stream);
      });
      remotePeer.current = call;
    });
    setShowChatWindow(true);
  };

  const joinRoom = () => {
    if (room === " " || room === "" || name === " " || name === "") {
      alert("Please enter room id and name");
      return;
    }
    peer.current = new Peer();
    peer.current.on("open", (id) => {
      getUserMedia({ video: true, audio: true }, (stream) => {
        updateStream(currentVideoRef, stream);
        // manipulating room so that it won't collide
        let call = peer.current.call(`yth1${room}bvn2`, stream);
        call.on("stream", (stream) => {
          updateStream(remoteVideoRef, stream);
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

  return (
    <div>
      {showChatWindow ? (
        <div></div>
      ) : (
        <RoomLogin createRoom={createRoom} joinRoom={joinRoom} />
      )}
      {showChatWindow ? (
        <ChatWindow
          currentVideoRef={currentVideoRef}
          remoteVideoRef={remoteVideoRef}
          screenShareStatus={screenShareStatus}
          startScreenShare={startScreenShare}
          stopScreenShare={stopScreenShare}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Main;
