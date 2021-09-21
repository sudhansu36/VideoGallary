import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const MovieSliderWF = ({ type }) => {
  let history = useHistory();
  let { watchList } = useSelector((state) => state.watchlist);
  let { favourite } = useSelector((state) => state.favourite);
  let { contentCollection } = useSelector((state) => state.contentCollection);
  let [state, setState] = useState([]);
  useEffect(() => {
    if (type === "Watchlist") {
      let watchListArray = contentCollection.filter((obj) => {
        return watchList.includes(obj._id);
      });
      setState(watchListArray);
    }
    if (type === "Favourite") {
      setState([
        ...contentCollection.filter((obj) => {
          return favourite.includes(obj._id);
        }),
      ]);
    }
    // eslint-disable-next-line
  }, [contentCollection, watchList, favourite]);
  function moviePreview(movie) {
    history.push(`/result/${movie._id}`);
  }

  return (
    <div className="fluid-container">
      {state.length !== 0 && (
        <>
          <h3 className="text-light fw-bold pt-1 px-4 pb-0">{type}</h3>
          <div className="d-flex flex-row flex-nowrap overflow-auto row row-cols-3 row-cols-md-6  row-cols-lg-8 scoll-pane m-0 py-1 px-4">
            {state.map((obj, index) => {
              return (
                <div
                  className="card p-0 bg-transparent poster border-0 mx-2"
                  key={index}
                >
                  <img
                    src={obj.image}
                    alt="..."
                    onClick={() => moviePreview(obj)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieSliderWF;
