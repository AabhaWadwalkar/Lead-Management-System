import {  Typography } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const navigate = useNavigate();

  const srno = useRef();
  const leadname = useRef();
  const email = useRef();
  const phone = useRef();
  const leadsource = useRef();
  const stage = useRef();
  const nextstep = useRef();
  const status = useRef();
  const city = useRef();
  const state = useRef();
  const zipcode = useRef();
  const course = useRef();
  const followupdate = useRef();
  const followuptime = useRef();
  const price = useRef();

  function addDetails() {
    let details = {
      "srno": srno.current.value,
      "name": leadname.current.value,
      "email": email.current.value,
      "phone": phone.current.value,
      "leadSource": leadsource.current.value,
      "stage": stage.current.value,
      "nextStep": nextstep.current.value,
      "status": status.current.value,
      "city": city.current.value,
      "state": state.current.value,
      "zipcode": zipcode.current.value,
      "course": course.current.value,
      "followupdate": followupdate.current.value,
      "followuptime": followuptime.current.value,
      "price": price.current.value,
    }
    fetch('http://localhost:8000/add', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Lead added successfully");
          navigate("/allleads");
        } else {
          console.log("Failed to add lead");
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  return (
    <div>
      <Typography variant="h1" fontWeight="bold" style={{marginLeft: "20px", marginTop:"30px"}}>
        Add Leads
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>

        <div style={{ width: "60%", backgroundColor: "rgb(5,78,90)", padding: "50px", borderRadius: "12px", boxShadow: "0 8px 16px rgb(0,0,0,0.1)" }}>
          <div style={{ display: "flex" }}>
            <input type="text" ref={srno} placeholder="Enter sr.no" style={{ width: "50%", marginBottom: "12px", marginRight: "5px", padding: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={leadname} placeholder="Enter lead name" style={{ width: "50%", marginRight: "5px", marginBottom: "12px", padding: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={email} placeholder="Enter email" style={{ width: "50%", marginRight: "5px", padding: "12px", marginBottom: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
          </div>
          <div style={{ display: "flex" }}>
            <input type="text" ref={phone} placeholder="Enter phone" style={{ width: "50%", padding: "12px", marginRight: "5px", marginBottom: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={leadsource} placeholder="Enter lead source" style={{ width: "50%", marginRight: "5px", marginBottom: "12px", padding: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={stage} placeholder="Enter Stage" style={{ width: "50%", padding: "12px", marginBottom: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
          </div>
          <div style={{ display: "flex" }}>
            <input type="text" ref={nextstep} placeholder="Enter Next Step" style={{ width: "50%", padding: "12px", marginRight: "5px", marginBottom: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={status} placeholder="Enter Status" style={{ width: "50%", padding: "12px", marginRight: "5px", marginBottom: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={city} placeholder="Enter City" style={{ width: "50%", padding: "12px", marginBottom: "12px", marginRight: "5px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
          </div>
          <div style={{ display: "flex" }}>
            <input type="text" ref={state} placeholder="Enter State" style={{ width: "50%", padding: "12px", marginRight: "5px", marginBottom: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={zipcode} placeholder="Enter Zipcode" style={{ width: "50%", padding: "12px", marginBottom: "12px", marginRight: "5px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={course} placeholder="Enter course" style={{ width: "50%", padding: "12px", marginBottom: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
          </div>
          <div style={{ display: "flex" }}>
            <input type="text" ref={followupdate} placeholder="Enter followupdate" style={{ width: "50%", padding: "12px", marginBottom: "12px", marginRight: "5px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={followuptime} placeholder="Enter followuptime" style={{ width: "50%", marginRight: "5px", padding: "12px", marginBottom: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
            <input type="text" ref={price} placeholder="Enter price" style={{ width: "50%", padding: "12px", marginBottom: "12px", border: "1px solid #bdc3c7", borderRadius: "6px", backgroundColor: "#ecf0f1" }} /><br />
          </div>
          <button onClick={addDetails} style={{ width: "100%", padding: "14px", backgroundColor: "#043a42", marginBottom: "12px", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", marginTop: "15px" }}>Add a lead</button>
        </div>
      </div>
    </div>
  );

};

export default Team;
