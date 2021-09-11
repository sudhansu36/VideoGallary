import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="fluid-container bg-dark text-center mt-3 text-light py-2 px-1 position-absolute bottom-0 w-100">
      <div>
        <ul className="d-flex justify-content-center nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/aboutus">
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/features">
              Features
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/feedback">
              Feedback
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/help">
              Help
            </NavLink>
          </li>
          <li className="my-auto mx-1 nav-item">&copy; 2021,</li>
          <li className="my-auto mx-1 nav-item">mywebsite.com,</li>
          <li className="my-auto mx-1 nav-item">Inc. or its affiliates</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
