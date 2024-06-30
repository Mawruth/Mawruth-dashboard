import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Stories.css";

function Stories() {
  const [allStories, setAllStories] = useState([]);
  const user = JSON.parse(localStorage.getItem("cur-user"));

  useEffect(() => {
    localStorage.removeItem("story");
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://40.90.236.58:3000/museums/${user.museum}/stories`
        );
        setAllStories(res.data.data);
      } catch (error) {
        console.error("حدث خطأ");
      }
    };

    fetchData();
  }, [null]);

  const handleRemoveItem = (itemToRemove: any) => {
    const updatedItems = allStories.filter((item) => item !== itemToRemove);
    setAllStories(updatedItems);
  };

  return (
    <div className="stories">
      <button className="add-story-btn">
        <Link to="/stories/add">إضافة قصة جديدة</Link>
      </button>
      <div className="data">
        {allStories.map((item: any) => (
          <div className="story" id={item.id} key={item.id}>
            <div className="story-img">
              <img src={item.image} />
            </div>
            <div className="story-data">
              <h2 className="story-name">{item.name}</h2>
            </div>
            <div className="story-control">
              <button
                className="edit-btn"
                onClick={(e) => {
                  localStorage.setItem("story", JSON.stringify(item));
                }}
              >
                <Link to={`/stories/${item.id}/edit`}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </button>
              <button
                className="delete-btn"
                onClick={async (e) => {
                  try {
                    const token = localStorage.getItem("token");

                    const res = await axios.delete(
                      `http://40.90.236.58:3000/museums/${user.museum}/stories/${item.id}`,
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

export default Stories;
