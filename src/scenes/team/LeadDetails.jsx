import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid, Divider, TextField, Snackbar, Alert } from "@mui/material";

const LeadDetails = () => {
  const { state: lead } = useLocation();
 
  const [editableLead, setEditableLead] = useState({ ...lead });
  const [isEditing, setIsEditing] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableLead((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
  const handleSave = async () => {
    try {
      console.log("Saving lead:", editableLead); 
  
      const response = await fetch(`http://localhost:8000/update/${encodeURIComponent(lead.name)}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editableLead),
      });
  
      console.log("Response Status:", response.status); 
      const responseBody = await response.text(); 
      console.log("Response Body:", responseBody); 
  
      if (response.ok) {
        console.log("Lead updated successfully. Navigating...");
        setSnackOpen(true);
        navigate("/allleads");
      } else {
        console.error("Failed to update lead:", response.status, responseBody);
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
  };
  

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        const response = await fetch(`http://localhost:8000/delete?name=${lead.name}`, { method: "DELETE" });
        if (response.ok) {
          setSnackOpen(true);
          navigate("/allleads");
        }else{
          console.error("Failed to delete lead");
        }
      } catch (error) {
        console.error("Failed to delete lead", error);
      }
    }
  };

  return (
    <Box
      m="20px"
      sx={{
        background: "linear-gradient(135deg, #f3f3f3, #e7e7e7)",
        minHeight: "100vh",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
    >
      <Typography
        variant="h1"
        fontWeight="bold"
        mb="20px"
        sx={{ color: "#333", fontSize: "2.5rem", textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}
      >
        Lead Details
      </Typography>

      {lead ? (
        <Paper
          elevation={5}
          sx={{
            padding: "20px",
            backgroundColor: "#fff",
            color: "#333",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
          <Grid container spacing={2}>
            {Object.entries(editableLead).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="h6" mb="10px" sx={{ fontSize: "18px", fontWeight: "500", "& strong": { color: "black" } }}>
                  <strong>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong>
                  {isEditing ? (
                    <TextField
                      size="small"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      fullWidth
                      sx={{ marginTop: "5px" }}
                    />
                  ) : (
                    value
                  )}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ margin: "20px 0" }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "rgb(5,78,90)", color: "#fff", fontWeight: "bold", transition: "0.3s", "&:hover": { backgroundColor: "#044d56" } }}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>

            <Box>
              {isEditing ? (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#4caf50", color: "#fff", fontWeight: "bold", marginRight: "10px" }}
                  onClick={handleSave}
                >
                  SAVE
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "rgb(5,78,90)", color: "#fff", fontWeight: "bold", marginRight: "10px" }}
                  onClick={handleEditToggle}
                >
                  EDIT
                </Button>
              )}
              <Button
                variant="contained"
                sx={{ backgroundColor: "rgb(5,78,90)", color: "#fff", fontWeight: "bold" }}
                onClick={handleDelete}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Typography variant="h6" sx={{ color: "#777", fontStyle: "italic" }}>
          No lead data available.
        </Typography>
      )}

      <Snackbar open={snackOpen} autoHideDuration={2000} onClose={() => setSnackOpen(false)}>
        <Alert severity="success" onClose={() => setSnackOpen(false)}>
          Lead updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LeadDetails;
