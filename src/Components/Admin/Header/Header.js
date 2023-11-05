import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import MobileSidebar from "./MobileSideBar";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUserInfo, cloudURL } from "../../../Util/helper";
import { successNotify } from "../../../Util/toast";
import { userProfile } from "../../../Redux/action/auth";

function Header({ sideBarItems, children }) {

  const { UserDetail } = useSelector(state => state.getUserProfile)
  const { updateUserDetail } = useSelector((state) => state.updateUser);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef();
  const dispatch = useDispatch()

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


  const classes = (path) => {

    let splitPath = path.split('/')
    let splitPathname = pathname.split('/')

    if (splitPath[2] === splitPathname[2]) {
      return "nav_active";
    }

    return "";
  };

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/admin/profile"
    )
      navbarRef.current.style.width = "0%";
  }, [pathname]);

  const NavHandler = () => {
    if (navbarRef.current.style.width === "100%")
      navbarRef.current.style.width = "0%";
    else navbarRef.current.style.width = "100%";
  };

  const logoutHandler = () => {
    localStorage.clear()
    navigate('/')
    successNotify("Logout successfully!")
  }

  return (
    <>
      <MobileSidebar navbarRef={navbarRef} NavHandler={NavHandler} UserDetail={UserDetail} sideBarItems={sideBarItems} />

      <div className="user_layout">
        <div className="user_header">
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container fluid>
              <Navbar.Brand onClick={() => navigate('/')}>
                <img src="/images/logo.png" alt="" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav"
                onClick={NavHandler}
              />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <div className="avatar_container">
                    <div className="d-flex align-items-center login_nav">
                      <NavDropdown title={UserDetail?.data?.first_name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">Visit Site</NavDropdown.Item>
                      </NavDropdown>
                      {
                        UserDetail?.data?.user_avatar ? <img src={`${cloudURL}logo/${UserDetail?.data?.user_avatar}`} alt="" /> :
                          <img src="/images/.jpeg" alt="" />
                      }
                    </div>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="layout_content_section">
          <div className="layout_content_sidebar_section">
            <div className="user_sidebar">
              <ul className="nav_list">
                {sideBarItems?.map((item, index) => {
                  if (item.path) {
                    return (
                      <li key={index} className={`${classes(item.path)}`}>
                        <Link to={item.path}>
                          <img src={item.icon} alt="" />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  }
                })}
                <li className="sidebar_logout_btn">
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="layout_content">{children}</div>
        </div>
      </div>
    </>
  );
}
export default Header;