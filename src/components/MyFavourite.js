import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentCard from "./ContentCard";
const MyFavourite = () => {
  let { favourite } = useSelector((state) => state.favourite);
  let { contentCollection } = useSelector((state) => state.contentCollection);
  let [favouriteArray, setFavoriteArray] = useState([]);
  useEffect(() => {
    setFavoriteArray([
      ...contentCollection.filter((obj) => {
        return favourite.includes(obj._id);
      }),
    ]);
    // eslint-disable-next-line
  }, [favourite]);
  return (
    <div className="my-5">
      {favourite.length === 0 ? (
        <p className="text-center my-4 text-light">
          Add Some thing to Favorite
        </p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mx-2">
          {favouriteArray.map((obj, key) => {
            return <ContentCard obj={obj} key={key} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MyFavourite;
