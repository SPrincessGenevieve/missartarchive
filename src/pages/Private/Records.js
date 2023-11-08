import React, { useState, useEffect } from "react";
import "./Styles/records.css";
import NavbarPrivate from "./../../Navbar";
import TableComponent from "../../components/TableComponents";

function Records(props) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 500);
  }, []);

  return (
    <div>
      <NavbarPrivate></NavbarPrivate>
      <div className={`list-container ${fadeIn ? "fade-in" : ""}`}>
        <div className="list-subcontainer">
          <h3 style={{ marginLeft: 10, color: "#AD6C6B" }}>
            CLIENT INFORMATION
          </h3>
          <TableComponent></TableComponent>
        </div>
      </div>
    </div>
  );
}

export default Records;
