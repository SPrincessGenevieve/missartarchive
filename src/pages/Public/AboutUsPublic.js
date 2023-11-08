import React, { useEffect, useState } from "react";
import NavbarPublic from "../../NavbarPublic";
import "./Styles/aboutUsPublic.css";
import axios from "axios";
import background from "./../../assets/background.png";

function AboutUsPublic(props) {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 500);
  }, []);

  useEffect(() => {
    axios
      .get("https://commission.pythonanywhere.com/api/about/tasks/")
      .then((response) => {
        setData(response.data);
        const item = response.data.find((item) => item.id === selectedId);
        setSelectedData(item);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedId]);

  return (
    <div>
      <div className="nav-bar-container">
        <NavbarPublic></NavbarPublic>
      </div>
      <div className="about-container">
        <div className={`title-container ${fadeIn ? "fade-in" : ""}`}>
          <h1 className="about">About Us</h1>
        </div>

        {selectedData && (
          <div
            className={`paragraph-container ${
              fadeIn ? "fade-in-paragraph" : ""
            }`}
          >
            <p>{selectedData.description}</p>
          </div>
        )}
        <div className="image-container">
          <img className="img" src={background}></img>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPublic;
