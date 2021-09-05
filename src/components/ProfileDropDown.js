import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearLoginState } from "../store/userSlice";
const ProfileDropDown = () => {
  let { userObj } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  const onUserLogout = () => {
    localStorage.clear();
    dispatch(clearLoginState());
  };
  return (
    <>
      <div
        type="button"
        className="dropdown-toggle p-0 bg-transparent text-light ms-auto my-2"
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
        <span className="ms-2">{userObj.name}</span>
      </div>
      <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0 m-0">
        <li className="list-group-item list-group-item-info">
          <button className="dropdown-item" type="button">
            My Watchlist
          </button>
        </li>
        <li className="list-group-item list-group-item-info">
          <button className="dropdown-item" type="button">
            Account & Setting
          </button>
        </li>
        <li className="list-group-item  list-group-item-info">
          <NavLink
            className="dropdown-item bg-transparent text-dark fw-bold"
            aria-current="page"
            to="/"
            onClick={onUserLogout}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default ProfileDropDown;
