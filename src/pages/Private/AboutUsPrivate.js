import React, { useEffect, useState } from "react";
import NavbarPrivate from "./../../Navbar";
import axios from "axios";
import { Button } from "@mui/material";
import "./Styles/aboutUsPrivate.css";
import { Edit, Save } from "@mui/icons-material";

function AboutUsPrivate(props) {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(1);
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 300);
  }, []);

  useEffect(() => {
    axios
      .get("https://commission.pythonanywhere.com/api/about/tasks/")
      .then((response) => {
        setData(response.data);
        const item = response.data.find((item) => item.id === selectedId);
        setSelectedData(item);
        setEditedDescription(item.description);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedId]);

  const handleIdChange = (e) => {
    const newSelectedId = parseInt(e.target.value, 10);
    setSelectedId(newSelectedId);
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value.slice(0, 1000);
    setEditedDescription(text);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    axios
      .put(
        `https://commission.pythonanywhere.com/api/about/tasks/${selectedId}/`,
        {
          description: editedDescription,
        }
      )
      .then((response) => {
        setSelectedData({ ...selectedData, description: editedDescription });
        console.log("Data updated successfully:", response.data);
        toggleEditing();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
      <div>
        <NavbarPrivate></NavbarPrivate>
      </div>
      <div className={`about-container-private ${fadeIn ? "fade-in" : ""}`}>
        <div className="about-subcontainer-private">
          <div className="button-updatecontainer">
            <Button
              style={{ color: "#ad6c6b" }}
              onClick={isEditing ? handleSaveChanges : toggleEditing}
            >
              <h1>ABOUT US</h1>
              {isEditing ? <Save /> : <Edit />}
            </Button>
          </div>
          <div className="body-container">
            <div className="main-container">
              {selectedData && (
                <div className="input-container-about">
                  <textarea
                    className="textarea-update"
                    value={editedDescription}
                    onChange={handleDescriptionChange}
                    disabled={!isEditing}
                    maxLength={1000}
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPrivate;
