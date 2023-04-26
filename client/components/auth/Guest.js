import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AuthForm from './AuthForm';
  
  const Guest = () => {
    const [alignment, setAlignment] = useState('LogIn');
  
    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
  
    const isSignUp = alignment === 'SignUp';
  
    return (
      <Container >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="LogIn">Log In</ToggleButton>
          <ToggleButton value="SignUp">Sign Up</ToggleButton>
        </ToggleButtonGroup>
  
        <Box>
          {isSignUp ? (
            <AuthForm name="signup" displayName="Sign Up" />
          ) : (
            <AuthForm name="login" displayName="Login" />
          )}
        </Box>
      </Container>
    );
  };
  
  export default Guest;