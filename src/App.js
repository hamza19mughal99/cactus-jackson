import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Container/Home/Home";
import Signin from "./Container/Authentication/Signin";
import Signup from "./Container/Authentication/Signup";
import ForgotPassword from "./Container/Authentication/ForgotPassword";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import { studentRoutes } from "./Container/Student/Routes/Routes";
import NotFound from "./Container/NotFound.js/NotFound";
import { adminRoutes } from "./Container/Admin/Routes/Routes";
import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import { ToastContainer } from "react-toastify";
import StudentLayout from "./Layouts/StudentLayout/StudentLayout";
import ChangePassword from "./Container/Authentication/ChangePassword";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {

  const studentsRoute = <Route path="/student" element={<StudentLayout />}>
    {studentRoutes.map((s, i) => {
      return (
        <Route path={s.path} element={s.component} key={i} />
      )
    })}
  </Route>

  const adminLayout = (
    <Route path={"/admin"} element={<AdminLayout />}>
      {adminRoutes.map((item) => (
        <Route key={item.path} path={item.path} element={item.component} />
      ))}
    </Route>
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />

      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          <Route path="" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password/:id" element={<ChangePassword />} />

          {studentsRoute}
          {adminLayout}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
