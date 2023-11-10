import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import GalleryDisplay from "./GalleryDisplay";
import ImageDisplay from "./ImageDisplay";
import { Edit, Image, Upload, Delete } from "@mui/icons-material";
import divider from "./../assets/divider.png";
import "./Styles/InputText.css";
import "./Styles/GalleryContainer.css";

function GalleryContainer({
  updateSelectedImageData,
  showButtons = true,
  selectedImageId,
  selectedImageData,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeInGallery, setFadeInGallery] = useState(false);
  const [fadeInHeader, setFadeInHeader] = useState(false);
  const fileInputRef = useRef();

  const handleImageDelete = async (imageId) => {
    try {
      console.log("Deleting image with ID:", imageId);
      await axios.delete(
        `https://commission.pythonanywhere.com/api/upload/image/tasks/${imageId}/`
      );

      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== imageId)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
      console.log("Request URL:", error.config.url);
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
        "https://commission.pythonanywhere.com/api/upload/image/tasks/",
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
    axios
      .get("https://commission.pythonanywhere.com/api/photos/tasks/")
      .then((response) => {
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

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 500);
    setTimeout(() => {
      setFadeInHeader(true);
    }, 900);
    setTimeout(() => {
      setFadeInGallery(true);
    }, 1000);
  }, []);

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
      .get("https://commission.pythonanywhere.com/api/all/images/tasks/")
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
        "https://commission.pythonanywhere.com/api/selected/image/tasks/"
      );
      const selectedImageData = response.data;

      setSelectedImage(selectedImageData);

      localStorage.setItem("selectedImage", JSON.stringify(selectedImageData));
    } catch (error) {
      console.error("Error fetching selected image:", error);
    }
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

        {/* Display the selected image 
      {selectedImage && (
        <div
          className={`individualContainer transition-container ${
            fadeIn ? "fade-in" : ""
          }`}
          style={{
            height: "70%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <GalleryDisplay
            classNameImage={"individual-art-private"}
            classNameDiv={"individual-container-private"}
            selectedImageId={selectedImage.id}
            selectedImageData={selectedImage}
            imageUrl={selectedImage.imageUrl}
          />
        </div>
      )}*/}


      {/* Render ALL IMAGES HERE */}

      {selectedImageData ? (
        <div>
          <h2>Selected Image</h2>
          <ImageDisplay imageId={selectedImageId} />
        </div>
      ) : null}

      <div
        className={`divider-container transition-container ${
          fadeInHeader ? "fade-in" : ""
        }`}
      >
        <img
          className="divider"
          style={{ backgroundColor: "transparent" }}
          src={divider}
        ></img>
      </div>
      <div
        className={`all-images transition-container ${
          fadeInGallery ? "fade-in" : ""
        }`}
      >
        {groupImagesIntoRows().map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="image-gallery-container"
            style={{
              display: "flex",
              marginBottom: 20,
            }}
          >
            {row.map((image) => (
              <div style={{ marginRight: 20 }}>
                <ImageDisplay
                  className="images-individual"
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
