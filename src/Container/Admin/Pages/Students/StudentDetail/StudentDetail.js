import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StudentCourse from './StudentCourse';
import { useDispatch, useSelector } from 'react-redux';
import { StudentGetById } from '../../../../../Redux/action/Admin';
import Loader from '../../../../../Util/Loader';
import { cloudURL } from '../../../../../Util/helper';

const StudentDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams()

    const { loading, studentGetIdData } = useSelector((state) => state.studentGetId)

    useEffect(() => {
        dispatch(StudentGetById(id))
    }, [])

    return (
        <div>
            <div className='Divider'>
                <div className='TabName'>
                    Student Detail
                </div>
            </div>
            <div class="back_btn" style={{ marginTop: "10px" }} onClick={() => navigate(-1)}><button>Back</button></div>

            {
                loading ? <Loader /> :
                    <div>
                        <h2 className='watched_courses'>Watched Courses</h2>
                        <StudentCourse loading={false} coursesListData={studentGetIdData?.data?.course} />

                        {
                            studentGetIdData?.data?.Project.length === 0 ?
                                <h6 style={{ textAlign: "center", fontSize: "22px", color: "#000", fontWeight: "600", margin: "30px 0" }}>
                                    Student hasn't submitted their final Project Yet
                                </h6> :

                                <div>
                                    <h2 className='watched_courses'>Submitted Project</h2>

                                    <div className='mt-4'>
                                        <h5 style={{ fontWeight: "600" }}>Description</h5>
                                        <p> {studentGetIdData?.data?.Project[0]?.content} </p>
                                    </div>

                                    <div className='mt-4'>
                                        <h5 style={{ fontWeight: "600", marginBottom: "20px" }}>PDF</h5>

                                        <a
                                            href={`${cloudURL}documents/${studentGetIdData?.data?.Project[0]?.media_file}`}
                                            download={studentGetIdData?.data?.Project[0]?.media_file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='download_btn'
                                        >
                                            {studentGetIdData?.data?.Project[0]?.media_file}
                                        </a>
                                    </div>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}
export default StudentDetail