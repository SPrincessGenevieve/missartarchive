import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageDisplay({ imageId, style }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (imageId) {
      axios
        .get(`http://localhost:8000/api/pictures/tasks/${imageId}/`)
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
        <div style={{ flexDirection: "row" }}>
          <img style={style} src={image.image} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ImageDisplay;
