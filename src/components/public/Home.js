import React from "react";
import Navbar from "../../NavbarPublic";
import { useNavigate } from "react-router-dom";
import "./styles/home.css";
import BG from "./../../assets/Clouds.mp4";
import { Button } from "@mui/material";
import ButtonComponent from "../ButtonComponent";
import zIndex from "@mui/material/styles/zIndex";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

function Home(props) {
  const navigation = useNavigate();

  const handleLogin = () => {
    navigation("/list");
  };

  const handleForm = () => {
    navigation("/form");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="home-container">
        <div className="home-subcontainer">
          <div className="button-container">
            <ButtonComponent
              zIndex={1}
              text="BOOK NOW"
              onClick={handleForm}
              backgroundColor={"white"}
            ></ButtonComponent>
          </div>
          <div>
            <video
              loop
              autoPlay
              muted // Add this attribute
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <source src={BG} type="video/mp4"></source>
            </video>
          </div>
          <div className="link-container-home">
            <a
              className="link"
              href="https://www.instagram.com/missartarchive/"
            >
              <Instagram></Instagram>@missartarchive
            </a>
            <a
              className="link"
              href="https://web.facebook.com/MissArtCommission"
            >
              <Facebook></Facebook>@missartcommission
            </a>
            <a className="link" href="https://twitter.com/MissARTarchive">
              <Twitter></Twitter>@missartarchive
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
