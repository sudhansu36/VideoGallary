import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserDashBoard from "./components/UserDashBoard";
import AdminDashBoard from "./components/AdminDashBoard";
import Footer from "./components/Footer";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
function App() {
  const [progress, setProgress] = useState(0);
  return (
    <BrowserRouter>
      <div className="App">
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Navbar setProgress={setProgress} />
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/userdashboard">
          <UserDashBoard />
        </Route>
        <Route path="/admindashboard">
          <AdminDashBoard />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
