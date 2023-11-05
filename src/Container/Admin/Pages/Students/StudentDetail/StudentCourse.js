import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { cloudURL } from '../../../../../Util/helper';

const StudentCourse = ({ coursesListData }) => {

    function calculateVideos(percentageWatched, totalVideos) {
        if (percentageWatched >= 0 && percentageWatched <= 1) {
            const watchedVideos = totalVideos * percentageWatched;
            return Math.round(watchedVideos)
        }
        else return 0
    }

    return (
        <div className='ExpertContent'>
            <div className='ExpertCards'>
                <Row>
                    {coursesListData?.map((e) => {
                        return (
                            <Col md={3} key={e.id}>
                                <div className='Card'>
                                    <h1>{e.Expert.first_name} {e.Expert.last_name}</h1>
                                    <h3>{e.Expert.Profession.title}</h3>
                                    <img src={`${cloudURL}logo/${e.Expert.user_avatar}`} alt='' />
                                    <h2>{e.course_name}</h2>

                                    <div className='Progress'>
                                        <div>
                                            <div className='Percentage'>{parseFloat(e.course_status).toFixed(2)}%</div>
                                            <div className='Status'>{calculateVideos(e.course_status / 100, e.Lesson.length)}/{e.Lesson.length} videos</div>
                                        </div>
                                        <div className='ProgressBar'>
                                            <div className='Status' style={{ width: `${parseFloat(e.course_status).toFixed(2)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </div >
    )
}
export default StudentCourse