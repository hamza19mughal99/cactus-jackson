import React, { useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CourseDelete, CourseGet } from '../../../../Redux/action/Admin';
import Loader from '../../../../Util/Loader';
import { cloudURL } from '../../../../Util/helper';
import { useState } from 'react';
import { successNotify } from '../../../../Util/toast';
import DynamicModal from '../../../../Components/Modal/Modal';

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  const [deleteId, setDeleteId] = useState(false)

  const { loading, courseGetData } = useSelector((state) => state.getCourse)
  const { loading: deleteLoading, courseDeleteData } = useSelector((state) => state.deleteCourse)

  useEffect(() => {
    dispatch(CourseGet())

    if (courseDeleteData && courseDeleteData?.status === 1) {
      successNotify("Course Deleted Successfully!")
      setShow(false)
      dispatch({ type: "COURSE_DELETE_RESET" })
    }
  }, [courseDeleteData?.status === 1])

  const deleteHandler = (id) => {
    setShow(!show)
    setDeleteId(id)
  }

  const deleteApi = () => {
    dispatch(CourseDelete(deleteId))
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
    <div className='ExpertContent admin_courses'>
      {modal}
      <div className='Divider'>
        <div className='TabName'>
          All Courses
        </div>
      </div>

      <div className='create_course'>
        <button onClick={() => navigate("/admin/courses/create-course")}>Create Course</button>
      </div>

      {
        loading ? <Loader /> : <div className='ExpertCards'>
          <Row>
            {courseGetData?.data?.rows.length > 0 ? courseGetData?.data?.rows.map((expert, index) => (
              <Col md={4}>
                <div className='Card' key={expert.id} style={{ minHeight: "370px" }}>
                  <h1>{expert?.Expert?.first_name} {expert?.Expert?.last_name}</h1>
                  <h3>{expert?.Expert?.Profession?.title}</h3>
                  <img src={`${cloudURL}logo/${expert?.Expert?.user_avatar}`} alt='' style={{ width: "200px", height: "180px", objectFit: "cover" }} />
                  <h5>{expert?.title}</h5>
                  <div>
                    <button onClick={() => navigate(`/admin/courses/courses-detail/${expert.id}`)}>Add Detail</button>
                    <button style={{ right: "100px" }} onClick={() => navigate(`/admin/courses/edit-course/${expert.id}`)}>Edit</button>
                    <button style={{ backgroundColor: "rgb(253 31 40)" }} onClick={() => deleteHandler(expert.id)}>Delete</button>
                  </div>
                </div>
              </Col>
            )) : <h6 className='course_not_found'> No Course Found </h6>}
          </Row>
        </div>
      }
    </div>
  )
}
export default Courses