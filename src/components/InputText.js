import React from "react";
import "./InputText.css";

function InputText({
  onChange,
  value,
  type,
  label,
  name,
  marginRight,
  placeholder,
}) {
  return (
    <>
      <div style={{ marginRight: marginRight }}>
        <div
          style={{
            position: "absolute",
            marginTop: -12,
            marginLeft: 10,
            paddingRight: 10,
            paddingLeft: 10,
            backgroundColor: "white",
          }}
        >
          <label>{label}</label>
        </div>
        <input
          className="inputbox"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      </div>
    </>
  );
}

export default InputText;
