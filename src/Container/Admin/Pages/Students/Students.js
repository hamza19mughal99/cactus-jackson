import React, { useEffect } from 'react'
import MuiTables from '../../../../Components/MuiTables/MuiTables'
import { useDispatch, useSelector } from 'react-redux'
import { AllStudentGet } from '../../../../Redux/action/Admin';
import Loader from '../../../../Util/Loader';

const Students = () => {
    const dispatch = useDispatch();
    const column = ['Full Name', 'Email Address', 'Phone Number', 'Action']

    const { loading, allStudentGetData } = useSelector((state) => state.allStudent)

    useEffect(() => {
        dispatch(AllStudentGet())
    }, [])

    return (
        <>
            <div className='Divider'>
                <div className='TabName'>
                    All Students
                </div>
            </div>
            {
                loading ? <div style={{ margin: "70px 0" }}> <Loader /> </div> :
                    <div className='mt-5'>
                        <MuiTables columns={column} data={allStudentGetData?.data?.rows} />
                    </div>
            }
        </>
    )
}
export default Students