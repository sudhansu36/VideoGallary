import React from "react";
import { useHistory } from "react-router-dom";
const Slider = ({ result, title }) => {
  let history = useHistory();
  function moviePreview(movie) {
    history.push(`/result/${movie._id}`);
  }
  return (
    <div>
      <h3 className="text-light fw-bold pt-1 px-4 pb-0 mb-0 pt-2">{title}</h3>
      <div className="d-flex flex-row flex-nowrap overflow-auto row row-cols-2 row-cols-sm-3 row-cols-md-6  row-cols-lg-8 scoll-pane m-0 py-1 px-4">
        {result.map((obj) => {
          return (
            <div className="card p-0 bg-transparent poster border-0 mx-2">
              <img
                src={obj.image}
                alt="..."
                onClick={() => moviePreview(obj)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
