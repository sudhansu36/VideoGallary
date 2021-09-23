import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Banner = () => {
  let { contentCollection, isSuccess } = useSelector(
    (state) => state.contentCollection
  );
  let [result, setResult] = useState({});
  useEffect(() => {
    setResult({
      ...contentCollection[
        Math.floor(Math.random() * contentCollection.length)
      ],
    });
    // eslint-disable-next-line
  }, [isSuccess]);
  return (
    <div>
      {JSON.stringify(result) !== JSON.stringify({}) && (
        <div
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${result.image})`,
            backgroundPosition: "top",
          }}
        >
          <div className="text-light px-3 pb-5 d-flex flex-column justify-content-end banner_content">
            <h1>{result?.mname}</h1>
            <p>{result?.mdesc}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
