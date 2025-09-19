import React, { useEffect, useState } from "react";
import { useTheme, Box, Typography, } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/get")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Leads...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    { field: "srno", headerName: "Sr. No.", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "leadSource", headerName: "Lead Source", flex: 1 },
    { field: "stage", headerName: "Stage", flex: 1 },
    { field: "nextStep", headerName: "Next Step", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "zipcode", headerName: "Zipcode", flex: 1 },
    { field: "course", headerName: "Course", flex: 1 },
    { field: "followupdate", headerName: "Followup Date", flex: 1 },
    { field: "followuptime", headerName: "Followup Time", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
  ];

  const handleRowClick = (params) =>{
    navigate(`/lead/${params.row._id}`, {state: params.row});
  };

  return (
    <Box m="20px">
      <Typography variant="h1" fontWeight="bold" mb="20px">
        Leads
      </Typography>
 
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" , fontSize: "16px" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(5,78,90)",
            color: "#fff",
          },
          "& .MuiDataGrid-cellContent":{
            fontSize: "14px",
          },
          "& .MuiDataGrid-sortIcon": { color: "#fff" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { backgroundColor: "rgb(5,78,90)" },
          "& .MuiTablePagination-selectLabel": {color: "#fff"},
          "& .MuiSelect-select": {color: "#fff"},
          "& .MuiTablePagination-selectIcon": {color: "#fff"},
          "& .MuiTablePagination-displayedRows": {color: "#fff"},
        }}
      >
        <DataGrid rows={leads} columns={columns} checkboxSelection getRowId={(row)=> row._id} onRowClick={handleRowClick} style={{cursor: "pointer"}}/>
      </Box>
    </Box>
  );
};

export default Products;
