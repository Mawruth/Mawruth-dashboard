import { useEffect, useState } from "react";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import EditBtn from "../EditBtn/EditBtn";
import "./Museums.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Museums() {
  const [allMuseums, setAllMuseums] = useState([]);

  useEffect(() => {
    localStorage.removeItem("museum");
    const fetchData = async () => {
      try {
        const res = await axios.get("http://40.90.236.58:3000/museums");
        setAllMuseums(res.data.data);
      } catch (error) {
        console.error("حدث خطأ");
      }
    };

    fetchData();
  }, [null]);

  const handleRemoveItem = (itemToRemove) => {
    const updatedItems = allMuseums.filter((item) => item !== itemToRemove);
    setAllMuseums(updatedItems);
  };

  return (
    <div className="museums">
      <button className="add-museum-btn">
        <Link to="/museums/add">إضافة متحف جديد</Link>
      </button>
      <div className="data">
        {allMuseums.map((item) => (
          <div className="museum" id={item.id} key={item.id}>
            <div className="museum-img">
              <img src={item.images[0].image_path} />
            </div>
            <div className="museum-data">
              <h2 className="museum-name">{item.name}</h2>
              <span className="location">{`${item.city} - ${item.street}`}</span>
              <div className="museum-categories">
                {item.categories.map((cat) => (
                  <span className="category" key={cat.category.id}>
                    {cat.category.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="museum-control">
              <button
                className="edit-btn"
                onClick={(e) => {
                  localStorage.setItem("museum", JSON.stringify(item));
                }}
              >
                <Link to={`/museums/${item.id}/edit`}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </button>
              <button
                className="delete-btn"
                onClick={async (e) => {
                  try {
                    const token = localStorage.getItem("token");

                    const res = await axios.delete(
                      `http://40.90.236.58:3000/museums/${item.id}`,
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

export default Museums;
