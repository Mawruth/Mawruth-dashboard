import { useEffect, useState } from "react";
import "./CategoryPage.css";
import axios from "axios";
import Loading from "../Loading/Loading";

function CategoryPage(props: any) {
  const [submitBtn, setSubmitBtn] = useState("حفظ");
  const [imagePreivew, setImagePreview] = useState("");
  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const [update, setUpdate] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "يتم إضافة التصنيف برجاء الانتظار"
  );

  const [category, setCategory] = useState(null);

  if (props.match.path.includes("edit")) {
    useEffect(() => {
      const category = JSON.parse(localStorage.getItem("category"));
      setCategory(category);
      setName(category.name);
      setImagePreview(category.image);
      setUpdate(true);
    }, []);
  }

  const handelAddSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (!update) {
      formData.append("image", image);
      formData.append("name", name);
    }
    const token = localStorage.getItem("token");
    try {
      if (!update) {
        setAddLoading(true);
        const res = await axios.post(
          "http://40.90.236.58:3000/categories",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        location.href = "/categories";
      } else {
        setLoadingMessage("جاري التعديل برجاء الانتظار");
        setAddLoading(true);
        const data = {
          name,
        };

        try {
          const res = await axios.put(
            `http://40.90.236.58:3000/categories/update-name/${category.id}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log(res.data);

          if (image) {
            formData.append("image", image);
            await axios.put(
              `http://40.90.236.58:3000/categories/update-image/${category.id}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
          setAddLoading(false);
        } catch (error) {
          setAddLoading(false);
          console.log(error);
          setMessage("حدث خطأ حاول مره أخرى");
        }
      }
    } catch (error) {
      if (error.response.status === 409) {
        setAddLoading(false);
        setMessage("هذا التصنيف موجود سابقا");
      }
      setMessage("حدث خطأ الرجاء المحاولة مره أخرى");
    }
  };

  return (
    <div className="category-page">
      <form className="category-info" onSubmit={handelAddSubmit}>
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

export default CategoryPage;
