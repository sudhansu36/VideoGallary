import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserDashBoard from "./components/UserDashBoard";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div style={{ marginTop: "56px" }}></div>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/userdashboard">
          <UserDashBoard />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
