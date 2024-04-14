import React, { useState, useEffect } from "react";
import './ManageStudent.css';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, TextField } from "@mui/material";

function ManageStudent() {
    const [students, setStudent] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEditOpen, setEditModalOpen] = useState(false);
    const [editedStudent, setEditedStudent] = useState(null);
    const [editFirst, setEditFirst] = useState("");
    const [editLast, setEditLast] = useState("");
    const [editMiddle, setEditMiddle] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [middleNameError, setMiddleNameError] = useState(false);
    const [emailRequiredError, setEmailRequiredError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`http://localhost:1337/viewManageStudent`)
            .then((response) => {
                setStudent(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }

    function handleAdd() {
        setModalOpen(true);
    };

    function handleEdit(student) {
        setEditedStudent(student);
        setEditFirst(student.First);
        setEditLast(student.Last);
        setEditMiddle(student.Middle);
        setEditEmail(student.Email);
        setEditPassword(student.Password);
        setEditModalOpen(true);
    };

    function handleCloseModal() {
        setModalOpen(false);
        setEditModalOpen(false);
        setEditedStudent(null);
        clearErrors();
    };

    function clearErrors() {
        setFirstNameError(false);
        setLastNameError(false);
        setMiddleNameError(false);
        setEmailRequiredError(false);
        setPasswordError(false);
    }

    function handleAddStudent() {
        clearErrors();

        if (!editFirst) {
            setFirstNameError(true);
        }

        if (!editLast) {
            setLastNameError(true);
        }

        if (!editMiddle) {
            setMiddleNameError(true);
        }

        if (!editEmail) {
            setEmailRequiredError(true);
        }

        if (!editPassword) {
            setPasswordError(true);
        }

        if (!editFirst || !editLast || !editMiddle || !editEmail || !editPassword) {
            return;
        }

        const studentData = {
            First: editFirst,
            Last: editLast,
            Middle: editMiddle,
            Email: editEmail,
            Password: editPassword,
        };

        axios.post("http://localhost:1337/addManageStudent", studentData)
            .then(response => {
                console.log("Student added successfully:", response.data);
                setEditFirst("");
                setEditLast("");
                setEditMiddle("");
                setEditEmail("");
                setEditPassword("");
                setModalOpen(false);
                fetchData();
            })
            .catch(error => {
                console.error("Error adding student:", error);
            });
    }

    function handleSaveEdit() {
        const studentData = {
            First: editFirst,
            Last: editLast,
            Middle: editMiddle,
            Email: editEmail,
            Password: editPassword,
        };

        axios.put(`http://localhost:1337/editManageStudent/${editedStudent.Email}`, studentData)
            .then(response => {
                console.log("User updated successfully:", response.data);
                setEditModalOpen(false);
                fetchData();
            })
            .catch(error => {
                console.error("Error updating student:", error);
            });
    }

    return (
        <div className="view-container">
            <h3>Manage Student</h3>
            <Button variant="contained" onClick={handleAdd}>ADD STUDENT</Button>
            <h6>MUI Table</h6>
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2" fontWeight="bold" align="left">Add Student Information</Typography>
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} error={emailRequiredError} helperText={emailRequiredError && "Email is required"} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="First Name" value={editFirst} onChange={(e) => setEditFirst(e.target.value)} error={firstNameError} helperText={firstNameError && "First Name is required"} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="Last Name" value={editLast} onChange={(e) => setEditLast(e.target.value)} error={lastNameError} helperText={lastNameError && "Last Name is required"} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="Middle Name" value={editMiddle} onChange={(e) => setEditMiddle(e.target.value)} error={middleNameError} helperText={middleNameError && "Middle Name is required"} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField type="password" variant="outlined" label="Password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} error={passwordError} helperText={passwordError && "Password is required"} />
                    <div style={{ marginBottom: '16px' }} />
                    <Button variant="contained" onClick={handleAddStudent}>Add Student</Button>
                </Box>
            </Modal>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Middle Name</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students && students.map(student => (
                            <TableRow key={student.Email}>
                                <TableCell align="center">{student.Email}</TableCell>
                                <TableCell align="center">{student.First}</TableCell>
                                <TableCell align="center">{student.Last}</TableCell>
                                <TableCell align="center">{student.Middle}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" onClick={() => handleEdit(student)}>EDIT</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={modalEditOpen} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2" fontWeight="bold" align="left">Student Information</Typography>
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} disabled />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="First Name" value={editFirst} onChange={(e) => setEditFirst(e.target.value)} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="Last Name" value={editLast} onChange={(e) => setEditLast(e.target.value)} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" label="Middle Name" value={editMiddle} onChange={(e) => setEditMiddle(e.target.value)} />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField type="password" variant="outlined" label="Password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                    <div style={{ marginBottom: '16px' }} />
                    <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ManageStudent;
