import React, { useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { errorNotify, successNotify } from '../../../../../Util/toast'
import { useDispatch, useSelector } from 'react-redux'
import { CourseEdit, CourseGet, ExpertGet } from '../../../../../Redux/action/Admin'
import { useEffect } from 'react'

const EditCourse = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [courseTitle, setCourseTitle] = useState('')
    const [courseDsc, setCourseDsc] = useState('')
    const [expertSelect, setExpertSelect] = useState({
        value: '',
        label: 'Select an Expert',
    })

    const { loading, courseEditData, error } = useSelector((state) => state.editCourse)
    const { expertGetData } = useSelector((state) => state.getExpert)
    const { courseGetData } = useSelector((state) => state.getCourse)

    useEffect(() => {
        dispatch(ExpertGet())
        dispatch(CourseGet())
    }, [])

    useEffect(() => {
        const filterData = courseGetData?.data?.rows?.filter((p_id) => parseInt(p_id.id) === parseInt(id))

        setCourseTitle(filterData ? filterData[0]?.title : '')
        setCourseDsc(filterData ? filterData[0]?.course_description : '')

        setExpertSelect({
            value: filterData ? filterData[0]?.Expert?.id : '',
            label: filterData ? `${filterData[0]?.Expert?.first_name} ${filterData[0]?.Expert?.last_name}` : 'Select an Expert'
        })
    }, [courseGetData])

    useEffect(() => {
        if (courseEditData?.status === 1) {
            successNotify("Course Edit Successfully!")
            dispatch({ type: "COURSE_EDIT_RESET" })
            navigate("/admin/courses")
        }
        else if (error) {
            errorNotify("Error in Creating!")
            dispatch({ type: "COURSE_EDIT_RESET" })
        }
    }, [courseEditData?.status, error])

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

        dispatch(CourseEdit(expertData, id))
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
                    Edit Courses
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
                                        <Select
                                            value={expertSelect}
                                            options={promiseOptions()}
                                            className='expert_select'
                                            placeholder="Select Expert"
                                            onChange={(selectedOption) => setExpertSelect(selectedOption)} />
                                    </div>
                                </Col>

                                <Col md={12} className="d-flex justify-content-end">
                                    <button className="save_btn" type="submit">
                                        {loading ? <Spinner animation='border' size='sm' /> : 'Save'}
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
export default EditCourse;