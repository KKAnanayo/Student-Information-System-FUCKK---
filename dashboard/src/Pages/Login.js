import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import './Login.css';
import { Link } from "react-router-dom";
import axios from "axios";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginopen, setLoginOpen] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorNone, setEmailNone] = useState(false);
    const [passwordErrorWrong, setPasswordWrong] = useState(false);

    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [editFirst, setEditFirst] = useState("");
    const [editLast, setEditLast] = useState("");
    const [editMiddle, setEditMiddle] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailRequiredError, setEmailRequiredError] = useState(false);
    const [emailUniqueError, setEmailUniqueError] = useState(false);
    
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');

        if (storedEmail) {
            window.location.href = "/dashboard";
        }
        else if (localStorage == null) {

            window.location.href = "/Login";
        }
    }, []);

    function handleClose() {
        setLoginOpen(true);
    };

    function handleLogin() {
        if (!email || !password) {
            setEmailError(!email);
            setPasswordError(!password);
            return;
        }

        axios.get(`http://localhost:1337/viewUsers`)
            .then((response) => {
                const users = response.data;
                const user = users.find(user => user.Email === email);
                if (user) {
                    if (user.Password === password) {
                        console.log('Login successful');
                        localStorage.setItem('email', email);
                        window.location.href = "/dashboard";
                    } else {
                        console.log('Incorrect password');
                        setPasswordWrong(true);
                        setEmailNone(false);
                    }
                } else {
                    console.log('User not found');
                    setEmailNone(true);
                    setPasswordWrong(true);
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    function handleSignup() {
       setLoginOpen(false);
        setModalOpen(true);
    };
    function handleAddUser () {
        
        if (!editFirst) {
            setFirstNameError(true);
            return;
        } else {
            setFirstNameError(false);
        }

         
        if (!editLast) {
            setLastNameError(true);
            return;
        } else {
            setLastNameError(false);
        }

        if (!editEmail) {
            setEmailRequiredError(true);
            return;
        } else {
            setEmailRequiredError(false);
        }

        if (!editPassword) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        
        const userData = {
            First: editFirst,
            Last: editLast,
            Middle: editMiddle,
            Email: editEmail,
            Password: editPassword,
        };

        axios.post("http://localhost:1337/addUser", userData)
        .then(response => {
    
            console.log("User added successfully:", response.data);
            setEditFirst("");
            setEditLast("");
            setEditMiddle("");
            setEditEmail("");
            setEditPassword("");
            setModalOpen(false); 
            window.location.href="/Login";
            setEmailUniqueError(false);
        })
        .catch(error => {
            console.error("Error adding user:", error);
            setEmailUniqueError(true);
            });
    }


    return (
        <div className="loginBody">
            <Modal
                open={loginopen}
                aria-labelledby="login-modal-title"
                aria-describedby="login-modal-description"
                className="custom-modal"
            >
                <Box className="login-container">
                    <h2 id="login-modal-title">Login</h2>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={emailError || emailErrorNone}
                        helperText={
                            (emailError && "Email is required") ||
                            (emailErrorNone && "Email not found")
                        }
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={passwordError || passwordErrorWrong} 
                        helperText={
                            (passwordError && "Password is required") ||
                            (passwordErrorWrong && "Password is wrong")
                        }
                    />
                    <div className="button-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button variant="contained" onClick={handleLogin}>
                            Login
                        </Button>   
                      <br/>
                      <Link onClick={handleSignup}>No Account? Signup</Link>
                    </div>
                </Box>
            </Modal>

           
            <Modal open={modalOpen}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
            className="custom-modal"
            onClose={handleClose}
            >
                <Box className="login-container">
                <Typography variant="h6" component="h2" fontWeight="bold" align="center">Sign up</Typography>
                    <div className="fieldContainer" style={{ marginBottom: '16px' }} />
                    
                    <TextField variant="outlined" 
                    label="First Name" 
                    value={editFirst} onChange={(e) => 
                    setEditFirst(e.target.value)} 
                    error={firstNameError}
                    helperText={firstNameError && "First Name is required"}
                    />
                    <div style={{ marginBottom: '16px' }}/>
                    <TextField variant="outlined" 
                    label="Last Name" 
                    value={editLast} 
                    onChange={(e) => setEditLast(e.target.value)} 
                    error={lastNameError}
                    helperText={lastNameError && "Last Name is required"}
                    />
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" 
                    label="Middle Name" 
                    value={editMiddle} 
                    onChange={(e) => setEditMiddle(e.target.value)} 
                    />
    
                    <div style={{ marginBottom: '16px' }} />
                    <TextField variant="outlined" 
                    label="Email" 
                    value={editEmail} 
                    onChange={(e) => setEditEmail(e.target.value)} 
                    error={emailRequiredError || emailUniqueError}
                    helperText={
                        (emailRequiredError && "Email is required") ||
                        (emailUniqueError && "Email must be unique")
                    }
                    />
                    <div style={{ marginBottom: '16px' }} 
                    />
                    <TextField type="password" 
                    variant="outlined" 
                    label="Password" 
                    value={editPassword} 
                    onChange={(e) => setEditPassword(e.target.value)} 
                    error={passwordError}
                    helperText={passwordError && "Password is required"}
                    />
                    <div style={{ marginBottom: '16px' }} />
                    <Button variant="contained" onClick={handleAddUser}>Sign Up</Button>
                </Box>
            </Modal>
        </div>

    );
}
export default Login;
