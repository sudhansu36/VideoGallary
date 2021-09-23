import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const MovieSlider = ({ type, data }) => {
  let history = useHistory();
  let { contentCollection } = useSelector(
    (state) => state.contentCollection
  );
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
          return 0
        })
      );
    }
    // eslint-disable-next-line
  }, [contentCollection, data]);
  function moviePreview(movie) {
    history.push(`/result/${movie._id}`);
  }
  return (
    <div className="fluid-container">
      {result.length !== 0 && (
        <>
          <h3 className="text-light fw-bold pt-1 px-4 pb-0">{data}</h3>
          <div className="d-flex flex-row flex-nowrap overflow-auto row row-cols-3 row-cols-md-6  row-cols-lg-8 scoll-pane m-0 py-1 px-4">
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
        </>
      )}
    </div>
  );
};

export default MovieSlider;
