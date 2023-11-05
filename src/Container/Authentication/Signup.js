import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StudentRegister } from '../../Redux/action/auth';
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

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isRegistered } = useSelector((state) => state.StudentRegister);

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
    if (isRegistered?.message) {
      successNotify(isRegistered.message)
      dispatch({ type: "STUDENT_REGISTER_RESET" })
      navigate("/login")
    }
    if (error) {
      errorNotify(error)
      dispatch({ type: "CLEAR_ERRORS" })
    }

  }, [isRegistered, error])

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirm_password: '',
  });

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userData.password !== userData.confirm_password) {
      errorNotify("Password are not same")
      return
    }

    dispatch(StudentRegister(userData))
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='Main'>
        <div className='Left'></div>
        <div className='Right'>

          <a href='/'><img src='/images/logo_black.png' alt='Cactus Jackson' className='mb-3' /></a>

          <div className='Text'>Please complete to create your account.</div>
          <form onSubmit={handleSubmit}>
            <div className='FormGroup'>
              <div>
                <TextField
                  label="First Name"
                  variant='standard'
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleFormChange}
                  fullWidth={true}
                />
              </div>
              <div>
                <TextField
                  label="Last Name"
                  variant='standard'
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleFormChange}
                  fullWidth={true}
                />
              </div>
            </div>
            <div>
              <TextField
                label="Phone Number"
                variant='standard'
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleFormChange}
                fullWidth={true}
              />
            </div>
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
            <div>
              <TextField
                label="Confirm Password"
                type="password"
                variant="standard"
                name="confirm_password"
                value={userData.confirm_password}
                onChange={handleFormChange}
                fullWidth={true}
              />
            </div>
            <div>
              <Button type="submit" variant="contained" color='primary'>
                {loading ? <Spinner animation='border' size='sm' /> : 'Sign up'}
              </Button>
            </div>
          </form>
          <p onClick={() => navigate("/login")}>Already have an account? Sign in</p>
          <div className='footnote'>
            Term of use. Privacy policy
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Signup;