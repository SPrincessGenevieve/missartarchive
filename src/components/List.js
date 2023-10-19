import React from "react";
import Navbar from "./../Navbar";
import "./styles/list.css";
import TableComponent from "./TableComponent";

export default function List(props) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="list-container">
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
