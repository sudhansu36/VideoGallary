import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "./Slider";
const MovieSliderWF = ({ type }) => {
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
  return (
    <div className="fluid-container">
      {state.length !== 0 && <Slider result={state} title={type} />}
    </div>
  );
};

export default MovieSliderWF;
