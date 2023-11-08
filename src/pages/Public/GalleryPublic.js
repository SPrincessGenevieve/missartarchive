import React, { useState, useEffect, useRef } from "react";
import "./Styles/galleryPublic.css";
import "./Styles/font.css";
import axios from "axios";
import NavbarPublic from "./../../NavbarPublic";
import GalleryContainer from "../../components/GalleryContainer";
import GalleryDisplay from "../../components/GalleryDisplay";
import divider from "./../../assets/divider.png";
import ImageDisplay from "../../components/ImageDisplay";

function GalleryPublic({
  updateSelectedImageData,
  showButtons = true,
  selectedImageId,
  selectedImageData,
}) {
  const [images, setImages] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fadeInHeader, setFadeInHeader] = useState(false);
  const [fadeInGallery, setFadeInGallery] = useState(false);
  const [fadeInArt, setFadeInArt] = useState(false);

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
    setTimeout(() => {
      setFadeInArt(true);
    }, 1000);
  }, []);

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
      <NavbarPublic />
      <div className="gallery-container-public">
        <div className={`title-public-gallery-container transition-container  ${
                fadeInGallery ? "fade-in" : ""
              }`}>
          <h1 className="title-public-gallery">Welcome to the gallery</h1>
        </div>

        {/*LATEST ART*/}

        <div
          className={`latest-art-public-container  transition-container-gallery${
            fadeInArt ? "fade-in-art" : ""
          }`}
        >
          {selectedImage && (
            <GalleryDisplay
              className="image-img private"
              selectedImageId={selectedImage.id}
              selectedImageData={selectedImage}
              imageUrl={selectedImage.imageUrl}
              classNameImage={"individual-art-public"}
              classNameDiv={`individual-art-public-container transition-container  ${
                fadeInGallery ? "fade-in" : ""
              }`}
            />
          )}
        </div>

        {/*LATEST ART*/}

        {/*DIVIDER*/}
        <div
          className={`divider-public-container transition-container  ${
            fadeInGallery ? "fade-in" : ""
          }`}
        >
          <img
            className="divider-public"
            style={{ backgroundColor: "transparent" }}
            src={divider}
          ></img>
        </div>
        {/*DIVIDER*/}

        {/*all images displayed*/}

        <div className="gallery-all-public-container">
          <div
            className={`gallery-all-public-container-subcontainer transition-container  ${
              fadeInGallery ? "fade-in" : ""
            }`}
          >
            {groupImagesIntoRows().map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="image-gallery-container private"
                style={{
                  display: "flex",
                  marginBottom: 20,
                }}
              >
                {row.map((image) => (
                  <div style={{ marginRight: 20 }}>
                    <ImageDisplay
                      className="images-individual private"
                      key={image.id}
                      imageId={image.id}
                    />
                  </div>
                ))}
              </div>
            ))}
            {images.length === 0 && <p>No images available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryPublic;
