import React, { useState, useEffect } from "react";
import "./Styles/TableComponent.css";
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
  Check,
  Close,
  Delete,
  Download,
  Edit,
} from "@mui/icons-material";
import axios from "axios";
import * as XLSX from "xlsx";

function TableComponents(props) {
  const [data, setData] = useState([]);
  const [editable, setEditable] = useState({});
  const initialEditedData = {};
  const [editedData, setEditedData] = useState(initialEditedData);
  const [rowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
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

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");

    const excelDataURI = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "base64",
    });

    const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelDataURI}`;

    const a = document.createElement("a");
    a.href = dataUri;
    a.download = "table_data.xlsx";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

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
    filterData();
  }, [data, searchQuery]);

  const filterData = () => {
    const filtered = data.filter((item) =>
      item.NAME.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchData = () => {
    axios
      .get("https://commission.pythonanywhere.com/api/formtasks/") // Replace with your Django API endpoint
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
      updatedEditedData[item.ID] = { ...item };
    }
    updatedEditedData[item.ID][field] = e.target.value;
    setEditedData(updatedEditedData);
  };

  const handleSubmit = (item) => {
    alert("save" + JSON.stringify(item));

    if (item.ID) {
      axios
        .put(
          `https://commission.pythonanywhere.com/api/formtasks/${item.ID}/`,
          editedData[item.ID]
        )
        .then((res) => {
          console.log("Data updated successfully:", res.data);

          setData((prevData) =>
            prevData.map((dataItem) =>
              dataItem.ID === item.ID
                ? { ...dataItem, ...editedData[item.ID] }
                : dataItem
            )
          );
          toggleEdit(item.ID);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      axios
        .post(
          "https://commission.pythonanywhere.com/api/formtasks/",
          editedData[item.ID]
        )
        .then((res) => {
          console.log("Data created successfully:", res.data);
          fetchData();
          toggleEdit(item.ID);
        })
        .catch((error) => {
          console.error("Error creating data:", error);
        });
    }
  };

  const handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
    axios
      .delete(`https://commission.pythonanywhere.com/api/formtasks/${item.ID}/`) // Use item.ID instead of item.id
      .then((res) => {
        console.log("Data deleted successfully:", res.data);
        setData((prevData) =>
          prevData.filter((dataItem) => dataItem.ID !== item.ID)
        );
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };
  return (
    <div>
      <div className="table-container">
        <div className="search-container">
          <input
            className="search-input"
            label="Search by Name"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="search name"
          />
          <div style={{}}>
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
                            toggleEdit(item.ID);
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
                            handleDelete(item);
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

export default TableComponents;
