import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; 
import Info from '@mui/icons-material/Info'
import '../Pages/Sidebar.css';


function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <HomeIcon /> Home
          </Link>
        </li>
        <li>
          <Link to="/addstudent">
            <PersonAddIcon /> Add Student
          </Link>
        </li>
        <li>
          <Link to="/viewstudent">
            <Info /> View Student
          </Link>
        </li>
        <li>
          <Link to="/viewusers">
            <Info /> View Users
          </Link>
        </li>
        <li>
          <Link to="/managestudent">
            <Info /> Manage Student
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

