import React, { useEffect } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import './Header.css';
import { useLocation, useNavigate } from "react-router-dom";
import { CurrentUserInfo, cloudURL } from "../../Util/helper";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../Redux/action/auth";
import { successNotify } from "../../Util/toast";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { UserDetail } = useSelector(state => state.getUserProfile)
    const { updateUserDetail } = useSelector((state) => state.updateUser);
    const { pathname } = useLocation()

    let data = CurrentUserInfo()

    useEffect(() => {
        if (CurrentUserInfo()) {
            dispatch(userProfile());
        }
    }, [dispatch]);

    useEffect(() => {
        if (updateUserDetail?.status === 1) {
            dispatch(userProfile());
        }
    }, [dispatch, updateUserDetail]);

    const logoutHandler = () => {
        localStorage.clear()
        navigate('/')
        successNotify("Logout successfully!")
    }

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand> <img src="/images/logo.png" alt="" onClick={() => navigate('/')} /> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {
                            data?.role_name !== 'admin' && data?.role_name === 'student' ?
                                <Nav.Link onClick={() => navigate('/student/courses')}>COURSE</Nav.Link> : null
                        }
                        {
                            data?.role_name == 'student'
                                ?
                                <>
                                    <Nav.Link onClick={() => navigate('/student/faqs')}>FAQS</Nav.Link>
                                    {pathname === '/' && <Nav.Link href="/#about">ABOUT</Nav.Link>}
                                </>
                                :
                                <Nav.Link href="/#about">ABOUT</Nav.Link>
                        }
                    </Nav>
                    {
                        data ?
                            <div className="avatar_icon">
                                <Dropdown>
                                    <Dropdown.Toggle>
                                        {UserDetail?.data?.first_name}
                                    </Dropdown.Toggle>
                                    {
                                        data?.role_name === 'admin' ?
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="/admin/profile">Dashboard</Dropdown.Item>
                                                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                                            </Dropdown.Menu> :
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => navigate('/student/profile')}>Profile</Dropdown.Item>
                                                <Dropdown.Item onClick={() => navigate('/student/courses')}>Courses</Dropdown.Item>
                                                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                    }
                                </Dropdown>
                                {
                                    UserDetail?.data?.user_avatar ? <img src={`${cloudURL}logo/${UserDetail?.data?.user_avatar}`} alt="" /> :
                                        <img src="/images/profileImg.svg" alt="" />
                                }
                            </div> :
                            <div>
                                {CurrentUserInfo() ? null : <button onClick={() => navigate('/login')}>Sign in</button>}
                            </div>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;