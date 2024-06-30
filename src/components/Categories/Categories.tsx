import { Link } from "react-router-dom";

import "./Categories.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Categories() {
  const [allCategorois, setAllCategorois] = useState([]);

  useEffect(() => {
    localStorage.removeItem("category");
    const fetchData = async () => {
      try {
        const res = await axios.get("http://40.90.236.58:3000/categories");
        setAllCategorois(res.data.data);
      } catch (error) {
        console.error("حدث خطأ");
      }
    };

    fetchData();
  }, [null]);

  const handleRemoveItem = (itemToRemove: any) => {
    const updatedItems = allCategorois.filter((item) => item !== itemToRemove);
    setAllCategorois(updatedItems);
  };

  return (
    <div className="categories">
      <button className="add-category-btn">
        <Link to="/categories/add">إضافة تصنيف جديد</Link>
      </button>
      <div className="data">
        {allCategorois.map((item: any) => (
          <div className="category" id={item.id} key={item.id}>
            <div className="category-img">
              <img src={item.image} />
            </div>
            <div className="category-data">
              <h2 className="category-name">{item.name}</h2>
            </div>
            <div className="category-control">
              <button
                className="edit-btn"
                onClick={(e) => {
                  localStorage.setItem("category", JSON.stringify(item));
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
                      `http://40.90.236.58:3000/categories/${item.id}`,
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

export default Categories;
