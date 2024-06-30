import { Link } from "react-router-dom";
import "./Halls.css";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Halls.css";

function Halls() {
  const [allHalls, setAllHalls] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("cur-user"));
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://40.90.236.58:3000/halls/museums/${user.museum}`
        );
        if (res.data.data) setAllHalls(res.data.data);
      } catch (error) {
        console.error("حدث خطأ");
      }
    };

    fetchData();
  }, [null]);

  const handleRemoveItem = (itemToRemove: any) => {
    const updatedItems = allHalls.filter((item) => item !== itemToRemove);
    setAllHalls(updatedItems);
  };

  return (
    <div className="halls">
      <button className="add-hall-btn">
        <Link to="/halls/add">إضافة قاعة جديدة</Link>
      </button>
      <div className="data">
        {allHalls.map((item: any) => (
          <div className="hall" id={item.id} key={item.id}>
            <div className="hall-img">
              <img src={item.image_path} />
            </div>
            <div className="hall-data">
              <h2 className="hall-name">{item.name}</h2>
            </div>
            <div className="hall-control">
              <button
                className="edit-btn"
                onClick={(e) => {
                  localStorage.setItem("hall", JSON.stringify(item));
                }}
              >
                <Link to={`/categories/${item.id}/edit`}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </button>
              <button
                className="delete-btn"
                onClick={async (e) => {
                  try {
                    const token = localStorage.getItem("token");

                    const res = await axios.delete(
                      `http://40.90.236.58:3000/halls/${item.id}`,
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

export default Halls;
