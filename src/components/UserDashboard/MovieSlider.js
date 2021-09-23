import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "./Slider";
const MovieSlider = ({ type, data }) => {
  let { contentCollection } = useSelector((state) => state.contentCollection);
  let [result, setResult] = useState([]);
  useEffect(() => {
    if (contentCollection.length !== 0) {
      setResult(
        contentCollection.filter((value, index) => {
          if (type === "Category") {
            return value.category === data;
          }
          if (type === "Genres") {
            let genres = value.genres;
            let arr = genres.filter((genre) => genre === data);
            return arr[0] === data;
          }
          if (type === "Languages") {
            let languages = value.languages;
            let arr = languages.filter((language) => language === data);
            return arr[0] === data;
          }
          return 0;
        })
      );
    }
    // eslint-disable-next-line
  }, [contentCollection, data]);

  return (
    <div className="fluid-container"> 
      {result.length !== 0 && <Slider result={result} title={data} />}
    </div>
  );
};

export default MovieSlider;
