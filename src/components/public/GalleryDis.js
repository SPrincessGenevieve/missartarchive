import React, { useState, useEffect } from "react";
import Navbar from "../../NavbarPublic";
import "./styles/gallery.css";
import { Button } from "@mui/material";
import axios from "axios";
import ImageDisplay from "./ImageDisplay";

function GalleryDis({ selectedImageId, selectedImageData, style }) {
  const [images, setImages] = useState([]); // State to store the list of images

  useEffect(() => {
    // Generate a random query parameter
    const randomQueryParam = `?nocache=${Math.random()}`;

    // Fetch all images from your Django backend with the random query parameter
    axios
      .get(`http://localhost:8000/api/pictures/tasks/${randomQueryParam}`)
      .then((response) => {
        setImages(response.data);
      });
  }, []);

  return (
    <>
      {selectedImageId && selectedImageData ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-10%",
          }}
        >
          <img style={style} src={selectedImageData.image} alt="Selected" />
        </div>
      ) : (
        <p>No image selected.</p>
      )}
    </>
  );
}

export default GalleryDis;
