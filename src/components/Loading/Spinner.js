import React from "react";
import ReactLoading from "react-loading";
const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <ReactLoading type="cylon" color="#fe0000" />
    </div>
  );
};

export default Spinner;
