import React, { useEffect, Suspense } from "react";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosReqWithToken";
import TypeCard from "./TypeCard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
const UserDashBoard = () => {
  let ResultPage = React.lazy(() => import("./ResultPage"));
  let axiosReqWithToken = getAxiosWithTokenObj();
  let categories = ["movie", "series"];
  let languages = [
    "English",
    "Hindi",
    "Telugu",
    "Tamil",
    "Kannada",
    "Malayalam",
    "Bengali",
    "Panjabi",
    "Marathi",
  ];
  let genres = [
    "Action",
    "Horror",
    "Crime",
    "Romanse",
    "Drama",
    "Science fiction",
    "Comedy",
    "Thriller",
    "Adventure",
    "Biographical",
    "Fantasy",
    "Anime",
  ];
  useEffect(() => {
    try {
      async function fetchData() {
        let response = await axiosReqWithToken.get("/content/getcontent");
        console.log(response);
      }
      fetchData();
    } catch (e) {
      alert("Error", e.message);
    }
  }, []);
  let { path} = useRouteMatch();

  return (
    <Suspense
      fallback={
        <div
          className="spinner-border text-light text-center my-2"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      }
    >
      <BrowserRouter>
        <Switch>
          <Route exact path={`${path}`}>
            <div className="fluid-container">
              <TypeCard title="Categories" collection={categories} />
              <TypeCard title="Languages" collection={languages} />
              <TypeCard title="Genres" collection={genres} />
            </div>
          </Route>
          <Route path={`${path}/result/:type/:data`}>
            <ResultPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default UserDashBoard;
