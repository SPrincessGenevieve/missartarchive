import React, { useState } from "react";
import Navbar from "../../NavbarPublic";
import "./styles/form.css";
import axios from "axios";
import { Button } from "@mui/material";
import InputText from "../InputText";
import ButtonComponent from "../ButtonComponent";
import cloud from "./../../assets/cloud.png";
import InputSelect from "../InputSelect";
import TermsConsitions from "./TermsConsitions";

function Form(props) {
  // Create state variables to hold form data
  const [formData, setFormData] = useState({
    ID: "",
    NAME: "",
    DATE: "",
    DUE: "",
    FEE: "",
    CONTACT_NO: "",
    EMAIL: "",
    STATUS: "",
  });
  const [emailError, setEmailError] = useState("");
  const [terms, setTerms] = useState(false);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate email input
    if (name === "EMAIL") {
      // Regular expression for email validation
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError(""); // Clear the error message if email is valid
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const checkFormCompletion = () => {
    // Check if all required fields are filled to enable the terms section
    if (
      !formData.NAME ||
      !formData.DATE ||
      !formData.DUE ||
      !formData.FEE ||
      !formData.CONTACT_NO ||
      !formData.EMAIL ||
      !formData.STATUS
    ) {
      // Display an alert message to inform the user
      alert("Please fill out all fields");
      return; // Do not proceed with form submission
    } else {
      setTerms(!terms);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (
      !formData.NAME ||
      !formData.DATE ||
      !formData.DUE ||
      !formData.FEE ||
      !formData.CONTACT_NO ||
      !formData.EMAIL ||
      !formData.STATUS
    ) {
      // Display an alert message to inform the user
      alert("Please fill out all fields");
      return; // Do not proceed with form submission
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/tasks/",
        formData
      );
      console.log("Response from Django API:", response.data);

      // Clear the form data after successful submission
      setFormData({
        NAME: "",
        DATE: "",
        DUE: "",
        FEE: "",
        CONTACT_NO: "",
        EMAIL: "",
        STATUS: "",
      });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
      }
    }

    setTerms(!terms);
  };

  return (
    <div>
      <Navbar />
      {terms ? (
        <div className="sub-form">
          <TermsConsitions
            cancel={() => setTerms(!terms)}
            proceed={handleSubmit}
          ></TermsConsitions>
        </div>
      ) : null}

      <div className="form-container">
        <div className="form-subcontainer">
          <div className="white-container">
            <div className="white-subcontainer">
              <div className="input-container">
                <div className="input-boxes">
                  <InputText
                    label={"NAME"}
                    marginRight={50}
                    type="text"
                    name="NAME"
                    value={formData.NAME}
                    onChange={handleInputChange}
                  ></InputText>
                  <InputText
                    label={"DATE TODAY"}
                    type="date"
                    name="DATE"
                    value={formData.DATE}
                    onChange={handleInputChange}
                  ></InputText>
                </div>
                <div className="input-boxes">
                  <InputText
                    label={"DUE DATE"}
                    marginRight={50}
                    type="date"
                    name="DUE"
                    value={formData.DUE}
                    onChange={handleInputChange}
                  ></InputText>
                  <InputText
                    label={"PAYMENT FEE"}
                    type="number"
                    name="FEE"
                    value={formData.FEE}
                    onChange={handleInputChange}
                  ></InputText>
                </div>
                <div className="input-boxes contact">
                  <InputText
                    label={"CONTACT"}
                    marginRight={50}
                    type="number"
                    name="CONTACT_NO"
                    value={formData.CONTACT_NO}
                    onChange={handleInputChange}
                  ></InputText>
                  <InputText
                    label={"EMAIL"}
                    marginRight={50}
                    type="email"
                    name="EMAIL"
                    value={formData.EMAIL}
                    onChange={handleInputChange}
                  ></InputText>
                </div>
                <div className="input-boxes status">
                  <InputSelect
                    label={"STATUS"}
                    type="select"
                    marginRight={50}
                    name="STATUS"
                    value={formData.STATUS}
                    onChange={handleInputChange}
                  ></InputSelect>
                </div>
              </div>
            </div>
            <div className="buttons-container">
              <ButtonComponent
                text="SUBMIT"
                onClick={checkFormCompletion}
                backgroundColor={"#FFECEC"}
              ></ButtonComponent>
            </div>
          </div>
          <div className="image-cloud">
            <img src={cloud}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
