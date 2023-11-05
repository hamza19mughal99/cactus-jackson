import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import './Style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { errorNotify, successNotify } from '../../Util/toast';
import { CurrentUserInfo } from '../../Util/helper';

const theme = createTheme({
  palette: {
    primary: {
      main: '#43425D',
      light: '#43425D',
      dark: '#43425D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#ffffff',
      contrastText: '#43425D',
    },
  },
});

function ForgotPassword() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
  });
  const [loader, setLoader] = useState(false)

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

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoader(true)

    axios.post('auth/forgot_password', userData)
      .then((res) => {
        setLoader(false)
        successNotify("Email Sent Successfully!")
        navigate('/')
      }).catch((e) => {
        if (e.response.data.status === 0 || e.response.data.status === '0') {
          errorNotify("No User Found!")
          setLoader(false)
        }
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='Main'>
        <div className='Left'></div>
        <div className='Right'>

          <a href='/'><img src='/images/logo_black.png' alt='Cactus Jackson' className='mb-3' /></a>

          <div className='Text'>Enter your email and we send you a password reset link.</div>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Email"
                variant='standard'
                name="email"
                value={userData.email}
                onChange={handleFormChange}
                fullWidth={true}
              />
            </div>
            <div>
              <Button type="submit" variant="contained">
                {loader ? <Spinner animation='border' size='sm' /> : "Send Request"}
              </Button>
            </div>
          </form>
          <div className='footnote'>
            Term of use. Privacy policy
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ForgotPassword;