// @ts-nocheck
import { checkUserInfo, updateStream } from "../lib/room";
import Peer from "peerjs";

const RoomLogin = ({
  userInfo,
  setUserInfo,
  currentVideoRef,
  remoteVideoRef,
  peer,
  remotePeer,
  setShowChatWindow,
}) => {
  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  const { name, room } = userInfo;

  const createRoom = () => {
    if (!checkUserInfo(name, room)) return;
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
    if (!checkUserInfo(name, room)) return;
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

  const onChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const form = [
    {
      svg: (
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
      ),
      value: name,
      onChange: onChange,
      placeholder: "name",
      name: "name",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      ),
      value: room,
      onChange: onChange,
      placeholder: "room",
      name: "room",
    },
  ];
  return (
    <div className="md:w-screen md:max-w-xl border rounded-lg shadow bg-gray-800 border-gray-700">
      <div className="flex flex-col items-center p-6">
        {form.map((item) => (
          <div
            className="md:w-screen md:max-w-lg flex m-2"
            key={item.placeholder}
          >
            <span className="inline-flex items-center px-3 text-base text-gray-900 bg-gray-800 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              {item.svg}
            </span>
            <input
              type="text"
              name={item.name}
              value={item.value ? item.value : ""}
              onChange={item.onChange}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-base border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder={item.placeholder}
            />
          </div>
        ))}

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
  );
};

export default RoomLogin;
