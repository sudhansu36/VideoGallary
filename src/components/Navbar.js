import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Login from "./Login";
import Register from "./Register";
const Navbar = (props) => {
  let [rmodal, setRModal] = useState(true);
  return (
    <div>
      <LoadingBar height={3} color="#f11946" progress={props.progress} />
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <i className="fab fa-waze fs-2 fw-bold text-warning">
              <span className="text-danger ms-1">Pri</span>
              <span className="text-primary me-1">lix</span>
            </i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
            </ul> */}
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto ">
              <li className="nav-item">
                <button
                  className="btn btn-outline-light border-0"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#login"
                >
                  <i className="fas fa-user fs-6"> SignIn </i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Login
        setProgress={props.setProgress}
        rmodal={rmodal}
        setRModal={setRModal}
      />
      <Register
        setProgress={props.setProgress}
        rmodal={rmodal}
        setRModal={setRModal}
      />
    </div>
  );
};

export default Navbar;
