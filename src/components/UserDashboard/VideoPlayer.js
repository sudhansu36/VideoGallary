import React from "react";
// import ReactPlayer from "react-player/lazy";
import ReactPlayer from "react-player/youtube";
const VideoPlayer = () => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url="http://youtu.be/ueMwVGBwqRo"
        playing="true"
        controls="true"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
