import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, FormControlLabel, Button, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Style.css';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLogin } from '../../Redux/action/auth';
import { CurrentUserInfo } from '../../Util/helper';
import { Spinner } from 'react-bootstrap';
import { errorNotify, successNotify } from '../../Util/toast';

const theme = createTheme({
  palette: {
    primary: {
      main: '#43425D',
      light: '#43425D',
      dark: '#43425D',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#ffffff',
      contrastText: '#43425D'
    },
  },
});

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, user } = useSelector((state) => state.LoginUser);

  const [userData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (CurrentUserInfo()) {
      if (CurrentUserInfo().role === 1) {
        navigate("/admin/profile")
      }
      else if (CurrentUserInfo().role === 2) {
        navigate("/student/courses")
      }
    }
  }, [CurrentUserInfo()])

  useEffect(() => {
    if (user?.status === 1) {
      successNotify(user?.message)
      if (CurrentUserInfo().role === 1) {
        navigate("/admin/profile")
      }
      else if (CurrentUserInfo().role === 2) {
        navigate("/student/courses")
      }
      dispatch({ type: "LOGIN_RESET" });
    }
    if (error) {
      errorNotify(error)
      dispatch({ type: "CLEAR_ERRORS" });

    }

  }, [user?.status, error]);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userData.username.length === 0 || userData.password.length === 0) {
      errorNotify("fields cannot be empty")
      return
    }
    dispatch(AuthLogin(userData));
  };

  return (
    <div className='Main'>
      <div className='Left'></div>
      <div className='Right'>

        <a href='/'><img src='/images/logo_black.png' alt='Cactus Jackson' className='mb-3' /></a>

        <div className='Text'>Welcome back! Please login to your account.</div>
        <form onSubmit={handleSubmit}>
          <ThemeProvider theme={theme}>
            <div>
              <TextField
                label="Username"
                variant='standard'
                name="username"
                value={userData.username}
                onChange={handleFormChange}
                fullWidth={true}
              />
            </div>
            <div>
              <TextField
                label="Password"
                type="password"
                variant="standard"
                name="password"
                value={userData.password}
                onChange={handleFormChange}
                fullWidth={true}
              />
            </div>
            <div className='Two' style={{ justifyContent: "end" }}>
              <a href='/forgot-password'>Forgot Password?</a>
            </div>
            <div className='Two'>
              <Button type="submit" variant="contained">
                {loading ? <Spinner animation='border' size='sm' /> : 'Log in'}
              </Button>
              <Button variant="contained" color='secondary' type='button' onClick={() => navigate('/Signup')} className='emptyButton'>
                Sign up
              </Button>
            </div>
          </ThemeProvider>
        </form>
        <div className='footnote'>
          Term of use. Privacy policy
        </div>
      </div>
    </div>
  );
}

export default Signin;