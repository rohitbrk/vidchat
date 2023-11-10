const updateStream = (videoRef, stream) => {
  videoRef.current.srcObject = stream;
  videoRef.current.play();
};

export { updateStream };
