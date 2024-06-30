import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Users.css";

import defaultUser from "./../../assets/images/user 1.png";

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const curUser = JSON.parse(localStorage.getItem("cur-user"));
  useEffect(() => {
    localStorage.removeItem("user");
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://40.90.236.58:3000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.data.filter((item) => item.id != curUser.id);
        setAllUsers(data);
      } catch (error) {
        console.error("حدث خطأ");
      }
    };

    fetchData();
  }, [null]);

  const handleRemoveItem = (itemToRemove: any) => {
    const updatedItems = allUsers.filter((item) => item !== itemToRemove);
    setAllUsers(updatedItems);
  };

  return (
    <div className="users">
      <button className="add-user-btn">
        <Link to="/users/add">إضافة مستخدم جديد</Link>
      </button>
      <div className="data">
        {allUsers.map((item: any) => (
          <div className="user" id={item.id} key={item.id}>
            <div className="user-img">
              <img src={item.image ? item.image : defaultUser} />
            </div>
            <div className="user-data">
              <h2 className="user-name">{item.name}</h2>
              <p className="user-username">إسم المستخدم : {item.username}</p>
              <p className="user-type">{item.type}</p>
            </div>
            <div className="user-control">
              <button
                className="delete-btn"
                onClick={async (e) => {
                  try {
                    const token = localStorage.getItem("token");

                    const res = await axios.delete(
                      `http://40.90.236.58:3000/users/${item.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    handleRemoveItem(item);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {""}
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
