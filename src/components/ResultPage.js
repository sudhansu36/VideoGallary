import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosReqWithToken";
import { useDispatch } from "react-redux";
import { clearLoginState } from "../store/userSlice";
import ContentCard from "./ContentCard";
const ResultPage = () => {
  let dispatch = useDispatch();
  let axiosReqWithToken = getAxiosWithTokenObj();
  let { type, data } = useParams();
  let [result, setResult] = useState([]);
  useEffect(() => {
    try {
      async function fetchData() {
        let response = await axiosReqWithToken.get(`/content/${type}/${data}`);
        let contentObj = response.data;
        console.log(contentObj);
        if (contentObj.message === "success") {
          setResult([...contentObj.payload]);
        } else {
          localStorage.clear();
          dispatch(clearLoginState());
        }
      }
      fetchData();
    } catch (e) {
      alert("Error", e.message);
    }
  }, []);
  return (
    <div className="fluid-container">
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
