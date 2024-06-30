import { useState } from "react";
import "./CollectionPage.css";
import axios from "axios";
import Loading from "../Loading/Loading";

function CollectionPage() {
  const [submitBtn, setSubmitBtn] = useState("حفظ");
  const [imagePreivew, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("cur-user"));

  const handelAddSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    const token = localStorage.getItem("token");
    try {
      setAddLoading(true);
      const res = await axios.post(
        `http://40.90.236.58:3000/museums/${user.museum}/collections`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      location.href = "/collections";
    } catch (error) {
      setAddLoading(false);
      if (error.response.status === 409) {
        setAddLoading(false);
        setMessage("هذا النوع موجود سابقا");
      }
      setMessage("حدث خطأ الرجاء المحاولة مره أخرى");
    }
  };

  return (
    <div className="collection-page">
      <form className="collection-info form" onSubmit={handelAddSubmit}>
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
            <label>الصورة</label>
            <input
              required
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
          <input
            className="login-btn save-btn"
            type="submit"
            value={submitBtn}
          />

          <div className="message">
            <p>{message}</p>
          </div>
          <div className={`loading ${addLoading ? "visible" : ""}`}>
            <Loading />
            <p>يتم إضافة النوع برجاء الانتظار</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CollectionPage;
