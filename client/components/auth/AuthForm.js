import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/store';
import { useNavigate } from 'react-router-dom';
/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    await dispatch(authenticate({ username, password, method: formName }));
    {
      isLoggedIn? (alert(`${formName} Successfully`)
      ):(
        (alert(`${formName} Failed, Please Try Again`))
      )
    }
    navigate("/")
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box component="form" onSubmit={handleSubmit} name={name} sx={{ p: 2, border: '1px solid gray', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>{displayName}</Typography>
        <TextField name="username" label="Username" variant="outlined" />
        <TextField name="password" label="Password" type="password" variant="outlined" />
        <Button type="submit" variant="contained" sx={{ backgroundColor: shades.primary[300], color: "white", }}>{displayName}</Button>
        {error && <Typography variant="subtitle1" sx={{ color: 'red' }}>{error}</Typography>}
      </Box>
    </Box>
  );
};


export default AuthForm;