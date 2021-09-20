import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loadingbar from "./components/Loadingbar";
import React, { useState, useEffect, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { reLogin } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getContent } from "./store/contentSlice";
import { getWatchList } from "./store/watchlistSlice";
import { getFavourite } from "./store/favouriteSlice";
import UserDashBoard from "./components/UserDashBoard";
import AdminDashBoard from "./components/AdminDashBoard";
import { decrypt } from "./AuthorizedRequest/EncriptionDecription";
import ProfilePage from "./components/ProfilePage";
import FeedbackForm from "./components/FeedbackForm";
function App() {
  let [token, setToken] = useState(null);
  let { isSuccess, userObj } = useSelector((state) => state.user);
  let ResultPage = React.lazy(() => import("./components/ResultPage"));
  let SearchResult = React.lazy(() => import("./components/SearchResult"));
  let MoviePreview = React.lazy(() => import("./components/MoviePreview"));
  let AddContent = React.lazy(() => import("./components/AddContent"));
  let MyWatchList = React.lazy(() => import("./components/MyWatchList"));
  let MyFavourite = React.lazy(() => import("./components/MyFavourite"));
  let EditContent = React.lazy(() => import("./components/EditContent"));
  let VideoPlayer = React.lazy(() => import("./components/VideoPlayer"));
  let UserDetails = React.lazy(() => import("./components/UserDetails"));
  let [rmodal, setRModal] = useState(false);
  let [lmodal, setLModal] = useState(false);
  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    // eslint-disable-next-line
  }, [isSuccess, token]);
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });
  let dispatch = useDispatch();
  useEffect(() => {
    if (JSON.stringify(userObj) === JSON.stringify({})) {
      console.log("I am");
      let token = window.localStorage.getItem("token");
      let encryptedUser = window.localStorage.getItem("userObj");
      if (token && encryptedUser) {
        console.log("keep");
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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Loadingbar />
          <Navbar
            rmodal={rmodal}
            lmodal={lmodal}
            setLModal={setLModal}
            setRModal={setRModal}
            token={token}
            setToken={setToken}
          />
        </div>
        <Suspense
          fallback={
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <Switch>
            <Route exact path="/">
              <Home setLModal={setLModal} />
            </Route>
            <Route path="/userdashboard/:name">
              <UserDashBoard />
            </Route>
            <Route exact path="/admindashboard/:name">
              <AdminDashBoard />
              <UserDashBoard />
            </Route>
            <Route exact path={`/result/:type/:data`}>
              <ResultPage />
            </Route>
            <Route path={`/result/:id`}>
              <MoviePreview />
            </Route>
            <Route exact path={`/admindashboard/:name/addcontent`}>
              <AddContent />
            </Route>
            <Route path="/mywatchlist">
              <MyWatchList />
            </Route>
            <Route path="/myfavourite">
              <MyFavourite />
            </Route>
            <Route path="/searchresult">
              <SearchResult />
            </Route>
            <Route path="/editcontent/:mid">
              <EditContent />
            </Route>
            <Route path="/myprofile/:name">
              <ProfilePage />
            </Route>
            <Route path="/playvideo">
              <VideoPlayer />
            </Route>
            <Route path={`/admindashboard/:name/alluser`}>
              <UserDetails />
            </Route>
            <Route path="/feedback">
              <FeedbackForm />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
