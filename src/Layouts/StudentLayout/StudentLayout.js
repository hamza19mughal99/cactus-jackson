import React from 'react'
import { Outlet } from 'react-router-dom'
import { CurrentUserInfo } from '../../Util/helper'
import NotFound from '../../Container/NotFound.js/NotFound'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

const StudentLayout = () => {
    return (
        <React.Fragment>
            {
                CurrentUserInfo()?.role_name === 'student' ?
                    <React.Fragment>
                        <Header />
                        <Outlet />
                        <Footer />
                    </React.Fragment> : <NotFound />
            }
        </React.Fragment>
    )
}
export default StudentLayout