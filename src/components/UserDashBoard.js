import React, { useEffect, useContext } from "react";
// import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosReqWithToken";
import TypeCard from "./TypeCard";
// import { useQuery } from "react-query";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";
import LoadingContext from "../context/toploadingbar/LoadingContext";
import { getContent, clearContentState } from "../store/contentSlice";
import { getWatchList } from "../store/watchlistSlice";
import MovieSlider from "./MovieSlider";
import MovieSliderWF from "./MovieSliderWF";
import { getFavourite } from "../store/favouriteSlice";
// const fetchData = async () => {
//   try {
//     let axiosReqWithToken = getAxiosWithTokenObj();
//     let response = await axiosReqWithToken.get("/content/getcontent");
//     let contentObj = response.data;
//     return contentObj.payload;
//   } catch (e) {
//     alert("Error", e);
//   }
// };
const UserDashBoard = () => {
  const { setProgress } = useContext(LoadingContext);
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
    "Romance",
    "Drama",
    "Science fiction",
    "Comedy",
    "Thriller",
    "Adventure",
    "Biographical",
    "Fantasy",
    "Anime",
  ];
  let user = useSelector((state) => state.user);
  let { contentCollection } = useSelector((state) => state.contentCollection);
  let userObj = user.userObj;
  let { email, isAdmin } = userObj;
  let dispatch = useDispatch(clearContentState);
  useEffect(() => {
    if (contentCollection.length === 0) {
      setProgress(30);
      dispatch(getContent());
      setProgress(60);
      !isAdmin && dispatch(getWatchList({ email: email }));
      !isAdmin && dispatch(getFavourite({ email: email }));
      setProgress(100);
    }
    // eslint-disable-next-line
  }, []);
  // let { status, error, data } = useQuery("contentCollection", fetchData);
  // console.log("data", data);
  // if (status === "loading") {
  //   setProgress(50);
  // }
  // if (status === "success") {
  //   setProgress(100);
  // }
  // if (status === "error") {
  //   alert(error.message);
  // }
  return (
    <div className="fluid-container">
      <Banner />
      <MovieSliderWF type="Watchlist" />
      <MovieSliderWF type="Favourite" />
      <TypeCard title="Genres" collection={genres} />
      <TypeCard title="Languages" collection={languages} />
      <TypeCard title="Category" collection={categories} />
      {genres.map((data) => {
        return <MovieSlider type="Genres" data={data} />;
      })}
    </div>
  );
};

export default UserDashBoard;
