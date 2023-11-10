// @ts-nocheck
const updateStream = (videoRef, stream) => {
  videoRef.current.srcObject = stream;
  videoRef.current.play();
};

const checkUserInfo = (name, room) => {
  if (name === "" || room === "") {
    alert("Please enter room id and name");
    return;
  }
  return true;
};

export { updateStream, checkUserInfo };
