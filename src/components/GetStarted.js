import React from "react";

const GetStarted = ({ setLModal }) => {
  return (
    <button
      type="button"
      className="btn btn-success btn-lg"
      onClick={() => setLModal(true)}
    >
      Get Started
    </button>
  );
};

export default GetStarted;
