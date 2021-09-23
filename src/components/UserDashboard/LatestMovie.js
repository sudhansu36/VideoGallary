import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const LatestMovie = () => {
  let history = useHistory();
  let { contentCollection } = useSelector((state) => state.contentCollection);
  let [newContent, setNewContent] = useState([]);
  let content = JSON.parse(JSON.stringify(contentCollection));
  useEffect(() => {
    let sorted = content.sort((v1, v2) => {
      let date1 = v1.rdate.split("-");
      let date2 = v2.rdate.split("-");
      let ndate1 = new Date(date1[0], date1[1], date1[2]);
      let ndate2 = new Date(date2[0], date2[1], date2[2]);
      return ndate1 < ndate2 ? 1 : -1;
    });
    let tenmovie = [];
    for (let i = 0; i < 10; i++) {
      tenmovie.push(sorted[i]);
    }
    setNewContent(tenmovie);
    // eslint-disable-next-line
  }, [content]);
  function moviePreview(movie) {
    history.push(`/result/${movie._id}`);
  }
  return (
    <div className="fluid-container">
      {newContent.length !== 0 && (
        <>
          <h3 className="text-light fw-bold pt-1 px-4 pb-0">Latest Collection</h3>
          <div className="d-flex flex-row flex-nowrap overflow-auto row row-cols-3 row-cols-md-6  row-cols-lg-8 scoll-pane m-0 py-1 px-4">
            {newContent.map((obj) => {
              return (
                <div className="card p-0 bg-transparent poster border-0 mx-2">
                  <img
                    src={obj?.image}
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

export default LatestMovie;
