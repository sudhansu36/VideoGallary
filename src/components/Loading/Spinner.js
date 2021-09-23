import React from "react";
import ReactLoading from "react-loading";
const Spinner = () => {
  return (
    <div className="spinner">
      <ReactLoading type="cylon" color="#fe0000" />
    </div>
  );
};

export default Spinner;
