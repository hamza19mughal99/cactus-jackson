import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { VideoDelete, VideoGet } from '../../../../../Redux/action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../Util/Loader';
import DynamicModal from '../../../../../Components/Modal/Modal';
import { successNotify } from '../../../../../Util/toast';
import { Spinner } from 'react-bootstrap';

const CourseDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [deleteId, setDeleteId] = useState(false)

    const { id } = useParams();
    const { loading, videoGetData } = useSelector((state) => state.getVideo)
    const { loading: deleteLoading, videoDeleteData } = useSelector((state) => state.deleteVideo)

    useEffect(() => {
        dispatch(VideoGet(id))

        if (videoDeleteData && videoDeleteData?.status === 1) {
            successNotify("Video Deleted Successfully!")
            setShow(false)
            dispatch({ type: "VIDEO_DELETE_RESET" })
        }
    }, [videoDeleteData?.status === 1])

    const deleteHandler = (id) => {
        setShow(!show)
        setDeleteId(id)
    }

    const deleteApi = () => {
        dispatch(VideoDelete(deleteId))
    }

    const modal = <DynamicModal show={show} setShow={() => setShow(!show)} heading="Delete Course" styleName='profession_delete'>
        <div>
            <p>Are you sure you want to delete?</p>

            <div className='text-end'>
                <button className='yes_btn' onClick={deleteApi}> {deleteLoading ? <Spinner animation='border' size='sm' /> : 'Yes'} </button>
                <button className='no_btn' onClick={() => setShow(!show)}>No</button>
            </div>
        </div>
    </DynamicModal>

    return (
        <div>
            {modal}
            <div className='Divider'>
                <div className='TabName'>
                    Course Videos
                </div>
            </div>

            <div className='back_btn' style={{ marginTop: "10px" }}>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>

            <div className='create_course'>
                <button onClick={() => navigate(`/admin/courses/add-video?course_id=${id}`)}>Add More Video</button>
            </div>

            {
                loading ? <Loader /> :
                    <div className='row mt-4' style={{ gap: "25px 0" }}>
                        {
                            videoGetData?.data?.rows.length > 0 ? videoGetData?.data?.rows?.map((exp) => {
                                return (
                                    <div className='col-md-4'>
                                        <div className='expert_Card lesson_card' key={exp.id}>
                                            <h3>Video Title: <br /> <span>{exp.title}</span></h3>

                                            <button style={{ right: "180px" }} onClick={() => navigate(`/admin/courses/add-mcqs/${exp.id}`)}>Add MCQS</button>
                                            <button style={{ right: "100px" }} onClick={() => navigate(`/admin/courses/edit-video/${exp.id}?course_id=${id}`)}>Edit</button>
                                            <button style={{ backgroundColor: "rgb(253 31 40)" }} onClick={() => deleteHandler(exp.id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            }) : <h6 className='course_not_found'> No Video Found </h6>
                        }
                    </div>
            }
        </div>
    )
}
export default CourseDetail