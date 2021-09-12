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
import UserDashBoard from "./components/UserDashBoard";
import AdminDashBoard from "./components/AdminDashBoard";
function App() {
  let [token, setToken] = useState(null);
  let { isSuccess, userObj } = useSelector((state) => state.user);
  // let UserDashBoard = React.lazy(() => import("./components/UserDashBoard"));
  // let AdminDashBoard = React.lazy(() => import("./components/AdminDashBoard"));
  let ResultPage = React.lazy(() => import("./components/ResultPage"));
  let MoviePreview = React.lazy(() => import("./components/MoviePreview"));
  let AddContent = React.lazy(() => import("./components/AddContent"));
  let MyWatchList = React.lazy(() => import("./components/MyWatchList"));
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
      let token = window.localStorage.getItem("token");
      let user = JSON.parse(window.localStorage.getItem("userObj"));
      if (token && user) {
        dispatch(reLogin(user));
        dispatch(getContent());
        !user.isAdmin && dispatch(getWatchList({ email: user.email }));
      }
    }
    // eslint-disable-next-line
  }, [isSuccess]);
  return (
    <QueryClientProvider client={queryClient}>
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
          </Switch>
          <Footer />
        </BrowserRouter>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
