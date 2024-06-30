import "./login.css";
import logo from "./../../assets/images/logo 1.png";
import { useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const handleSubmit = (event: any) => {
    setErrorMsg("");
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    fetch("http://40.90.236.58:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        setLoginLoading(true);
        if (!response.ok) {
          setLoginLoading(false);
          if (response.status === 401) {
            throw new Error(
              "الرجاء التأكد من صحة البريد الالكتروني أو كلمة المرور"
            );
          }
          throw new Error("حدثت مشكلة الرجاء حاول مرة أخرى");
        }
        return response.json();
      })
      .then((data) => {
        const token = data.data.token;

        fetch("http://40.90.236.58:3000/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data.data.type === "USER") {
              throw new Error("غير مصرح لك");
            } else {
              localStorage.setItem("token", token);
              localStorage.setItem("cur-user", JSON.stringify(data.data));

              if (data.data.type === "MUSEUMS_ADMIN") {
                const museum = await axios.get(
                  `http://40.90.236.58:3000/museums/${data.data.museum}`
                );
                localStorage.setItem(
                  "museum",
                  JSON.stringify(museum.data.data)
                );
              }

              window.location.href = "/";
            }
          })
          .catch((error) => {
            setLoginLoading(false);
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
        setLoginLoading(false);
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="wrapper">
      <div className="login">
        <img src={logo} alt="موروث" />
        <h2>تسجيل الدخول</h2>
        <form onSubmit={handleSubmit}>
          <label>البريد الالكتروني</label>
          <input
            type="email"
            className="email"
            placeholder="example@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>كلمة المرور</label>
          <input
            type="password"
            className="email"
            placeholder="***********"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="login-btn" type="submit" value="دخول" />
        </form>
        <span className="error-msg">{errorMsg}</span>
        <div className={`loading ${loginLoading ? "visible" : ""}`}>
          <Loading />
        </div>
      </div>
    </div>
  );
}

export default Login;
