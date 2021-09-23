import React from "react";
import { NavLink } from "react-router-dom";
const AdminTools = (props) => {
  return (
    <div className="fluid-container py-2 mx-2">
      <div className="d-flex flex-row flex-nowrap overflow-auto scoll-pane row row-cols-4 row-cols-lg-5 m-0 p-0 ">
        <div className="card bg-transparent border-3 border-dark p-2 ms-3">
          {/* Add Content */}
          <NavLink
            className="nav-link p-0 d-block rounded"
            to={`${props.url}/addcontent`}
          >
            <img
              src="https://img.icons8.com/ios-filled/50/4a90e2/sending-video-frames.png"
              alt=""
              width="30px"
              className="d-flex mx-auto"
            />
            <div className="card-body text-center p-0">
              <p className="card-title text-light">Add Content</p>
            </div>
          </NavLink>
        </div>
        <div className="card bg-transparent border-3 border-dark p-2 ms-3">
          {/* All user detail */}
          <NavLink
            className="nav-link p-0 d-block rounded"
            to={`${props.url}/alluser`}
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/4a90e2/group.png"
              alt=""
              width="30px"
              className="d-flex mx-auto"
            />
            <div className="card-body text-center p-0">
              <p className="card-title text-light">View Users</p>
            </div>
          </NavLink>
        </div>
        <div className="card bg-transparent border-3 border-dark p-2 mx-3">
          {/* Public Feedback */}
          <NavLink
            className="nav-link p-0 d-block rounded"
            to={`${props.url}/showfeedback`}
          >
            <img
              src="https://img.icons8.com/external-those-icons-fill-those-icons/24/4a90e2/external-feedback-feedback-those-icons-fill-those-icons-3.png"
              alt=""
              width="30px"
              className="d-flex mx-auto"
            />
            <div className="card-body text-center p-0">
              <p className="card-title text-light">Public Feedback</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminTools;
