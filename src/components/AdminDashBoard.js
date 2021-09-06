import React from "react";
import AdminTools from "./AdminTools";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserDashBoard from "./UserDashBoard";
import { useParams, useRouteMatch } from "react-router-dom";
import AddContent from "./AddContent";
const AdminDashBoard = () => {
  let { name } = useParams();
  let { path, url } = useRouteMatch();
  return (
    <BrowserRouter>
      <AdminTools url={url} />
      <Switch>
        <Route exact path={`${path}`}>
          <UserDashBoard />
        </Route>
        <Route path={`${path}/addcontent`}>
          <AddContent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AdminDashBoard;
