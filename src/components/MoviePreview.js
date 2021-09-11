import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const MoviePreview = () => {
  let { contentCollection, isSucess } = useSelector(
    (state) => state.contentCollection
  );
  let [state, setState] = useState(null);
  console.log("ContCol", contentCollection);
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    let value = contentCollection.find((value) => value._id === id);
    console.log(value);
    setState(value);
  }, [isSucess]);
  console.log(state);
  return (
    <div className="card bg-dark text-white">
      {state && (
        <>
          <img src={state.image} className="card-img" alt="..." />
          <div className="card-img-overlay col-7 opacity-75">
            <h5 className="card-title">{state.title}</h5>
            <p className="card-text">{state.mdesc}</p>
            <p className="card-text">{state.rdate}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePreview;
