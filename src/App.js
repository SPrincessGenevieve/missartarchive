import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

//PUBLIC
import Login from "./pages/Public/Login";
import AboutUsPublic from "./pages/Public/AboutUsPublic";
import GalleryPublic from "./pages/Public/GalleryPublic";
import Home from "./pages/Public/Home";
import Form from "./pages/Public/Form";

//PRIVATE
import AboutUsPrivate from "./pages/Private/AboutUsPrivate";
import GalleryPrivate from "./pages/Private/GalleryPrivate";
import Records from "./pages/Private/Records";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Routes>
        <Route path="/logout" element={<Login />} />
        <Route
          path="/records"
          element={isAuthenticated ? <Records /> : <Navigate to="/login" />}
        />
        <Route
          path="/galleryPrivate"
          element={
            isAuthenticated ? <GalleryPrivate /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/aboutUsPrivate"
          element={
            isAuthenticated ? <AboutUsPrivate /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
        <Route path="/galleryPublic" element={<GalleryPublic />} />
        <Route path="/aboutUsPublic" element={<AboutUsPublic />} />
      </Routes>
    </div>
  );
}

export default App;
