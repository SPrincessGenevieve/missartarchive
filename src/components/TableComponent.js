import React, { useState, useEffect } from "react";
import "./styles/table.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  BackupTable,
  Check,
  Close,
  Delete,
  Download,
  Edit,
} from "@mui/icons-material";
import axios from "axios";
import * as XLSX from "xlsx";

function TableComponent() {
  const [data, setData] = useState([]);
  const [editable, setEditable] = useState({});
  const initialEditedData = {}; // Initialize editedData as an empty object
  const [editedData, setEditedData] = useState(initialEditedData);
  const [rowsPerPage] = useState(7); // Set the number of rows per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const exportToExcel = () => {
    const exportData = filteredData.map((item) => ({
      ID: item.ID,
      NAME: item.NAME,
      DATE: item.DATE,
      DUE: item.DUE,
      FEE: item.FEE,
      CONTACT_NO: item.CONTACT_NO,
      EMAIL: item.EMAIL,
      STATUS: item.STATUS,
    }));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a new worksheet with your data
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");

    // Generate a data URI for the Excel file
    const excelDataURI = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64",
    });

    // Create a data URI for downloading
    const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelDataURI}`;

    // Create a link element for downloading
    const a = document.createElement("a");
    a.href = dataUri;
    a.download = "table_data.xlsx";
    a.style.display = "none";

    // Append the link element to the document and trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update filteredData whenever the data or searchQuery changes
    filterData();
  }, [data, searchQuery]);

  const filterData = () => {
    // Filter the data based on the searchQuery
    const filtered = data.filter((item) =>
      item.NAME.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchData = () => {
    // Use Axios to fetch data from your Django backend
    axios
      .get("http://localhost:8000/api/tasks/") // Replace with your Django API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const toggleEdit = (rowId) => {
    setEditable((prevEditable) => ({
      ...prevEditable,
      [rowId]: !prevEditable[rowId],
    }));
  };

  const handleInputChange = (e, item, field) => {
    const updatedEditedData = { ...editedData };
    if (!updatedEditedData[item.ID]) {
      updatedEditedData[item.ID] = { ...item }; // Clone the item for editing
    }
    updatedEditedData[item.ID][field] = e.target.value;
    setEditedData(updatedEditedData);
  };

  const handleSubmit = (item) => {
    alert("save" + JSON.stringify(item));

    if (item.ID) {
      // If it's an existing item, send a PUT request to update it
      axios
        .put(`http://localhost:8000/api/tasks/${item.ID}/`, editedData[item.ID])
        .then((res) => {
          // Handle the response, e.g., show a success message
          console.log("Data updated successfully:", res.data);

          // Update the existing data in your state
          setData((prevData) =>
            prevData.map((dataItem) =>
              dataItem.ID === item.ID
                ? { ...dataItem, ...editedData[item.ID] }
                : dataItem
            )
          );

          // Toggle edit mode outside of the Axios request
          toggleEdit(item.ID);
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message
          console.error("Error updating data:", error);
        });
    } else {
      // If it's a new item, send a POST request to create it
      axios
        .post("http://localhost:8000/api/tasks/", editedData[item.ID])
        .then((res) => {
          // Handle the response, e.g., show a success message
          console.log("Data created successfully:", res.data);
          fetchData(); // Refresh the data after successful create
          // Toggle edit mode outside of the Axios request
          toggleEdit(item.ID);
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message
          console.error("Error creating data:", error);
        });
    }
  };

  // Delete item
  const handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
    axios
      .delete(`http://localhost:8000/api/tasks/${item.ID}/`) // Use item.ID instead of item.id
      .then((res) => {
        // Handle successful delete, e.g., remove the item from the state
        console.log("Data deleted successfully:", res.data);
        setData((prevData) =>
          prevData.filter((dataItem) => dataItem.ID !== item.ID)
        );
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div>
      <div className="table-container">
        <div className="search-container">
          <input
            style={{
              outline: "none",
              border: "1px solid red",
              width: 300,
              height: 50,
              borderRadius: 15,
              paddingLeft: 20,
              fontSize: 20,
              marginBottom: 20,
              backgroundColor: "transparent",
              color: "red",
            }}
            label="Search by Name"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="search name"
          />
          <div style={{ marginLeft: "73.5%" }}>
            <Button
              onClick={exportToExcel}
              style={{ backgroundColor: "#793c3c", color: "white" }}
            >
              <Download></Download>DOWNLOAD EXCEL
            </Button>
          </div>
        </div>

        <TableContainer>
          <Table className="table">
            <TableHead>
              <TableRow className="table-row">
                <TableCell className="column-cell id">ID</TableCell>
                <TableCell className="column-cell name">NAME</TableCell>
                <TableCell className="column-cell date">DATE</TableCell>
                <TableCell className="column-cell due">DUE</TableCell>
                <TableCell className="column-cell fee">FEE (₱)</TableCell>
                <TableCell className="column-cell contact">
                  CONTACT NO
                </TableCell>
                <TableCell className="column-cell email">EMAIL</TableCell>
                <TableCell className="column-cell status">STATUS</TableCell>
                <TableCell className="column-cell action">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(startIndex, endIndex).map((item) => (
                <TableRow className="table-body-row" key={item.ID}>
                  <TableCell className="table-cell id">
                    <input className="input" value={item.ID} disabled />
                  </TableCell>
                  <TableCell className="table-cell name">
                    {editable[item.ID] ? (
                      <input
                        className="input"
                        value={editedData[item.ID]?.NAME || item.NAME}
                        onChange={(e) => handleInputChange(e, item, "NAME")}
                      />
                    ) : (
                      <input className="input" value={item.NAME} disabled />
                    )}
                  </TableCell>
                  <TableCell className="table-cell date">
                    {editable[item.ID] ? (
                      <input
                        className="input"
                        value={editedData[item.ID]?.DATE || item.DATE}
                        onChange={(e) => handleInputChange(e, item, "DATE")}
                      />
                    ) : (
                      <input className="input" value={item.DATE} disabled />
                    )}
                  </TableCell>
                  <TableCell className="table-cell due">
                    {editable[item.ID] ? (
                      <input
                        className="input"
                        value={editedData[item.ID]?.DUE || item.DUE}
                        onChange={(e) => handleInputChange(e, item, "DUE")}
                      />
                    ) : (
                      <input className="input" value={item.DUE} disabled />
                    )}
                  </TableCell>
                  <TableCell className="table-cell fee">
                    {editable[item.ID] ? (
                      <>
                        <input
                          className="input"
                          value={editedData[item.ID]?.FEE || item.FEE}
                          onChange={(e) => handleInputChange(e, item, "FEE")}
                        />
                      </>
                    ) : (
                      <input className="input" value={item.FEE} disabled />
                    )}
                  </TableCell>
                  <TableCell className="table-cell contact">
                    {editable[item.ID] ? (
                      <input
                        className="input"
                        value={
                          editedData[item.ID]?.CONTACT_NO || item.CONTACT_NO
                        }
                        onChange={(e) =>
                          handleInputChange(e, item, "CONTACT_NO")
                        }
                      />
                    ) : (
                      <input
                        className="input"
                        value={item.CONTACT_NO}
                        disabled
                      />
                    )}
                  </TableCell>
                  <TableCell className="table-cell email">
                    {editable[item.ID] ? (
                      <input
                        className="input"
                        value={editedData[item.ID]?.EMAIL || item.EMAIL}
                        onChange={(e) => handleInputChange(e, item, "EMAIL")}
                      />
                    ) : (
                      <input className="input" value={item.EMAIL} disabled />
                    )}
                  </TableCell>
                  <TableCell className="table-cell status">
                    {editable[item.ID] ? (
                      <input
                        className="input"
                        value={editedData[item.ID]?.STATUS || item.STATUS}
                        onChange={(e) => handleInputChange(e, item, "STATUS")}
                      />
                    ) : (
                      <input className="input" value={item.STATUS} disabled />
                    )}
                  </TableCell>
                  <TableCell className="table-cell-button">
                    {editable[item.ID] ? (
                      <>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "green", marginRight: 10 }}
                          onClick={() => {
                            // First toggle the edit mode
                            toggleEdit(item.ID);
                            // Then submit the changes
                            handleSubmit(item);
                          }}
                        >
                          <Check />
                        </Button>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "", marginRight: 10 }}
                          onClick={() => toggleEdit(item.ID)}
                        >
                          <Close />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#a389ec",
                            marginRight: 10,
                          }}
                          onClick={() => toggleEdit(item.ID)}
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "red", marginRight: 10 }}
                          onClick={() => {
                            // First, handle the delete operation
                            handleDelete(item);
                            // Then toggle the edit mode
                            toggleEdit(item.ID);
                          }}
                        >
                          <Delete />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="pagination">
        <div className="label-page">
          <Button
            style={{ backgroundColor: "transparent", border: 0 }}
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            <ArrowBackIos></ArrowBackIos>
          </Button>
          <span style={{ margin: "0 10px" }}>{currentPage}</span>{" "}
          {/* Display current page */}
          <Button
            style={{ backgroundColor: "transparent", border: 0 }}
            disabled={endIndex >= data.length}
            onClick={nextPage}
          >
            <ArrowForwardIos></ArrowForwardIos>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TableComponent;
