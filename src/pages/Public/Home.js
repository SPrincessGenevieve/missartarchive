import React, { useState, useEffect } from "react";
import Navbar from "../../NavbarPublic";
import { useNavigate } from "react-router-dom";
import "./Styles/home.css";
import BG from "./../../assets/Clouds.mp4";
import ButtonComponent from "./../../components/ButtonComponent";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import InputText from "../../components/InputText";
import InputSelect from "../../components/InputSelect";
import axios from "axios";
import "./../../components/Styles/TermsConditions.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Message from "../../components/Message";

function Home(props) {
  const navigation = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [fadeInput, setFadeInput] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [terms, setTerms] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
  const handleLogin = () => {
    navigation("/list");
  };

  const handleForm = () => {
    navigation("/form");
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
      openModal();
    }
  };

  const handleSubmitMessage = async (e) => {
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
    closeModal();
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
    setTimeout(() => {
      setFadeIn(true);
    }, 500);
    setTimeout(() => {
      setShowButton(true);
    }, 800);

    setTimeout(() => {
      setFadeInput(true);
    }, 800);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="home-container">
        <div className="home-subcontainer">
          <Dialog
            open={modalOpen}
            onClose={closeModal}
            sx={{
              "& .MuiDialog-paper": {
                minWidth: "50%",
                minHeight: "40%",
              },
              "@media (max-width: 768px)": {
                "& .MuiDialog-paper": {
                  minWidth: "90%",
                  minHeight: "90%",
                },
              },
            }}
          >
            <DialogTitle>Terms of Services</DialogTitle>
            <DialogContent>
              <Message></Message>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmitMessage} color="primary">
                PROCEED
              </Button>
            </DialogActions>
          </Dialog>
          <div
            className={`input-container-home ${fadeInput ? "fade-input" : ""}`}
          >
            <InputText
              width={"35vh"}
              marginRight={"5%"}
              label={"NAME"}
              height={30}
              type="text"
              name="NAME"
              value={formData.NAME}
              onChange={handleInputChange}
            ></InputText>
            <InputText
              width={"35vh"}
              height={30}
              label={"DATE TODAY"}
              type="date"
              name="DATE"
              value={formData.DATE}
              onChange={handleInputChange}
            ></InputText>
            <InputText
              width={"35vh"}
              marginRight={"5%"}
              height={30}
              label={"DUE DATE"}
              type="date"
              name="DUE"
              value={formData.DUE}
              onChange={handleInputChange}
            ></InputText>
            <InputText
              width={"35vh"}
              height={30}
              label={"PAYMENT FEE"}
              type="number"
              name="FEE"
              value={formData.FEE}
              onChange={handleInputChange}
            ></InputText>
            <InputText
              width={"35vh"}
              marginRight={"5%"}
              height={30}
              label={"CONTACT"}
              type="number"
              name="CONTACT_NO"
              value={formData.CONTACT_NO}
              onChange={handleInputChange}
            ></InputText>
            <InputText
              width={"35vh"}
              height={30}
              label={"EMAIL"}
              type="email"
              name="EMAIL"
              value={formData.EMAIL}
              onChange={handleInputChange}
            ></InputText>
            <InputSelect
              width={"38vh"}
              height={50}
              label={"STATUS"}
              type="select"
              name="STATUS"
              value={formData.STATUS}
              onChange={handleInputChange}
            ></InputSelect>
            <div className="buttons-container">
              <ButtonComponent
                onClick={checkFormCompletion}
                text="SUBMIT"
                backgroundColor={"#FFECEC"}
              ></ButtonComponent>
            </div>
          </div>
          <div
            className={`button-container ${showButton ? "fade-button" : ""}`}
          >
            <ButtonComponent
              zIndex={1}
              text="BOOK NOW"
              onClick={handleForm}
              backgroundColor={"white"}
            ></ButtonComponent>
          </div>
          <div className={`video-container ${fadeIn ? "fade-in" : ""}`}>
            <video
              loop
              autoPlay
              muted // Add this attribute
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <source src={BG} type="video/mp4"></source>
            </video>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
