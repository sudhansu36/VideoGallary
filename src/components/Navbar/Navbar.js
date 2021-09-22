import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import ProfileDropDown from "./ProfileDropDown";
import Searchbar from "./Searchbar";
const Navbar = ({ rmodal, lmodal, setRModal, setLModal, token, setToken }) => {
  let { userObj } = useSelector((state) => state.user);
  let { isAdmin, name } = userObj;
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* LOGO */}
          <a className="navbar-brand heartbeat" href="/">
            <i className="fab fa-waze fs-2 fw-bold text-warning">
              <span className="text-danger ms-1">Pri</span>
              <span className="text-primary me-1">lix</span>
            </i>
          </a>
          {/* Navbar Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {token ? (
              <>
                <ul className="navbar-nav se-auto mb-2 mb-lg-0">
                  <li className="nav-item text-light mx-2">
                    {/* Home/Dashboard */}
                    <NavLink
                      className="nav-link"
                      to={
                        isAdmin
                          ? `/admindashboard/${name}`
                          : `/userdashboard/${name}`
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item text-light mx-2">
                    {/* Movie */}
                    <NavLink className="nav-link" to="/result/Category/movie">
                      Movie
                    </NavLink>
                  </li>
                  <li className="nav-item text-light mx-2">
                    {/* Tv Show */}
                    <NavLink className="nav-link" to="/result/Category/series">
                      Tv Show
                    </NavLink>
                  </li>
                </ul>
                {/* Search Bar */}
                <Searchbar />
                {/* Profile Drop Down */}
                <ProfileDropDown setToken={setToken} />
              </>
            ) : (
              <ul className="navbar-nav mb-2 mb-lg-0 ms-auto ">
                <li className="nav-item">
                  {/* Sign in Button */}
                  <button
                    className="btn btn-outline-light border-0 noshadow"
                    type="submit"
                    onClick={() => setLModal(true)}
                  >
                    <i className="fas fa-user fs-6"> SignIn </i>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      {/* Login Modal */}
      <Login lmodal={lmodal} setLModal={setLModal} setRModal={setRModal} />
      {/* Register Modal */}
      <Register rmodal={rmodal} setLModal={setLModal} setRModal={setRModal} />
    </div>
  );
};

export default Navbar;
