import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const Recommendations = ({ genres }) => {
  let history = useHistory();
  let { contentCollection } = useSelector((state) => state.contentCollection);
  let filteredData = contentCollection.filter((movie) => {
    let movieGenre = movie.genres;
    let newArray = movieGenre.filter((value) => genres.includes(value));
    return genres.includes(newArray[0]);
  });
  function moviePreview(movie) {
    history.push(`/result/${movie._id}`);
  }
  return (
    <div className="fluid-container">
      {filteredData.length !== 0 && (
        <>
          <h3 className="text-light fw-bold pt-3 px-4 pb-0">Similar</h3>
          <div className="d-flex flex-row flex-nowrap overflow-auto row row-cols-3 row-cols-md-6  row-cols-lg-8 scoll-pane m-0 py-1 px-4">
            {filteredData.map((obj) => {
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

export default Recommendations;
