import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

import "./MuseumPage.css";
import axios from "axios";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../Loading/Loading";

function MuseumPage(props) {
  const [submitBtn, setSubmitBtn] = useState("حفظ");
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [imagePreivew, setImagePreview] = useState("");
  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const [update, setUpdate] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [museum, SetMuseum] = useState(null);

  const [loadingMessage, setLoadingMessage] = useState(
    "يتم إضافة المتحف برجاء الانتظار"
  );

  useEffect(() => {
    const museumLocalData = JSON.parse(localStorage.getItem("museum"));
    if (museumLocalData) {
      SetMuseum(museumLocalData);
      let categories = [];
      museumLocalData.categories.map((item) => {
        const elm = {
          name: item.category.name,
          id: item.category.id,
        };

        categories.push(elm);
      });
      setName(museumLocalData.name);
      setDescription(museumLocalData.description);
      setCity(museumLocalData.city);
      setStreet(museumLocalData.street);
      setImagePreview(museumLocalData.images[0].image_path);
      setSelectedItems(categories);
      setUpdate(true);
    }
  }, [null]);

  const handleSelectChange = (event: any) => {
    const selectedItemName = event.target.value.split(",")[0];
    const selectedItemID = event.target.value.split(",")[1];
    const item = { name: selectedItemName, id: selectedItemID };
    setSelectedItem(item);
    if (item && item.name && item.id) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (itemToRemove: any) => {
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
    setSelectedItems(updatedItems);
  };

  const handleRemoveItemUpdare = (itemToRemove: any) => {
    const updatedItems = selectedItems.filter((item) => item !== itemToRemove);
    setSelectedItems(updatedItems);
  };

  const handelAddSubmit = async (event) => {
    event.preventDefault();

    const finalCategories = selectedItems.map((item) => +item.id);

    const museumData = {
      name,
      description,
      city,
      street,
      categories: finalCategories,
    };

    const formData = new FormData();
    formData.append("images", image);

    const token = localStorage.getItem("token");
    let added = -1;
    try {
      setAddLoading(true);
      if (!update) {
        const res = await axios.post(
          "http://40.90.236.58:3000/museums",
          museumData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const museumId = res.data.data.id;
        added = museumId;
        formData.append("museumId", museumId);
        const img = await axios.post(
          "http://40.90.236.58:3000/museums/upload-images",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        location.href = "/museums";
      } else {
        setLoadingMessage("جاري التعديل برجاء الانتظار");
        const res = await axios.patch(
          `http://40.90.236.58:3000/museums/${museum.id}`,
          museumData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (image) {
          const imgUrl = museum.images[0].image_path;
          await axios.delete(
            `http://40.90.236.58:3000/museums/remove-images/${museum.id}?imageUrls=${imgUrl}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const formData1 = new FormData();
          formData1.append("images", image);
          formData1.append("museumId", museum.id);
          const img = await axios.post(
            "http://40.90.236.58:3000/museums/upload-images",
            formData1,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        setAddLoading(false);
      }
    } catch (error) {
      setAddLoading(false);
      console.log(error);
      if (error.response.status === 409) {
        setMessage("هذا المتحف موجود سابقا");
      }
      // add delete museum
      if (added != -1) {
        await axios.delete(`http://40.90.236.58:3000/museums/${added}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setMessage("حدث خطأ الرجاء المحاولة مره أخرى");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://40.90.236.58:3000/categories");
        setCategories(res.data.data);
      } catch (error) {
        console.error("حدث خطأ");
      }
    };

    fetchData();
  }, [null]);

  return (
    <div className="museum-page">
      <form className="museum-info" onSubmit={handelAddSubmit}>
        <div className="title">
          <h3>المعلومات الاساسية</h3>
        </div>
        <div className="data">
          <div className="elm">
            <label>الاسم</label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
          <div className="elm">
            <label>الوصف</label>
            <textarea
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            ></textarea>
          </div>
          <div className="address">
            <div className="elm">
              <label>المدينة</label>
              <input
                type="text"
                required
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                value={city}
              />
            </div>
            <div className="elm">
              <label>الشارع</label>
              <input
                type="text"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
                value={street}
              />
            </div>
          </div>
          <div className="elm">
            <label>التصنيفات</label>
            <select className="cat-select" onChange={handleSelectChange}>
              <option value="">إختار تصنيف.....</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={`${cat.name},${cat.id}`}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="selected-item">
              {selectedItems.map((item: any, index) => (
                <div className="item" key={index}>
                  {item.name}
                  <span className="del" onClick={() => handleRemoveItem(item)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="elm">
            <label>صورة المتحف</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImage(file);
                const url = URL.createObjectURL(file);
                setImagePreview(url);
              }}
            />
            <div className="img-preview">
              <img src={imagePreivew} />
            </div>
          </div>
          <input className="login-btn" type="submit" value={submitBtn} />

          <div className="message">
            <p>{message}</p>
          </div>

          <div className={`loading ${addLoading ? "visible" : ""}`}>
            <Loading />
            <p>{loadingMessage}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MuseumPage;
