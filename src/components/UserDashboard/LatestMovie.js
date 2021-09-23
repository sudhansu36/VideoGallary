import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "./Slider";
const LatestMovie = () => {
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
  return (
    <div className="fluid-container">
      {newContent.length !== 0 && (
        <Slider result={newContent} title="Latest Collection" />
      )}
    </div>
  );
};

export default LatestMovie;
