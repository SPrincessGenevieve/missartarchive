import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/GalleryDisplay.css";

function GalleryDisplay({
  selectedImageId,
  selectedImageData,
  style,
  classNameImage,
  classNameDiv,
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
        <div className={classNameDiv}>
          <img
            className={classNameImage}
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

export default GalleryDisplay;
