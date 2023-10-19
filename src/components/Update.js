import React, { useEffect, useState } from "react";
import Navbar from "./../Navbar";
import axios from "axios";
import { Button } from "@mui/material";
import "./styles/update.css";
import { Edit, Save } from "@mui/icons-material";

function Update(props) {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(1); // Default ID to fetch, change as needed
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to track whether editing is enabled

  useEffect(() => {
    // Make an HTTP GET request to fetch the data
    axios
      .get("http://localhost:8000/api/local/tasks/")
      .then((response) => {
        setData(response.data);
        // Find the data item with the selected ID
        const item = response.data.find((item) => item.id === selectedId);
        setSelectedData(item);
        setEditedDescription(item.description); // Initialize editedDescription with the current description
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
    // Limit the text to a maximum of 1000 characters
    const text = e.target.value.slice(0, 1000);
    setEditedDescription(text);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // Make an HTTP PUT request to update the data
    axios
      .put(`http://localhost:8000/api/local/tasks/${selectedId}/`, {
        description: editedDescription,
      })
      .then((response) => {
        // Update the selectedData with the updated description
        setSelectedData({ ...selectedData, description: editedDescription });
        console.log("Data updated successfully:", response.data);
        toggleEditing(); // Toggle editing state back to disabled
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="about-container">
        <div className="about-subcontainer">
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
                    disabled={!isEditing} // Disable the textarea based on editing state
                    maxLength={1000} // Set the maximum character length
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

export default Update;
