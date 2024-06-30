import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Collections.css";
import axios from "axios";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Collections() {
  const [allCollections, setAllCollections] = useState([]);
  const user = JSON.parse(localStorage.getItem("cur-user"));

  useEffect(() => {
    localStorage.removeItem("collection");
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://40.90.236.58:3000/museums/${user.museum}/collections`
        );
        setAllCollections(res.data.data);
      } catch (error) {
        console.error("حدث خطأ");
      }
    };

    fetchData();
  }, [null]);

  const handleRemoveItem = (itemToRemove: any) => {
    const updatedItems = allCollections.filter((item) => item !== itemToRemove);
    setAllCollections(updatedItems);
  };

  return (
    <div className="collections">
      <button className="add-collection-btn">
        <Link to="/collections/add">إضافة نوع جديد</Link>
      </button>
      <div className="data">
        {allCollections.map((item: any) => (
          <div className="collection" id={item.id} key={item.id}>
            <div className="collection-img">
              <img src={item.image} />
            </div>
            <div className="collection-data">
              <h2 className="collection-name">{item.name}</h2>
            </div>
            <div className="collection-control">
              <button
                className="edit-btn"
                onClick={(e) => {
                  localStorage.setItem("collection", JSON.stringify(item));
                }}
              >
                <Link to={`/collections/${item.id}/edit`}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </button>
              <button
                className="delete-btn"
                onClick={async (e) => {
                  try {
                    const token = localStorage.getItem("token");

                    const res = await axios.delete(
                      `http://40.90.236.58:3000/museums/${user.museum}/collections/${item.id}`,
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

export default Collections;
