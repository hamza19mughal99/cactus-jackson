import React from "react";
import Header from "../../Components/Admin/Header/Header";
import { adminSideBarItems } from "../../Container/Admin/Routes/Routes";
import { Outlet } from "react-router-dom";
import { CurrentUserInfo } from "../../Util/helper";
import NotFound from "../../Container/NotFound.js/NotFound";
const AdminLayout = () => {

  return (
    <div>
      {
        CurrentUserInfo()?.role_name === 'admin' ?
          <Header sideBarItems={adminSideBarItems}>
            <Outlet />
          </Header> : <NotFound />
      }
    </div>
  );
};

export default AdminLayout;