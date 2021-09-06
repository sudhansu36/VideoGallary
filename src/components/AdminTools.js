import React from "react";
import { NavLink } from "react-router-dom";
const AdminTools = (props) => {
  let activeLinkStyle = {
    fontWeight: "bold",
    backgroundColor: "#2f302d",
  };
  return (
    <div className="fluid-container py-2">
      <div className="d-flex flex-row flex-nowrap overflow-auto scoll-pane row row-cols-4 row-cols-lg-5 m-0 p-0 ">
        <div className="card bg-transparent border-3 border-dark p-2 ms-3">
          <NavLink
            className="nav-link p-0 d-block rounded"
            to={`${props.url}/addcontent`}
            activeStyle={activeLinkStyle}
          >
            <img
              src="https://img.icons8.com/ios-filled/50/4a90e2/sending-video-frames.png"
              alt=""
              width="30px"
              className="d-flex mx-auto"
            />
            <div className="card-body text-center p-0">
              <p className="card-title text-primary">Add Content</p>
            </div>
          </NavLink>
        </div>
        <div className="card bg-transparent border-3 border-dark p-2 ms-3">
          <img
            src="https://img.icons8.com/ios-filled/50/4a90e2/sending-video-frames.png"
            alt=""
            width="30px"
            className="mx-auto"
          />
          <div className="card-body text-center p-0">
            <p className="card-title text-light">Add Content</p>
          </div>
        </div>
        <div className="card bg-transparent border-3 border-dark p-2 ms-3">
          <img
            src="https://img.icons8.com/ios-filled/50/4a90e2/sending-video-frames.png"
            alt=""
            width="30px"
            className="mx-auto"
          />
          <div className="card-body text-center p-0">
            <p className="card-title text-light">Add Content</p>
          </div>
        </div>
        <div className="card bg-transparent border-3 border-dark p-2 ms-3">
          <img
            src="https://img.icons8.com/ios-filled/50/4a90e2/sending-video-frames.png"
            alt=""
            width="30px"
            className="mx-auto"
          />
          <div className="card-body text-center p-0">
            <p className="card-title text-light">Add Content</p>
          </div>
        </div>
        <div className="card bg-transparent border-3 border-dark p-2 mx-3">
          <img
            src="https://img.icons8.com/ios-filled/50/4a90e2/sending-video-frames.png"
            alt=""
            width="30px"
            className="mx-auto"
          />
          <div className="card-body text-center p-0">
            <p className="card-title text-light">Add Content</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTools;
