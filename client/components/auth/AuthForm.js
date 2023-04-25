import React , {useState} from 'react';
import { Box, TextField, InputAdornment, IconButton, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authenticate } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useSelector((state) => state.auth);
  // const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
     dispatch(authenticate({ username, password, method: formName }));
    // {
    //   isLoggedIn
    //     ? (window.alert(`${formName} Successfully!`), navigate("/"))
    //     : (console.log("failed"))
    // }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Box component="form" onSubmit={handleSubmit} name={name} backgroundColor="white"
        color="black" sx={{ p: 2, border: '1px solid gray', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>{displayName}</Typography>
        <TextField name="username" label="Username" variant="outlined" />
        <TextField name="password" label="Password" type={showPassword ? 'text' : 'password'} variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: shades.primary[300], color: "white", }}>{displayName}</Button>
        <Button type="submit" variant="contained" onClick={()=>navigate("/")} sx={{ backgroundColor: shades.primary[300], color: "white", }}>Home</Button>
        {error && <Typography variant="subtitle1" sx={{ color: 'red' }}>{error}</Typography>}
      </Box>
    </Box>
  )
  }

  export default AuthForm

