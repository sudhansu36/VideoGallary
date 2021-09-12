import React from "react";
import { useSelector } from "react-redux";
import ContentCard from "./ContentCard";
const MyWatchList = () => {
  let { watchList } = useSelector((state) => state.watchlist);
  return (
    <div>
      {watchList.length === 0 ? (
        <p className="text-center my-4 text-light">Add Some thing to watch List</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mx-2">
          {watchList.map((obj, key) => {
            return <ContentCard obj={obj} key={key} />;
          })}
        </div>
      )}
    </div>
  );
};
export default MyWatchList;
