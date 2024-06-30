import "./App.css";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Welcome from "./components/ًWelcome/Welcome";
import Museums from "./components/Museums/Museums";
import MuseumPage from "./components/MuseumPage/MuseumPage";
import Categories from "./components/Categories/Categories";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import Users from "./components/Users/Users";
import UserPage from "./components/UserPage/UserPage";
import Logout from "./components/Logout/Logout";
import Pieces from "./components/Pieces/Pieces";
import PiecePage from "./components/PiecePage/PiecePage";
import Halls from "./components/Halls/Halls";
import HallPage from "./components/HallPage/HallPage";
import Collections from "./components/Collections/Collections";
import collectionPage from "./components/CollectionPage/CollectionPage";
import CollectionPage from "./components/CollectionPage/CollectionPage";
import Stories from "./components/Stories/Stories";
import StoryPage from "./components/StoryPage/StoryPage";

function App() {
  const handelLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return true;
  };

  if (handelLogin()) {
    return (
      <Router>
        <div className="page">
          <Sidebar />
          <Logout />
          <div className="content">
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/museums" exact component={Museums} />
              <Route path="/museums/add" exact component={MuseumPage} />
              <Route path="/museums/:id/edit" exact component={MuseumPage} />
              <Route path="/museum" exact component={MuseumPage} />
              <Route path="/categories" exact component={Categories} />
              <Route path="/categories/add" exact component={CategoryPage} />
              <Route
                path="/categories/:id/edit"
                exact
                component={CategoryPage}
              />
              <Route path="/users" exact component={Users} />
              <Route path="/users/add" exact component={UserPage} />
              <Route path="/pieces" exact component={Pieces} />
              <Route path="/pieces/add" exact component={PiecePage} />
              <Route path="/halls" exact component={Halls} />
              <Route path="/halls/add" exact component={HallPage} />
              <Route path="/collections" exact component={Collections} />
              <Route path="/collections/add" exact component={CollectionPage} />
              <Route path="/stories" exact component={Stories} />
              <Route path="/stories/add" exact component={StoryPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

  return <Login />;
}

export default App;
