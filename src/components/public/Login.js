import React, { useState } from "react";
import Navbar from "../../NavbarPublic";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import InputText from "./../InputText";
import ButtonComponent from "./../ButtonComponent";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      // Successful login
      navigate("/list");
    } else {
      // Display an error message for invalid credentials
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="login-container">
        <div className="login-subcontainer">
          <div>
            <div className="login-container-white">
              <div>
                <div>
                  <InputText
                    label={"USERNAME"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></InputText>
                </div>
                <div style={{ marginTop: 25 }}>
                  <InputText
                    type={"password"}
                    label={"PASSWORD"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></InputText>
                </div>
              </div>
              <div style={{ marginTop: 75 }}>
                <ButtonComponent
                  onClick={handleLogin}
                  text={"LOGIN"}
                  backgroundColor={"#FFECEC"}
                ></ButtonComponent>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
