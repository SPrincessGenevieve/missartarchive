import React from "react";
import "./InputText.css";

function InputSelect({ onChange, value, type, label, name, marginRight }) {
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
        <select
          className="selectbox"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option></option>
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
        </select>
      </div>
    </>
  );
}

export default InputSelect;
