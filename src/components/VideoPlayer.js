import React from "react";
import ReactPlayer from "react-player/lazy";
const VideoPlayer = () => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url="https://youtu.be/ueMwVGBwqRo"
        playing="true"
        controls="true"
        width="100%"
        height="75%"
      />
    </div>
  );
};

export default VideoPlayer;
