import React, { useState, useEffect } from "react";
import NavbarPublic from "./../../NavbarPublic";
import { useNavigate } from "react-router-dom";
import "./Styles/login.css";
import InputText from "../../components/InputText";
import ButtonComponent from "../../components/ButtonComponent";

function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 500);
  }, []);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      navigate("/records");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <NavbarPublic></NavbarPublic>
      <div className={`login-container ${fadeIn ? "fade-in" : ""}`}>
        <div className="login-subcontainer">
          <div>
            <div className="login-container-white">
              <div>
                <div>
                  <InputText
                    height={"4vh"}
                    width={"40vh"}
                    label={"USERNAME"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></InputText>
                </div>
                <div style={{ marginTop: 25 }}>
                  <InputText
                    height={"4vh"}
                    width={"40vh"}
                    type={"password"}
                    label={"PASSWORD"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></InputText>
                </div>
              </div>
              {error && (
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginTop: "5%",
                  }}
                >
                  <p style={{ color: "red" }}>{error}</p>
                </div>
              )}
              <div style={{ marginTop: 75 }}>
                <ButtonComponent
                  onClick={handleLogin}
                  text={"LOGIN"}
                  backgroundColor={"#FFECEC"}
                ></ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
