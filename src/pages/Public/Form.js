import React, { useEffect, useState } from "react";
import NavbarPublic from "./../../NavbarPublic";
import "./Styles/form.css";
import axios from "axios";
import InputText from "./../../components/InputText";
import InputSelect from "./../../components/InputSelect";
import cloud from "./../../assets/cloud.png";
import TermsConditions from "./../../components/TermsConditions";
import ButtonComponent from "./../../components/ButtonComponent";
import Home from "./Home";

function Form(props) {
  const [emailError, setEmailError] = useState("");
  const [terms, setTerms] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "EMAIL") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailPattern.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const checkFormCompletion = () => {
    if (
      !formData.NAME ||
      !formData.DATE ||
      !formData.DUE ||
      !formData.FEE ||
      !formData.CONTACT_NO ||
      !formData.EMAIL ||
      !formData.STATUS
    ) {
      alert("Please fill out all fields");
      return;
    } else {
      setTerms(!terms);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.NAME ||
      !formData.DATE ||
      !formData.DUE ||
      !formData.FEE ||
      !formData.CONTACT_NO ||
      !formData.EMAIL ||
      !formData.STATUS
    ) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://commission.pythonanywhere.com/api/formtasks/",
        formData
      );
      console.log("Response from Django API:", response.data);

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
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }

    setTerms(!terms);
    alert("Success! We will contact you soon!");
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <NavbarPublic />
      {terms ? (
        <div className="sub-form">
          <TermsConditions
            can={() => setTerms(!terms)}
            pro={handleSubmit}
          ></TermsConditions>
        </div>
      ) : null}

      {screenWidth <= 768 ? (
        <Home />
      ) : (
        <div className="form-container">
          <div className="form-subcontainer">
            <div className="white-container">
              <div className="title-commssion">
                <h1>Commission Form</h1>
              </div>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <InputText
                  width={"30vh"}
                  marginRight={"5%"}
                  label={"NAME"}
                  height={"100%"}
                  type="text"
                  name="NAME"
                  value={formData.NAME}
                  onChange={handleInputChange}
                ></InputText>
                <InputText
                  width={"30vh"}
                  height={"100%"}
                  label={"DATE TODAY"}
                  type="date"
                  name="DATE"
                  value={formData.DATE}
                  onChange={handleInputChange}
                ></InputText>
              </div>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <InputText
                  width={"30vh"}
                  marginRight={"5%"}
                  height={"100%"}
                  label={"DUE DATE"}
                  type="date"
                  name="DUE"
                  value={formData.DUE}
                  onChange={handleInputChange}
                ></InputText>
                <InputText
                  width={"30vh"}
                  height={"100%"}
                  label={"PAYMENT FEE"}
                  type="number"
                  name="FEE"
                  value={formData.FEE}
                  onChange={handleInputChange}
                ></InputText>
              </div>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <InputText
                  width={"30vh"}
                  marginRight={"5%"}
                  height={"100%"}
                  label={"CONTACT"}
                  type="number"
                  name="CONTACT_NO"
                  value={formData.CONTACT_NO}
                  onChange={handleInputChange}
                ></InputText>
                <InputText
                  width={"30vh"}
                  height={"100%"}
                  label={"EMAIL"}
                  type="email"
                  name="EMAIL"
                  value={formData.EMAIL}
                  onChange={handleInputChange}
                ></InputText>
              </div>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <InputSelect
                  width={"30vh"}
                  height={"6vh"}
                  label={"STATUS"}
                  type="select"
                  name="STATUS"
                  value={formData.STATUS}
                  onChange={handleInputChange}
                ></InputSelect>
              </div>

              <div className="buttons-container">
                <ButtonComponent
                  text="SUBMIT"
                  onClick={checkFormCompletion}
                  backgroundColor={"#FFECEC"}
                ></ButtonComponent>
              </div>
            </div>
            <div>
              <img className="cloud" src={cloud}></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Form;
