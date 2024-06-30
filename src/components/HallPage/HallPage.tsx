import { useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";

import "./HallPage.css";

function HallPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreivew, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreivew1, setImagePreview1] = useState("");
  const [image1, setImage1] = useState(null);
  const [audio, setAudio] = useState(null);
  const [visible, setVisible] = useState(false);
  const [hide, setHide] = useState(false);

  const [message, setMessage] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const [soundId, setSoundId] = useState(-1);

  const user = JSON.parse(localStorage.getItem("cur-user"));

  const handelAddSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("museum_id", user.museum);

    const token = localStorage.getItem("token");
    try {
      setAddLoading(true);
      const res = await axios.post("http://40.90.236.58:3000/halls", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSoundId(res.data.data.id);
      setAddLoading(false);
      setVisible(true);
      setHide(true);
    } catch (error) {
      setAddLoading(false);
      setMessage("حدث خطأ الرجاء المحاولة مره أخرى");
    }
  };

  const handelAudioSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image1);
    formData.append("audio", audio);

    const token = localStorage.getItem("token");
    try {
      setAddLoading(true);
      const res = await axios.post(
        `http://40.90.236.58:3000/halls/sound/${soundId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      location.href = "/halls";
    } catch (error) {
      setAddLoading(false);
      setMessage("حدث خطأ الرجاء المحاولة مره أخرى");
    }
  };

  return (
    <div className="hall-page">
      <form
        className={`hall-info form ${hide ? "hide" : ""}`}
        onSubmit={handelAddSubmit}
      >
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
          <div className="elm">
            <label>صورة القاعة</label>
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
          <input className="save-btn" type="submit" value="حفظ" />

          <div className="message">
            <p>{message}</p>
          </div>

          <div className={`loading ${addLoading ? "visible" : ""}`}>
            <Loading />
            <p>يتم إضافة القاعة برجاء الانتظار</p>
          </div>
        </div>
      </form>

      <form
        className={`hall-sound form ${visible ? "visible" : ""}`}
        onSubmit={handelAudioSubmit}
      >
        <div className="title">
          <h3>صوتيات القاعة</h3>
        </div>
        <div className="data">
          <div className="elm">
            <label>الصوت</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setAudio(file);
                console.log(file);
              }}
            />
          </div>
          <div className="elm">
            <div className="elm">
              <label>الصورة</label>
              <input
                required
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImage1(file);
                  const url = URL.createObjectURL(file);
                  setImagePreview1(url);
                }}
              />
              <div className="img-preview">
                <img src={imagePreivew1} />
              </div>
            </div>
          </div>
          <input className="save-btn" type="submit" value="حفظ" />

          <div className="message">
            <p>{message}</p>
          </div>

          <div className={`loading ${addLoading ? "visible" : ""}`}>
            <Loading />
            <p>يتم إضافة الصوت برجاء الانتظار</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HallPage;
