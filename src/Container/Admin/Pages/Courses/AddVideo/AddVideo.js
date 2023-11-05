import React, { useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { errorNotify, successNotify } from '../../../../../Util/toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VideoCreate } from '../../../../../Redux/action/Admin';
import { useEffect } from 'react';

const AddVideo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(window.location.search)
    const course_id = queryParams.get("course_id")

    const [videoTitle, setVideoTitle] = useState('')
    const [videoLink, setVideoLink] = useState()

    const { loading, videoCreateData, error } = useSelector((state) => state.createVideo)

    useEffect(() => {
        if (videoCreateData?.status === 1) {
            successNotify("Video Created Successfully!")
            dispatch({ type: "VIDEO_CREATE_RESET" })
            navigate(`/admin/courses/courses-detail/${course_id}`)
        }
        else if (error) {
            errorNotify("Error in Creating!")
            dispatch({ type: "Video_CREATE_RESET" })
        }
    }, [videoCreateData?.status, error])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (videoTitle.length === 0 || videoLink.length === 0) {
            errorNotify("Please fill up all fields")
            return
        }

        const videoData = {
            video_link: videoLink,
            title: videoTitle,
            course_id: course_id,
            description: "empty"
        }

        dispatch(VideoCreate(videoData))
    }

    return (
        <div>
            <div className='Divider'>
                <div className='TabName'>
                    Add Video
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-md-10'>
                    <div className='create_expert_form'>
                        <form onSubmit={formSubmitHandler}>
                            <Row>
                                <Col md={12}>
                                    <input
                                        type="text"
                                        placeholder="Video Title"
                                        name="lesson_title"
                                        value={videoTitle}
                                        onChange={(e) => setVideoTitle(e.target.value)}
                                    />
                                </Col>

                                <Col md={12}>
                                    <input
                                        type="text"
                                        placeholder="Video Vimeo Link"
                                        name="lesson_title"
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)}
                                    />
                                </Col>

                                <Col md={12} className="d-flex justify-content-end">
                                    <button className="save_btn" type="submit">
                                        {loading ? <Spinner animation='border' size="sm" /> : "Create"}
                                    </button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVideo
