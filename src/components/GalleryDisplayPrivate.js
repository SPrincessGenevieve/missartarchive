import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/GalleryDisplay.css";

function GalleryDisplayPrivate({
  selectedImageId,
  selectedImageData,
  style,
  className,
}) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const randomQueryParam = `?nocache=${Math.random()}`;
    axios
      .get(
        `https://commission.pythonanywhere.com/api/photos/tasks/${randomQueryParam}`
      )
      .then((response) => {
        setImages(response.data);
      });
  }, []);

  return (
    <>
      {selectedImageId && selectedImageData ? (
        <div className="main-image  private">
          <img
            className={className}
            style={style}
            src={selectedImageData.image}
            alt="Selected"
          />
        </div>
      ) : (
        <p>No image selected.</p>
      )}
    </>
  );
}

export default GalleryDisplayPrivate;
