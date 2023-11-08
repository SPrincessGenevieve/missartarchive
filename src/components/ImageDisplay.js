import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/ImageDisplay.css";

function ImageDisplay({ imageId, style, className }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (imageId) {
      axios
        .get(
          `https://commission.pythonanywhere.com/api/photos/tasks/${imageId}/`
        )
        .then((response) => {
          setImage(response.data);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  }, [imageId]);

  return (
    <div>
      {image ? (
        <div className="image-gallery-container">
          <img className={className} style={style} src={image.image} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ImageDisplay;
