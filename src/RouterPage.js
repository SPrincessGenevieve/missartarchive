import React from "react";
import List from "./components/List";
import Add from "./components/Add";
import Update from "./components/Update";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

function RouterPage(props) {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/list" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </div>
  );
}

export default RouterPage;
