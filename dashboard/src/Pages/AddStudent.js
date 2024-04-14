import React, { useState } from "react";
import './AddStudent.css';
import { Grid, TextField, Button } from '@mui/material';

function AddStudent() {
  const [ID, setID] = useState("");
  const [First, setFirst] = useState("");
  const [Last, setLast] = useState("");
  const [Middle, setMiddle] = useState("");
  const [Course, setCourse] = useState("");
  const [Year, setYear] = useState("1");
  const [error, setError] = useState("");

  async function handleAddStudent() { 
    if (!First || !Last || !ID || !Course) {
      setError("Please fill out all Box.");
      return;
    }

    const studentData = {
      ID,
      First,
      Last,
      Middle,
      Course,
      Year,
    };

    try {
      const response = await fetch("http://localhost:1337/addstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json();

      if (result.success) {
        setID("");
        setFirst("");
        setLast("");
        setMiddle("");
        setCourse("");
        setYear("");
        setError("");
        alert(result.message);
      } else {
        alert("Failed to add student. Please try again.")
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred. Please try again.");
    }
  }

  // Function to handle changes in the "Year" TextField
  function handleYearChange(event) {
    const { value } = event.target;
    if (value >= 1 && value <= 5) {
      setYear(value);
    }
  }

  // Function to handle changes in the "ID Number" TextField
function handleIDChange(event) {
  const { value } = event.target;
  if (/^\d{0,8}$/.test(value)) { // Using regex to allow only exactly 8 digits
    setID(value);
  } else {
    alert("ID Number should contain only up to 8 digits and numbers.");
  }
}


  function handleCourseChange(event) {
    const { value } = event.target;
    if (/^[A-Za-z]+$/.test(value) || value === '') { // Allow only letters or empty string
      setCourse(value);
    }
  }
  
  // Function to handle changes in the "First Name" TextField
function handleFirstNameChange(event) {
  const { value } = event.target;
  if (/^[A-Za-z\s\-_.]*$/.test(value) || value === '') { // Allow letters, spaces, hyphens, underscores, and dots or empty string
    setFirst(value);
  }
}

// Function to handle changes in the "Last Name" TextField
function handleLastNameChange(event) {
  const { value } = event.target;
  if (/^[A-Za-z\s\-_.]*$/.test(value) || value === '') { // Allow letters, spaces, hyphens, underscores, and dots or empty string
    setLast(value);
  }
}

// Function to handle changes in the "Middle Name" TextField
function handleMiddleNameChange(event) {
  const { value } = event.target;
  if (/^[A-Za-z\s\-_.]*$/.test(value) || value === '') { // Allow letters, spaces, hyphens, underscores, and dots or empty string
    setMiddle(value);
  }
}

  return (
    <div className='content'>
      <Grid container direction="row" justifyContent="left" alignItems="left">
        <Grid item xs={4}>
          <h4>ADD STUDENT</h4>
          <TextField
            id="outlined-basic"
            label="ID Number"
            variant="outlined"
            value={ID}
            onChange={handleIDChange} // Apply the validation function here
            sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
            error={error && !ID} // Add error styling when ID is empty
            helperText={error && !ID ? error : ""}
          />

        <TextField 
          id="outlined-basic" 
          label="First Name" 
          variant="outlined" 
          value={First} 
          onChange={handleFirstNameChange}
          sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
          error={error && !First} // Add error styling when First is empty
          helperText={error && !First ? error : ""}
        />


        <TextField 
          id="outlined-basic" 
          label="Last Name" 
          variant="outlined" 
          value={Last} 
          onChange={handleLastNameChange}
          sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
          error={error && !Last} // Add error styling when Last is empty
          helperText={error && !Last ? error : ""}
        />

        <TextField 
          id="outlined-basic" 
          label="Middle Name" 
          variant="outlined" 
          value={Middle} 
          onChange={handleMiddleNameChange}
          sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
        />

        <TextField 
        id="outlined-basic" 
        label="Course" 
        variant="outlined" 
        value={Course} 
        onChange={handleCourseChange}
        sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
        error={error && !Course} // Add error styling when Course is empty
        helperText={error && !Course ? error : ""}
        />

            <TextField
            id="outlined-basic"
            label="Year"
            variant="outlined"
            value={Year}
            onChange={handleYearChange} // Apply the validation function here
            sx={{ width: '20vw', mb: 5, fontSize: '24px' }}
            type="number"
          />

          <Button
            variant="contained"
            type="submit"
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddStudent;