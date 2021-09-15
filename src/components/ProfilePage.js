import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import EditProfilePic from "./EditProfilePic";
const ProfilePage = () => {
  let { userObj } = useSelector((state) => state.user);
  let [user, setUser] = useState({});
  useEffect(() => {
    setUser(userObj);
    // eslint-disable-next-line
  }, [userObj]);
  let [show, setShow] = useState(false);
  let [password, setPassword] = useState(false);
  return (
    <div className="container">
      {JSON.stringify(user) !== JSON.stringify({}) && (
        <div className="row gutters-sm mt-5">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={user?.image}
                    alt="Admin"
                    className="rounded-circle"
                    width="200px"
                    height="200px"
                  />
                  <div className="mt-3">
                    <h4>{user.name}</h4>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setShow(true)}
                    >
                      Edit Profile Pic
                    </button>
                    <EditProfilePic show={show} setShow={setShow} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.name}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.email}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      className="btn btn-primary"
                      onClick={() => setPassword(true)}
                    >
                      Edit
                    </button>
                    <EditProfile
                      password={password}
                      setPassword={setPassword}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
