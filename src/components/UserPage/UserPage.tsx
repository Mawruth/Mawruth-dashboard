import { useEffect, useState } from "react";
import "./UserPage.css";
import axios from "axios";
import Loading from "../Loading/Loading";

function UserPage() {
  const [submitBtn, setSubmitBtn] = useState("حفظ");

  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("SUPPER_ADMIN");
  const [museums, setMuseums] = useState([]);
  const [museumId, setMuseumId] = useState(0);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    const getMuseums = async () => {
      const res = await axios.get("http://40.90.236.58:3000/museums");
      const data = res.data.data.map((elm) => {
        const item = {
          id: elm.id,
          name: elm.name,
        };

        return item;
      });

      setMuseums(data);
    };

    getMuseums();
  }, [null]);

  const handelChangeType = (event) => {
    setType(event.target.value);
    if (type === "SUPER_ADMIN") {
      setMuseumId(null);
    }
  };

  const handelAddSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
      type,
      username,
      museumId,
    };

    const token = localStorage.getItem("token");
    try {
      setAddLoading(true);
      const res = await axios.post("http://40.90.236.58:3000/users", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      location.href = "/users";
    } catch (error) {
      setAddLoading(false);
      if (
        error.response.status === 409 ||
        error.response.data.message == "User already exists"
      ) {
        setMessage("هذا المستخدم موجود سابقا");
      } else setMessage("حدث خطأ الرجاء المحاولة مره أخرى");
      console.log(error);
    }
  };

  return (
    <div className="user-page">
      <form className="user-info" onSubmit={handelAddSubmit}>
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
              required
            />
          </div>
          <div className="elm">
            <label>إسم المستخدم</label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              required
            />
          </div>
          <div className="elm">
            <label>البريد الالكتروني</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
          </div>
          <div className="elm">
            <label>كلمة المرور</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
          </div>
          <div className="elm">
            <label>نوع المستخدم</label>
            <select className="type-select" onChange={handelChangeType}>
              <option key="1" defaultChecked value="SUPPER_ADMIN">
                سوبر أدمن
              </option>
              <option key="2" value="MUSEUMS_ADMIN">
                أدمن متحف
              </option>
            </select>
          </div>
          <div
            className={`museum-select-list elm ${
              type == "MUSEUMS_ADMIN" ? "visible" : ""
            }`}
          >
            <label>المتحف</label>
            <select
              className="museum-select type-select"
              onChange={(e) => {
                setMuseumId(+e.target.value);
              }}
            >
              <option value="">إختار متحف.....</option>
              {museums.map((museum: any) => (
                <option key={museum.id} value={museum.id}>
                  {museum.name}
                </option>
              ))}
            </select>
          </div>
          <input className="login-btn" type="submit" value={submitBtn} />

          <div className="message">
            <p>{message}</p>
          </div>
          <div className={`loading ${addLoading ? "visible" : ""}`}>
            <Loading />
            <p>يتم إضافة المتسخدم برجاء الانتظار</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserPage;
