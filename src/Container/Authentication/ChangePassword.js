import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import './Style.css';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ChangePassword() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)

    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    })

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

    let query = useQuery();
    let getEmail = query.get("email")

    const forgetHandler = (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            errorNotify("Password must be same")
            return
        }

        setLoader(true)
        const data = {
            email: getEmail,
            token: id,
            password: passwordData.newPassword,
            confirm_password: passwordData.confirmPassword
        }

        axios.put('auth/update_password', data)
            .then((res) => {
                setLoader(false)
                successNotify("Password Update Successfully")
                navigate('/login')
            }).catch((e) => {
                setLoader(false)
                errorNotify(e.response.data.message)
            })
    };

    return (
        <ThemeProvider theme={theme}>
            <div className='Main'>
                <div className='Left'></div>
                <div className='Right'>

                    <a href='/'><img src='/images/logo_black.png' alt='Cactus Jackson' className='mb-3' /></a>

                    <form onSubmit={forgetHandler}>
                        <div>
                            <TextField
                                label="New Password"
                                variant='standard'
                                type='password'
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({
                                    ...passwordData,
                                    newPassword: e.target.value
                                })}
                                fullWidth={true}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Confirm Password"
                                variant='standard'
                                type='password'
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({
                                    ...passwordData,
                                    confirmPassword: e.target.value
                                })}
                                fullWidth={true}
                            />
                        </div>
                        <div>
                            <Button type="submit" variant="contained">
                                {loader ? <Spinner animation='border' size='sm' /> : "Change"}
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

export default ChangePassword;