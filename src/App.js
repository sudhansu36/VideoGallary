import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reLogin } from "./store/userSlice";
import { getContent } from "./store/contentSlice";
import { getWatchList } from "./store/watchlistSlice";
import { getFavourite } from "./store/favouriteSlice";
import { decrypt } from "./AuthorizedRequest/EncriptionDecription";
import Loadingbar from "./components/Loading/Loadingbar";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import FeedbackForm from "./components/Footer/FeedbackForm";
import UserDashBoard from "./components/UserDashboard/UserDashBoard";
import AdminDashBoard from "./components/AdminDashboard/AdminDashBoard";
import Spinner from "./components/Loading/Spinner";
function App() {
  // Lazy Loadings
  let ResultPage = React.lazy(() =>
    import("./components/UserDashboard/ResultPage")
  );
  let SearchResult = React.lazy(() =>
    import("./components/UserDashboard/SearchResult")
  );
  let MoviePreview = React.lazy(() =>
    import("./components/UserDashboard/MoviePreview")
  );
  let MyWatchList = React.lazy(() =>
    import("./components/UserDashboard/MyWatchList")
  );
  let MyFavourite = React.lazy(() =>
    import("./components/UserDashboard/MyFavourite")
  );
  let VideoPlayer = React.lazy(() =>
    import("./components/UserDashboard/VideoPlayer")
  );
  let AddContent = React.lazy(() =>
    import("./components/AdminDashboard/AddContent")
  );
  let EditContent = React.lazy(() =>
    import("./components/AdminDashboard/EditContent")
  );
  let UserDetails = React.lazy(() =>
    import("./components/AdminDashboard/UserDetails")
  );
  let ViewFeedback = React.lazy(() =>
    import("./components/AdminDashboard/ViewFeedback")
  );
  let ProfilePage = React.lazy(() =>
    import("./components/Profile/ProfilePage")
  );
  let dispatch = useDispatch();
  let [token, setToken] = useState(null);
  let { isSuccess, userObj, isLoading } = useSelector((state) => state.user);
  let content = useSelector((state) => state.contentCollection);
  let watchlist = useSelector((state) => state.watchlist);
  let favourite = useSelector((state) => state.favourite);
  let [rmodal, setRModal] = useState(false);
  let [lmodal, setLModal] = useState(false);
  // Reading token for local storage
  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    // eslint-disable-next-line
  }, [isSuccess, token]);
  // For Refreshing of The page(* if you refresh the page then all state are refilled)
  useEffect(() => {
    if (JSON.stringify(userObj) === JSON.stringify({})) {
      let token = window.localStorage.getItem("token");
      let encryptedUser = window.localStorage.getItem("userObj");
      if (token && encryptedUser) {
        let user = decrypt(encryptedUser);
        dispatch(reLogin(user));
        dispatch(getContent());
        !user.isAdmin && dispatch(getWatchList({ email: user.email }));
        !user.isAdmin && dispatch(getFavourite({ email: user.email }));
      }
    }
    // eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      <div>
        {/* Top Loading Bar */}
        <Loadingbar />
        {/* Navbar */}
        <Navbar
          rmodal={rmodal}
          lmodal={lmodal}
          setLModal={setLModal}
          setRModal={setRModal}
          token={token}
          setToken={setToken}
        />
        {(isLoading ||
          content.isLoading ||
          watchlist.isLoading ||
          favourite.isLoading) && <Spinner />}
      </div>
      {/* Lazy Loading (Spinner) */}
      <Suspense
        fallback={
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        {/* Switch between Components */}
        <Switch>
          {/* Home Page */}
          <Route exact path="/">
            <Home setLModal={setLModal} token={token}/>
          </Route>
          {/* User Dashboard */}
          <Route path="/userdashboard/:name">
            <UserDashBoard />
          </Route>
          {/* Admin Dashboard + User Dashboard */}
          <Route exact path="/admindashboard/:name">
            <AdminDashBoard />
            <UserDashBoard />
          </Route>
          {/* Movie Result page based on type and data */}
          <Route exact path={`/result/:type/:data`}>
            <ResultPage />
          </Route>
          {/* Movie Priview */}
          <Route path={`/result/:id`}>
            <MoviePreview />
          </Route>
          {/* Add Content Page */}
          <Route exact path={`/admindashboard/:name/addcontent`}>
            <AddContent />
          </Route>
          {/* Watchlist */}
          <Route path="/mywatchlist">
            <MyWatchList />
          </Route>
          {/* Favourite */}
          <Route path="/myfavourite">
            <MyFavourite />
          </Route>
          {/* Search Result */}
          <Route path="/searchresult">
            <SearchResult />
          </Route>
          {/* Edit Content */}
          <Route path="/editcontent/:mid">
            <EditContent />
          </Route>
          {/* User Profile */}
          <Route path="/myprofile/:name">
            <ProfilePage />
          </Route>
          {/* Video Player */}
          <Route path="/playvideo">
            <VideoPlayer />
          </Route>
          {/* All User */}
          <Route path={`/admindashboard/:name/alluser`}>
            <UserDetails />
          </Route>
          {/* Feedback form Page */}
          <Route path="/feedback">
            <FeedbackForm />
          </Route>
          {/* Show Feedback */}
          <Route path={`/admindashboard/:name/showfeedback`}>
            <ViewFeedback />
          </Route>
        </Switch>
      </Suspense>
      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}
export default App;
