import React, { useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { errorNotify, successNotify } from '../../../../../Util/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VideoEdit, VideoGet } from '../../../../../Redux/action/Admin';
import { useEffect } from 'react';

const EditVideo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const queryParams = new URLSearchParams(window.location.search)
    const course_id = queryParams.get("course_id")

    const [videoTitle, setVideoTitle] = useState('')
    const [videoLink, setVideoLink] = useState()

    const { loading, videoEditData, error } = useSelector((state) => state.editVideo)
    const { videoGetData } = useSelector((state) => state.getVideo)

    useEffect(() => {
        dispatch(VideoGet(course_id))
    }, [])

    useEffect(() => {
        const filterData = videoGetData?.data?.rows?.filter((p_id) => parseInt(p_id.id) === parseInt(id))

        setVideoTitle(filterData ? filterData[0]?.title : '')
        setVideoLink(filterData ? filterData[0]?.video_link : '')

    }, [videoGetData])

    useEffect(() => {
        if (videoEditData?.status === 1) {
            successNotify("Video Edit Successfully!")
            dispatch({ type: "VIDEO_EDIT_RESET" })
            navigate(`/admin/courses/courses-detail/${course_id}`)
        }
        else if (error) {
            errorNotify("Error in Editing!")
            dispatch({ type: "VIDEO_EDIT_RESET" })
        }
    }, [videoEditData?.status, error])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (videoTitle.length === 0 || videoLink.length === 0) {
            errorNotify("Please fill up all fields")
            return
        }

        const videoData = {
            video_link: videoLink,
            title: videoTitle,
            description: "empty"
        }

        dispatch(VideoEdit(videoData, id))
    }

    return (
        <div>
            <div className='Divider'>
                <div className='TabName'>
                    Edit Video
                </div>
            </div>

            <div className='back_btn' style={{ marginTop: "10px" }}>
                <button onClick={() => navigate(-1)}>Back</button>
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
                                        {loading ? <Spinner animation='border' size="sm" /> : "Save"}
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

export default EditVideo
