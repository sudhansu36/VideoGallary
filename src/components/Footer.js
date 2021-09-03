import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="fluid-container bg-dark text-center text-light sticky-bottom py-2">
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
          <li className="my-auto nav-item">&copy; 2021</li>
          <li className="my-auto nav-item">mywebsite.com,</li>
          <li className="my-auto nav-item">Inc. or its affiliates</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;