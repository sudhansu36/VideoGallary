import React, { Suspense } from "react";
import AdminTools from "./AdminTools";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserDashBoard from "./UserDashBoard";
import { useRouteMatch } from "react-router-dom";
import AddContent from "./AddContent";
const AdminDashBoard = () => {
  let ResultPage=React.lazy(() =>import("./ResultPage"))
  let { path, url } = useRouteMatch();
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
        <AdminTools url={url} />
        <Switch>
          <Route exact path={`${path}`}>
            <UserDashBoard />
          </Route>
          <Route path={`${path}/addcontent`}>
            <AddContent />
          </Route>
          <Route path={`${path}/result/:type/:data`}>
            <ResultPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default AdminDashBoard;
