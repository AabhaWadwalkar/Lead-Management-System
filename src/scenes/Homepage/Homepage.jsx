import React from "react";
import { Box, Button, Typography, Container, Grid, AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (

    <Box
      sx={{backgroundColor: "#f4f4f4", minHeight: "100vh"}}>
              <AppBar position="static" style={{backgroundColor: "rgb(5,78,90)"}}>
         <Toolbar>
         <img src="https://atlascopco.scene7.com/is/image/atlascopco/Atlas+Copco+Group+logo+header?$landscape1600$&fmt=png-alpha&fit=stretch,1" alt="Atlas Copco Logo" style={{height: "30px", width: "100px", marginLeft: "80px"}}></img>
           <Typography variant="h6" sx={{ flexGrow: 1 }} style={{fontSize: "20px", marginLeft: "70px"}}>
             Lead Management System
         </Typography>
          <Button color="inherit" style={{fontSize: "15px"}} onClick={()=> navigate("/signup")}>Sign Up</Button>
          <Button color="inherit" style={{fontSize: "15px"}} onClick={()=> navigate("/login")}>Log In</Button>
       </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            borderRadius: "15px",
            animation: "fadeIn 1s ease-in-out",
            marginTop: "200px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#055e6a",
              mb: 2,
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Welcome to Lead Management System
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "black",
              fontSize: "20px",
              mb: 3,
            }}
          >
            Track, manage, and convert your leads efficiently.
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#055e6a",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "#044d56" },
                }}
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#055e6a",
                  color: "#055e6a",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "#e0f7fa" },
                }}
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Homepage;
