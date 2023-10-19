import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import Home from "./components/public/Home";
import List from "./components/List";
import Add from "./components/Add";
import Update from "./components/Update";
import Login from "./components/public/Login";
import Form from "./components/public/Form";
import About from "./components/public/About";
import Gallery from "./components/public/Gallery";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Assuming you have some state to track user authentication status
  const checkAuthentication = () => {
    // You should implement your logic to check if the user is authenticated here.
    // For this example, we'll just set it to true.
    setIsAuthenticated(true);
  };

  // Use useEffect to check authentication when the component mounts
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Routes>
        <Route path="/logout" element={<LoginPage />} />
        <Route
          path="/list"
          element={isAuthenticated ? <List /> : <Navigate to="/login" />}
        />
        <Route
          path="/add"
          element={isAuthenticated ? <Add /> : <Navigate to="/login" />}
        />
        <Route
          path="/update"
          element={isAuthenticated ? <Update /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
