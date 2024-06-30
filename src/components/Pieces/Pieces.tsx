import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Pieces.css";

function Pieces() {
  const [allPieces, setAllPieces] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("cur-user"));
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://40.90.236.58:3000/pieces/museum/${user.museum}?limit=100`
        );
        if (res.data.data) setAllPieces(res.data.data);
      } catch (error) {
        console.error("حدث خطأ");
      }
    };

    fetchData();
  }, [null]);

  const handleRemoveItem = (itemToRemove: any) => {
    const updatedItems = allPieces.filter((item) => item !== itemToRemove);
    setAllPieces(updatedItems);
  };

  return (
    <div className="pieces">
      <button className="add-piece-btn">
        <Link to="/pieces/add">إضافة قطعة جديدة</Link>
      </button>
      <div className="data">
        {allPieces.map((item: any) => (
          <div className="piece" id={item.id} key={item.id}>
            <div className="piece-img">
              <img src={item.image} />
            </div>
            <div className="piece-data">
              <h2 className="piece-name">{item.name}</h2>
            </div>
            <div className="piece-control">
              <button
                className="edit-btn"
                onClick={(e) => {
                  localStorage.setItem("piece", JSON.stringify(item));
                }}
              >
                <Link to={`/pieces/${item.id}/edit`}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </button>
              <button
                className="delete-btn"
                onClick={async (e) => {
                  try {
                    const token = localStorage.getItem("token");

                    const res = await axios.delete(
                      `http://40.90.236.58:3000/pieces/${item.id}`,
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

export default Pieces;
