import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearLoginState } from "../store/userSlice";
import { clearContentState } from "../store/contentSlice";
import { clearWatchListState } from "../store/watchlistSlice";
const ProfileDropDown = ({ setToken }) => {
  let { userObj } = useSelector((state) => state.user);
  let { isAdmin } = userObj;
  let dispatch = useDispatch();
  const onUserLogout = () => {
    localStorage.clear();
    dispatch(clearContentState());
    dispatch(clearLoginState());
    dispatch(clearWatchListState());
    setToken(null);
  };
  return (
    <>
      <div
        type="button"
        className="dropdown-toggle p-0 bg-transparent ms-auto my-2"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
      >
        <img
          src={userObj.image}
          alt=""
          className="rounded-circle"
          width="27px"
          height="27px"
        />
        <span className="ms-2 text-light">{userObj.name}</span>
      </div>
      <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0 m-0">
        {!isAdmin && (
          <li className="list-group-item list-group-item-info">
            <NavLink
              className="dropdown-item bg-transparent fw-bold"
              to="/mywatchlist"
              style={{ color: "#2f4054" }}
            >
              My Watchlist
            </NavLink>
          </li>
        )}
        <li className="list-group-item list-group-item-info">
          <NavLink
            className="dropdown-item bg-transparent fw-bold"
            aria-current="page"
            to={`/myprofile/${userObj.name}`}
            style={{ color: "#2f4054" }}
          >
            Account & Setting
          </NavLink>
        </li>
        <li className="list-group-item  list-group-item-info">
          <NavLink
            className="dropdown-item bg-transparent fw-bold"
            aria-current="page"
            to="/"
            onClick={onUserLogout}
            style={{ color: "#2f4054" }}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default ProfileDropDown;
