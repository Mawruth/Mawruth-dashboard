import AdminStatistics from "../AdminStatistics/AdminStatistics";
import Museums from "../Museums/Museums";
import Sidebar from "../Sidebar/Sidebar";
import Welcome from "../ًWelcome/Welcome";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <Welcome />
    </div>
  );
}

export default HomePage;
