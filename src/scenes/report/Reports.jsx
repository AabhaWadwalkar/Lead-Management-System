import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme"; // Assuming you're using a theme

const ReportPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch leads data
  useEffect(() => {
    fetch("http://localhost:8000/get") // Ensure this is your correct API endpoint
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
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone", flex: 1.5 },
    { field: "leadSource", headerName: "Lead Source", flex: 1.5 },
    { field: "stage", headerName: "Stage", flex: 1.5 },
    { field: "nextStep", headerName: "Next Step", flex: 1.5 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "city", headerName: "City", flex: 1.2 },
    { field: "state", headerName: "State", flex: 1.2 },
    { field: "zipcode", headerName: "Zipcode", flex: 1.2 },
    { field: "course", headerName: "Course", flex: 1.5 },
    { field: "followupdate", headerName: "Followup Date", flex: 1.5 },
    { field: "followuptime", headerName: "Followup Time", flex: 1.5 },
    { field: "price", headerName: "Price", flex: 1.2 },
  ];

 

  const handleRowClick = (params) => {
    navigate(`/lead/${params.row._id}`, { state: params.row });
  };

  return (
    <Container maxWidth="xl">
      {/* Report Title */}
      <Typography variant="h1" fontWeight="bold" align="left" gutterBottom mt={5}>
        Leads Report
      </Typography>

      {/* Card for Summary */}
      <Grid container spacing={2} justifyContent="center" mb={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ backgroundColor: colors.primary[400] }}>
            <CardContent>
              <Typography variant="h4" color="black" gutterBottom style={{fontWeight: "bold"}}>
                Total Leads: {leads.length}
              </Typography>
              <Typography variant="h5" color="black" style={{fontWeight: "bold"}}>
                View and download the complete report below.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Table */}
     
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid
            rows={leads}
            columns={columns}
            pageSize={5}
            autoHeight
            disableSelectionOnClick
            getRowId={(row) => row._id}
            onRowClick={handleRowClick}
            sx={{
              '& .MuiDataGrid-root': { border: 'none' },
              '& .MuiDataGrid-columnHeaders': { backgroundColor: "rgb(5,78,90)", color: "#fff" },
              '& .MuiDataGrid-cell': { borderBottom: "none", fontSize: "16px" },
              '& .MuiDataGrid-footerContainer': { backgroundColor: "rgb(5,78,90)" },
              '& .MuiTablePagination-selectLabel': { color: "#fff" },
              '& .MuiSelect-select': { color: "#fff" },
              '& .MuiTablePagination-selectIcon': { color: "#fff" },
              '& .MuiTablePagination-displayedRows': { color: "#fff" },
              '& .MuiDataGrid-virtualScroller': { backgroundColor: colors.primary[400] },
            }}
          />
        </div>
    

      {/* Download Report Button */}
      <Grid container justifyContent="center">
        <CSVLink
          data={leads}
          headers={columns.map((column) => ({ label: column.headerName, key: column.field }))}
          filename={"leads_report.csv"}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="primary" size="large" style={{backgroundColor:"rgb(5,78,90)", marginTop: "25px"}}>
            Download CSV Report
          </Button>
        </CSVLink>
      </Grid>
    </Container>
  );
};

export default ReportPage;
