import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import GalleryDis from "./public/GalleryDis";
import ImageDisplay from "./public/ImageDisplay";
import { Edit, Image, Upload, Delete } from "@mui/icons-material";

function GalleryContainer({
  updateSelectedImageData,
  showButtons = true,
  selectedImageId,
  selectedImageData,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  const fileInputRef = useRef();

  const handleImageDelete = async (imageId) => {
    try {
      console.log("Deleting image with ID:", imageId);
      await axios.delete(
        `http://localhost:8000/api/upload/image/tasks/${imageId}/`
      );

      // Update the images state by removing the deleted image
      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== imageId)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
      console.log("Request URL:", error.config.url); // Log the request URL
    }
  };

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");

    if (storedImage) {
      setSelectedImage(JSON.parse(storedImage));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/all/images/tasks/")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/selected/image/tasks/"
      );
      const selectedImageData = response.data;

      setSelectedImage(selectedImageData);

      localStorage.setItem("selectedImage", JSON.stringify(selectedImageData));
    } catch (error) {
      console.error("Error fetching selected image:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload/image/tasks/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.message);

      setSelectedImage(response.data);

      localStorage.setItem("selectedImage", JSON.stringify(response.data));

      if (
        updateSelectedImageData &&
        typeof updateSelectedImageData === "function"
      ) {
        updateSelectedImageData(response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/pictures/tasks/").then((response) => {
      setImages(response.data);
    });
  }, []);

  const groupImagesIntoRows = () => {
    const rows = [];
    for (let i = 0; i < images.length; i += 5) {
      rows.push(images.slice(i, i + 5));
    }
    return rows;
  };

  return (
    <div>
      {showButtons && (
        <>
          <Button
            style={{
              outline: "none",
              border: "none",
              backgroundColor: "transparent",
              alignItems: "center",
              display: "flex",
              color: "#ad6c6b",
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <Image style={{ fontSize: 35 }}></Image> <h1>Upload Image</h1>
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
            accept="image/*"
          />
        </>
      )}

      {/* Display the selected image */}
      {selectedImage && (
        <div
          style={{
            height: "40%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <GalleryDis
            style={{
              width: "40%",
              display: "flex",
              borderRadius: 50,
              marginTop: 170,
            }}
            selectedImageId={selectedImage.id}
            selectedImageData={selectedImage}
            imageUrl={selectedImage.imageUrl}
          />
        </div>
      )}

      {/* Render ALL IMAGES HERE */}
      {selectedImageData ? (
        <div>
          <h2>Selected Image</h2>
          <ImageDisplay imageId={selectedImageId} />
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "5%",
        }}
      >
        {groupImagesIntoRows().map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              marginBottom: 20,
            }}
          >
            {row.map((image) => (
              <div style={{ marginRight: 20 }}>
                <ImageDisplay
                  style={{
                    height: 290,
                    width: 290,
                    borderRadius: 40,
                    boxShadow: "1px 1px 10px 1px #864646",
                  }}
                  key={image.id}
                  imageId={image.id}
                  onClick={() => handleImageDelete(image.id)}
                />
                {showButtons && (
                  // Add a delete button/icon for each image
                  <Button
                    style={{ marginTop: "-30%" }}
                    startIcon={
                      <Delete style={{ color: "red", fontSize: 30 }} />
                    }
                    onClick={() => handleImageDelete(image.id)}
                  ></Button>
                )}
              </div>
            ))}
          </div>
        ))}
        {images.length === 0 && <p>No images available.</p>}
      </div>
    </div>
  );
}

export default GalleryContainer;
