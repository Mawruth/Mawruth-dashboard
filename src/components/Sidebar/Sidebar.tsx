import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo 1.png";
import userLogo from "./../../assets/images/user 1.png";
import "./Sidebar.css";

const superAdminList = [
  {
    name: "المتاحف",
    url: "/museums",
  },

  {
    name: "التصنيفات",
    url: "/categories",
  },

  {
    name: "إدارة المستخدمين",
    url: "/users",
  },
];

const adminList = [
  {
    name: "إدارة المتحف",
    url: "/museum",
  },
  {
    name: "القاعات",
    url: "/halls",
  },
  {
    name: "المقتنيات",
    url: "/collections",
  },
  {
    name: "القطع",
    url: "/pieces",
  },
  {
    name: "القصص",
    url: "/stories",
  },
];

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("cur-user"));
  const museum = JSON.parse(localStorage.getItem("museum"));

  const list =
    museum && user.type === "MUSEUMS_ADMIN" ? adminList : superAdminList;

  return (
    <div className="aside">
      <aside className="side-bar">
        <div className="logo-img">
          <Link to="/">
            <img src={logo} />
          </Link>
          <h2 className="user-name">مرحبا {user.name}</h2>
          <h2 className="museum-name">{museum ? museum.name : ""}</h2>
        </div>
        <ul className="side-bar-elm ">
          {list.map((item, index) => (
            <li key={index}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
