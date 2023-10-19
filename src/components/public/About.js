import React, { useRef, useEffect, useState } from "react";
import Navbar from "../../NavbarPublic";
import axios from "axios";
import "./../../components/font.css";
import "./styles/about.css";
import background from "./../../assets/background.png";

function About(props) {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(1); // Default ID to fetch, change as needed

  useEffect(() => {
    // Make an HTTP GET request to fetch the data
    axios
      .get("http://localhost:8000/api/local/tasks/")
      .then((response) => {
        setData(response.data);
        // Find the data item with the selected ID
        const item = response.data.find((item) => item.id === selectedId);
        setSelectedData(item);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedId]);

  const handleIdChange = (e) => {
    const newSelectedId = parseInt(e.target.value, 10);
    setSelectedId(newSelectedId);
  };

  return (
    <div>
      <div className="nav-bar-container">
        <Navbar></Navbar>
      </div>
      <div className="about-container">
        <div className="title-container">
          <h1 className="about">About Us</h1>
        </div>

        {selectedData && (
          <div className="paragraph-container">
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

export default About;
