import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { cloudURL } from '../../Util/helper';
import Loader from '../../Util/Loader';
import VideoProgress from '../VideoProgress/VideoProgress';

const AllCourses = ({ loading, coursesListData }) => {
    const navigate = useNavigate()

    return (
        <div className='ExpertContent'>
            <div className='Divider'>
                <div className='TabName'>
                    Course Overview
                </div>
            </div>
            <div className='ExpertCards'>
                {
                    loading ? <div style={{ margin: "70px 0" }}> <Loader /> </div> :
                        <Row>
                            {coursesListData?.data?.rows?.map((e) => {
                                return (
                                    <Col md={3} key={e.id}>
                                        <div className={e?.course_status === 100 && parseInt(e.CourseSubmittion[0]?.percentage) > 70 ? 'Card dark' : 'Card'} onClick={() => navigate(`/student/course-detail/${e.id}`)}>
                                            <h1>{e.Expert.first_name} {e.Expert.last_name}</h1>
                                            <h3>{e.Expert.Profession.title}</h3>
                                            <img src={`${cloudURL}logo/${e.Expert.user_avatar}`} alt='' />
                                            <h2>{e.title}</h2>

                                            <VideoProgress id={e.id} percentage={e?.CourseSubmittion[0]?.percentage >= 70 ? 1 : 0} />
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                }
            </div>
        </div>
    )
}
export default AllCourses