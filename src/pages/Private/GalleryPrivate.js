import React, { useState, useEffect } from "react";
import NavbarPrivate from "../../Navbar";
import "./Styles/galleryPrivate.css";
import GalleryContainer from "./../../components/GalleryContainer";
function GalleryPrivate(props) {
  return (
    <div>
      <NavbarPrivate></NavbarPrivate>
      <div className="gallery-container-private">
        <div className="">
          <GalleryContainer></GalleryContainer>
        </div>
      </div>
    </div>
  );
}

export default GalleryPrivate;
