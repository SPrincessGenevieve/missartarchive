import React from "react";
import "./Styles/ButtonComponent.css";
import { Button } from "@mui/material";

function ButtonComponent({ color, onClick, text, backgroundColor, zIndex }) {
  return (
    <div>
      <Button
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 7,
          zIndex: zIndex,
          color: color,
        }}
        onClick={onClick}
        className="button-book"
      >
        <h3 className="book">{text}</h3>
      </Button>
    </div>
  );
}

export default ButtonComponent;
