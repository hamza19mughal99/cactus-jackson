import { MdClose } from "react-icons/md";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cloudURL } from "../../../Util/helper";
import { successNotify } from "../../../Util/toast";

function MobileSidebar({ navbarRef, NavHandler, UserDetail, sideBarItems }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear()
    navigate('/')
    successNotify("Logout successfully!")
  }

  useEffect(() => {
    navbarRef.current.style.width = "0%";
  }, [pathname])

  return (
    <div className="overlay" ref={navbarRef}>
      <span className="closebtn" onClick={NavHandler}>
        <MdClose />
      </span>
      <div className={"overlay-content"}>
        <div className="d-flex align-items-center text-white gap-2 mb-3">
          <div className="mobile_sidebar_avatar">
            {
              UserDetail?.data?.user_avatar ? <img src={`${cloudURL}logo/${UserDetail?.data?.user_avatar}`} alt="" /> :
                <img src="/images/profileImg.svg" alt="" />
            }
          </div>
          <div>
            <h6>{UserDetail?.data?.first_name}</h6>
          </div>
        </div>

        {sideBarItems?.map((item, index) => {
          return (
            <Link to={item.path} className={pathname === item.path ? "nav-active" : "nav-link"}>
              <span className="overlay-content-number">0{index + 1} - </span> {item.title}
            </Link>
          );
        })}
        <button className="mobile_sidebar_logout_btn" onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
}

export default MobileSidebar;
