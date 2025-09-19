import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setError("");

    fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          console.log("We've got the output:", response);
          return response.json(); 
        })
        .then((data) => {
          if (data) { 
            localStorage.setItem("user", JSON.stringify(data.user)); // Save user data
            localStorage.setItem("credentials", JSON.stringify(formData)); // Save email & password
            console.log("User saved in localStorage:", data);
            alert("Login successful!");
            navigate("/dashboard"); // Redirect to dashboard page
          } else {
            console.log("Login failed: No token received");
            alert("Login failed: No token received");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("Error: " + error.message);
        });
      
    };

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: "rgb(5,78,90)" }}>
                <Toolbar>
                <img src="https://atlascopco.scene7.com/is/image/atlascopco/Atlas+Copco+Group+logo+header?$landscape1600$&fmt=png-alpha&fit=stretch,1" alt="Atlas Copco Logo" style={{ height: "30px", width: "100px", marginLeft: "80px" }}></img>
                    <Typography variant="h6" sx={{ flexGrow: 1 }} style={{ fontSize: "20px", marginLeft: "70px" }}>
                        Lead Management System
                    </Typography>
                    <Button color="inherit" style={{ fontSize: "15px" }} onClick={() => navigate("/signup")}>Sign Up</Button>
                </Toolbar>
            </AppBar>
            <div style={{ width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#fff" }}>
                <div style={{ flex: 1, maxWidth: "400px", backgroundColor: "rgb(5,78,90)", padding: "45px", borderRadius: "10px", boxShadow: "0 8px 16px rgba(0,0,0,0.1)"}}>
                    <h1 style={{ fontSize: "1.8rem", textAlign: "center", color: "#fff", fontWeight: "600", marginLeft: "0", marginBottom: "20px" }}>Log In</h1>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="text" style={{ width: "100%", border: "1px solid #bdc3c7", paddingRight: "0px", paddingLeft: "12px", paddingTop: "12px", paddingBottom: "12px", marginBottom: "10px", borderRadius: "6px", fontSize: "1rem", color: "#34495e", backgroundColor: "#ecf0f1", transition: "borderColor 0.3s ease" }} placeholder="Enter email" name="email" onChange={handleChange} />
                        <input type="text" style={{ width: "100%", border: "1px solid #bdc3c7", paddingRight: "0px", paddingLeft: "12px", paddingTop: "12px", paddingBottom: "12px", marginBottom: "10px", borderRadius: "6px", fontSize: "1rem", color: "#34495e", backgroundColor: "#ecf0f1", transition: "borderColor 0.3s ease" }} placeholder="Enter password" name="password" onChange={handleChange} />
                        <button type="submit" style={{ width: "100%", padding: "14px", backgroundColor: "rgb(4,58,66)", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontSize: "1.1rem", marginTop: "12px" }}>Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;
