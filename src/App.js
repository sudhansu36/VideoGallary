import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserDashBoard from "./components/UserDashBoard";
import AdminDashBoard from "./components/AdminDashBoard";
import Footer from "./components/Footer";
import Loadingbar from "./components/Loadingbar";
import { useState } from "react";
function App() {
  let [rmodal, setRModal] = useState(false);
  let [lmodal, setLModal] = useState(false);
  return (
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
  );
}
export default App;
