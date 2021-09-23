import React, { useEffect, useState, useContext } from "react";
import getAxiosWithTokenObj from "../../AuthorizedRequest/AxiosReqWithToken";
import LoadingContext from "../../context/toploadingbar/LoadingContext";
const ViewFeedback = () => {
  const { setProgress } = useContext(LoadingContext);
  let [feedback, setFeedback] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      let axiosReqWithToken = getAxiosWithTokenObj();
      setProgress(30);
      let response = await axiosReqWithToken.get("/comment/getallfeedback");
      setProgress(70);
      let data = response.data;
      if (data.message === "allfeedback") {
        setFeedback(data.payload);
      } else {
        alert(data.message);
      }
      setProgress(100);
    }
    fetchdata();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container mx-auto mt-5">
      {feedback.length !== 0 && (
        <div className="container bg-transparent">
          {feedback.map((obj, index) => {
            return (
              <div key={index} className="mt-3 py-1 bg-light rounded-pill">
                <h4 className="text-primary fw-bold mt-1 px-4">{obj.name}</h4>
                <p className="text-dark px-5">{obj.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewFeedback;
