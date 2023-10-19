import React, { useRef, useEffect, useState } from "react";
import Navbar from "../../NavbarPublic";
import axios from "axios";

function About(props) {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(1); // Default ID to fetch, change as needed

  useEffect(() => {
    // Make an HTTP GET request to fetch the data
    axios
      .get("http://localhost:8000/api/local/tasks/")
      .then((response) => {
        setData(response.data);
        // Find the data item with the selected ID
        const item = response.data.find((item) => item.id === selectedId);
        setSelectedData(item);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedId]);

  const handleIdChange = (e) => {
    const newSelectedId = parseInt(e.target.value, 10);
    setSelectedId(newSelectedId);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="about-container">
        <h1>ABOUT US</h1>
        <select onChange={handleIdChange} value={selectedId}>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              ID {item.id}
            </option>
          ))}
        </select>
        {selectedData && (
          <div>
            <p>{selectedData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
