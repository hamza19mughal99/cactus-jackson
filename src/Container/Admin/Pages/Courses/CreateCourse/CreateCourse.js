import React, { useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { errorNotify, successNotify } from '../../../../../Util/toast'
import { useDispatch, useSelector } from 'react-redux'
import { CourseCreate, ExpertGet } from '../../../../../Redux/action/Admin'
import { useEffect } from 'react'

const CreateCourse = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [courseTitle, setCourseTitle] = useState('')
    const [courseDsc, setCourseDsc] = useState('')
    const [expertSelect, setExpertSelect] = useState()

    const { loading, courseCreateData, error } = useSelector((state) => state.createCourse)
    const { expertGetData } = useSelector((state) => state.getExpert)

    useEffect(() => {
        dispatch(ExpertGet())
    }, [])

    useEffect(() => {
        if (courseCreateData?.status === 1) {
            successNotify("Course Created Successfully!")
            dispatch({ type: "COURSE_CREATE_RESET" })
            navigate("/admin/courses")
        }
        else if (error) {
            errorNotify("Error in Creating!")
            dispatch({ type: "COURSE_CREATE_RESET" })
        }
    }, [courseCreateData?.status, error])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (courseTitle.length === 0 || courseDsc.length === 0 || !expertSelect) {
            errorNotify("Please fill up all fields")
            return
        }

        const expertData = {
            title: courseTitle,
            description: courseDsc,
            expert: expertSelect.value
        }

        dispatch(CourseCreate(expertData))
    }

    const promiseOptions = () => {
        const d = expertGetData?.data?.rows.map((p) => {
            return { value: p.id, label: `${p.first_name} ${p.last_name}` }
        })

        return d
    };

    return (
        <div>
            <div className='Divider'>
                <div className='TabName'>
                    Create Courses
                </div>
            </div>
            <div className='back_btn' style={{marginTop: "10px"}}>
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
                                        placeholder="Course Title"
                                        name="lesson_title"
                                        value={courseTitle}
                                        onChange={(e) => setCourseTitle(e.target.value)}
                                    />
                                </Col>

                                <Col md={12}>
                                    <textarea
                                        type="text"
                                        placeholder="Course Description"
                                        name="lesson_title"
                                        value={courseDsc}
                                        rows={4}
                                        onChange={(e) => setCourseDsc(e.target.value)}
                                    />
                                </Col>

                                <Col md={12}>
                                    <div className='mb-3'>
                                        <Select options={promiseOptions()} className='expert_select' placeholder="Select Expert" onChange={(selectedOption) => setExpertSelect(selectedOption)} />
                                    </div>
                                </Col>

                                <Col md={12} className="d-flex justify-content-end">
                                    <button className="save_btn" type="submit">
                                        {loading ? <Spinner animation='border' size='sm' /> : 'Create'}
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
export default CreateCourse;