import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Header from "../../components/Header";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import StatBox from "../../components/StatBox"; 
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid"; // DataGrid for tables

const LeadManagementDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // State to hold leads data
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leads data on component mount
  useEffect(() => {
    fetch("http://localhost:8000/get")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setLeads(data); // Set the fetched data to the leads state
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Leads...</p>;
  if (error) return <p>Error: {error}</p>;

  // Lead statistics calculations based on the data
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter((lead) => lead.stage === "Qualified").length;
  const convertedLeads = leads.filter((lead) => lead.status === "Converted").length;
  const engagedLeads = leads.filter((lead) => lead.status === "Engaged").length;

  const leadStatuses = Object.values(
    leads.reduce((acc, lead) => {
      const status = lead.status || "Unknown";
      acc[status] = acc[status] || { id: status, label: status, value: 0 };
      acc[status].value += 1;
      return acc;
    }, {})
  );
  

  const followUpColumns = [
    { field: "name", headerName: "Lead Name", flex: 1 },
    { field: "followupdate", headerName: "Follow-up Date", flex: 1 },
  ];

  const handleRowClick = (params) => {
    navigate(`/lead/${params.row._id}`, { state: params.row });
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Overview of your leads" />

        <Box>
          <Button
            sx={{
              backgroundColor: "rgb(5,78,90)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          onClick={()=> navigate("/allleads")}
          >
            <PersonIcon sx={{ mr: "10px" }} />
            Show Leads
          </Button>
        </Box>
      </Box>

      {/* GRID & STATS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 - Lead Stats */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalLeads}
            color="black"
            subtitle="Total Leads"
            progress="0.75"
            increase="+14%"
            icon={
              <PersonIcon
                sx={{ color: "rgb(5,78,90)", fontSize: "30px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={qualifiedLeads}
            subtitle="Qualified Leads"
            progress="0.50"
            increase="+21%"
            icon={
              <TaskAltIcon
                sx={{ color: "rgb(5,78,90)", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={convertedLeads}
            subtitle="Converted Leads"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: "rgb(5,78,90)", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={engagedLeads}
            subtitle="Engaged Leads"
            progress="0.80"
            increase="+43%"
            icon={
              <PeopleAltIcon
                sx={{ color: "rgb(5,78,90)", fontSize: "26px" }}
              />
            }
          />
        </Box>

<Box
  gridColumn="span 6"
  gridRow="span 2"
  backgroundColor={colors.primary[400]}
  p="30px"
  borderRadius="10px"
>
  <Typography variant="h5" fontWeight="600" mb="15px" fontSize="20px">
    Lead Status Distribution
  </Typography>

  {leadStatuses.length > 0 ? (
    (() => {
      const maxValue = Math.max(...leadStatuses.map((s) => s.value));

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {leadStatuses.map((item) => (
            <div key={item.label}>
              <Typography variant="h4" style={{ color: "black", marginBottom: "4px" }}>
                {item.label} ({item.value})
              </Typography>
              <div
                style={{
                  height: "20px",
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: "rgb(5,78,90)",
                  borderRadius: "4px",
                  transition: "width 0.3s",
                }}
              />
            </div>
          ))}
        </div>
      );
    })()
  ) : (
    <Typography color="#fff">No lead status data</Typography>
  )}
</Box>

        {/* ROW 3 - Leads by Stage in Table Format */}

        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          height="720px"
        >
          <Typography variant="h5" fontWeight="600" fontSize="20px" mb="15px">
            Leads by Stage
          </Typography>
          <Box height="300px">
            <DataGrid
              rows={leads.map((lead) => ({
                id: lead._id, // Use _id as the unique identifier
                name: lead.name, // Assuming "name" field exists in your data
                stage: lead.stage // Assuming "stage" field exists in your data
              }))}
              columns={[
                { field: "name", headerName: "Lead Name", flex: 1 },
                { field: "stage", headerName: "Stage", flex: 1 }
              ]}
              pageSize={5}
              checkboxSelection
              onRowClick={handleRowClick}
              style={{ cursor: "pointer", fontWeight: "300", fontSize: "20px" }}
            />
          </Box>
        </Box>

        {/* ROW 4 - Upcoming Follow-ups in Table Format */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          height="400px"
        >
          <Typography variant="h5" fontWeight="600" mb="15px" fontSize="20px">
            Upcoming Follow-ups
          </Typography>
          <Box height="300px">
            <DataGrid
              rows={leads}
              columns={followUpColumns}
              pageSize={5}
              checkboxSelection
              onRowClick={handleRowClick}
              getRowId={(row) => row._id}  // Specify the _id as the unique identifier
              style={{ cursor: "pointer", fontWeight: "300", fontSize: "20px" }}
            />

          </Box>
        </Box>


      </Box>
    </Box>
  );
};

export default LeadManagementDashboard;
