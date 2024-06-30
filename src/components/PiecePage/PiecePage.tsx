import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";

function PiecePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreivew, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const [age, setAge] = useState(undefined);
  const [hall, setHall] = useState(0);
  const [arPath, setArPath] = useState(undefined);
  const [isMasterPiece, setIsMasterPiece] = useState(false);
  const [collectionId, setCollectionId] = useState(0);

  const [message, setMessage] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const [halls, setHalls] = useState([]);
  const [collections, setCollections] = useState([]);
  const user = JSON.parse(localStorage.getItem("cur-user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://40.90.236.58:3000/halls/museums/${user.museum}`
        );

        const col = await axios.get(
          `http://40.90.236.58:3000/museums/${user.museum}/collections`
        );

        setHalls(res.data.data || []);
        setCollections(col.data.data || []);
      } catch (error) {
        console.error("حدث خطأ");
      }
    };

    fetchData();
  }, [null]);

  const submitData = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isMasterpiece", isMasterPiece);
    formData.append("age", age);
    formData.append("museumId", user.museum);
    formData.append("hallId", hall);
    formData.append("collectionId", collectionId);
    formData.append("arPath", arPath);
    formData.append("image", image);

    const token = localStorage.getItem("token");
    try {
      setAddLoading(true);
      const res = await axios.post(
        "http://40.90.236.58:3000/pieces",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      location.href = "/pieces";
    } catch (error) {
      setAddLoading(false);
      setMessage("حدث خطأ الرجاء المحاولة مره أخرى");
    }
  };

  return (
    <div className="piece-page">
      <form className="form piece-info" onSubmit={submitData}>
        <div className="title">
          <h3>المعلومات الاساسية</h3>
        </div>
        <div className="data">
          <div className="elm">
            <label>الاسم</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
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
            <label>القاعة</label>
            <select
              className="hall-select type-select"
              onChange={(e) => {
                setHall(e.target.value);
              }}
            >
              <option value="">إختار القاعة.....</option>
              {halls.map((hall: any) => (
                <option key={hall.id} value={hall.id}>
                  {hall.name}
                </option>
              ))}
            </select>
          </div>
          <div className="elm">
            <label>النوع</label>
            <select
              className="collection-select type-select"
              onChange={(e) => {
                setCollectionId(e.target.value);
              }}
            >
              <option value="">إختار النوع.....</option>
              {collections.map((collection: any) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>
          <div className="elm">
            <label>العصر</label>
            <input
              type="text"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </div>
          <div className="elm">
            <label>ِAR URL</label>
            <input
              type="url"
              value={arPath}
              onChange={(e) => {
                setArPath(e.target.value);
              }}
            />
          </div>
          <div className="elm">
            <label>Master Piece</label>
            <select
              className="type-select"
              onChange={(e) => {
                setIsMasterPiece(e.target.value);
              }}
            >
              <option key="1" defaultChecked value={`false`}>
                NO
              </option>
              <option key="2" value={"true"}>
                YES
              </option>
            </select>
          </div>
          <div className="elm">
            <label>صورة القطعة</label>
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
            <p>يتم إضافة القطعة برجاء الانتظار</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PiecePage;
