import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import ContentCard from "./ContentCard";
const ResultPage = () => {
  let { contentCollection, isSuccess } = useSelector(
    (state) => state.contentCollection
  );
  let { type, data } = useParams();
  let [result, setResult] = useState([]);
  // let queryClient = useQueryClient();
  // let contentCollections = queryClient.getQueryData("contentCollection");
  // console.log("QueryData", contentCollections);
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
        })
      );
    }
  }, [isSuccess, data]);
  return (
    <div className="fluid-container my-4">
      {result.length === 0 ? (
        <p className="text-center text-info">No Result....</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mx-2">
          {result.map((obj, key) => {
            return <ContentCard obj={obj} key={key} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
