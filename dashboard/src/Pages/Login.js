import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import './Login.css';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(true);

  const handleLogin = () => {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    setOpen(false);
    window.location.href = '/dashboard';
  };

  return (
    <Modal
      open={open}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      className="login-modal"
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
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleLogin} fullWidth>
          Login
        </Button>
      </Box>
    </Modal>
  );
};

export default Login;
