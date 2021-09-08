import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loadingbar from "./components/Loadingbar";
import React, { useState, Suspense } from "react";
function App() {
  let UserDashBoard = React.lazy(() => import("./components/UserDashBoard"));
  let AdminDashBoard = React.lazy(() => import("./components/AdminDashBoard"));
  let [rmodal, setRModal] = useState(false);
  let [lmodal, setLModal] = useState(false);
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
        <div className="App">
          <Loadingbar />
          <Navbar
            rmodal={rmodal}
            lmodal={lmodal}
            setLModal={setLModal}
            setRModal={setRModal}
          />
        </div>
        <Switch>
          <Route exact path="/">
            <Home setLModal={setLModal} />
          </Route>
          <Route path="/userdashboard/:name">
            <UserDashBoard />
          </Route>
          <Route path="/admindashboard/:name">
            <AdminDashBoard />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
}
export default App;
