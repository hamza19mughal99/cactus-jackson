import React, { useEffect, useRef, useState } from 'react';
import './Courses.css';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import AllCourses from '../../../../Components/AllCourses/AllCourses';
import { useDispatch, useSelector } from 'react-redux';
import { CoursesList, ProjectSubmit } from '../../../../Redux/action/Student';
import Loader from '../../../../Util/Loader';
import { errorNotify, successNotify } from '../../../../Util/toast';
import { CurrentUserInfo } from '../../../../Util/helper';

const Courses = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [courseMcqSubmitted, setCourseMcqSubmitted] = useState(false)
  const [watchedVideo, setWatchedVideo] = useState(false)
  const [description, setDescription] = useState('')
  const [fileSelect, setFileSelect] = useState(null);

  const { loading, coursesListData } = useSelector((state) => state.getCourseList)
  const { loading: postLoading, projectSubmitData } = useSelector(state => state.postProjectSubmit)

  let currentUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (projectSubmitData?.status === 1) {
      successNotify("Project Submit Successfully!!")
      dispatch({ type: "PROJECT_SUBMIT_RESET" })

      setFileSelect(null)
      setDescription('')

      currentUser.projectSubmit = 1;
      localStorage.setItem('user', JSON.stringify(currentUser));

    }
  }, [projectSubmitData])

  useEffect(() => {
    dispatch(CoursesList())
  }, [])

  useEffect(() => {
    if (coursesListData?.status === 1) {

      const watchedStatus = coursesListData?.data?.rows.every((c) => parseInt(c.course_status) === 100)
      setWatchedVideo(watchedStatus)

      const courseStatus = coursesListData?.data?.rows.every((c) => c?.CourseSubmittion?.length > 0 && parseInt(c?.CourseSubmittion[0]?.percentage) > 70)
      setCourseMcqSubmitted(courseStatus)

    }
  }, [coursesListData])

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const submitHandler = () => {
    if (description.length === 0 || !fileSelect) {
      errorNotify("Please filled up both fields")
      return
    }

    const formData = new FormData();
    formData.append("content", description)
    formData.append("documents", fileSelect)

    dispatch(ProjectSubmit(formData))
  }

  return (
    <div className='ExpertsPage'>
      <Container>

        <div className='TopBar'>
          <div>
            Courses
          </div>
          <strong>&gt;</strong>
        </div>

        <AllCourses loading={loading} coursesListData={coursesListData} />

        <div className='Divider'>
          <div className='TabName'>
            Final Project
          </div>
        </div>

        {
          loading ? <div style={{ margin: "70px 0" }}> <Loader /> </div> :
            <>
              {
                courseMcqSubmitted && !currentUser?.projectSubmit ?
                  <div className='Bottom'>
                    <div className='Project'>
                      <h1>Design Project/Challenge</h1>
                      <Row>
                        <Col md={12}>
                          <div className='TopText'>
                            <p>The final project design should reflect and express the student's authentic personal point of view using the ideas and designs they .
                              Students will need to think about the level of disruption their design would cause within the industry coupled with the idea
                              of how to merchandise and market the drop. In order for students to fully realize the scope of this project,
                              they have to approach this with a level of professionalism in their presentation strategy.</p>

                            <p>Students can choose one of three areas for their design project:</p>

                            <ul>
                              <li>T-shirt graphic design exploration
                                <ul>
                                  <li>Present a mood board with images or logos that inspire and complement your product idea.</li>
                                  <li>Show your graphics on a tee-shirt mock-up. Show 3 options/views.</li>
                                </ul>
                              </li>

                              <li>Experiential event design exploration
                                <ul>
                                  <li>Present a mood board that includes an event concept.  The sky's the limit.  Think stage, spaces, lights, themes - dream big!</li>
                                  <li>A strong written concept with sketches/photos</li>
                                </ul>
                              </li>

                              <li>New brand graphic identity/logo exploration
                                <ul>
                                  <li>Create a new fashion brand!</li>
                                  <li>Present a mood board of logos/brand identities that inspire you/your design</li>
                                  <li>Show your logo in black and white and also experiment adding color</li>
                                  <li>Show how your logo/brand might look in use</li>
                                </ul>
                              </li>
                            </ul>

                            <p>Each project will need to include a short reflective paragraph on the product/idea, a summary of key components of the
                              Marketing and Business plans, and a description of the launch/drop strategy.</p>

                            <p>Consideration will be made to the concept as well as the layout and communication style.
                              What you submit has to speak for itself, so making the presentation look good and have a clear
                              story is important. Be creative with the tools you have or can use for free.</p>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className='PitchHeading'>Short pitch on your disruptive plan.</div>
                    <textarea
                      className="custom-textarea"
                      rows={7}
                      placeholder="Type your answer here."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                    <div className='UnderTextArea'>
                      <div>Shift ⇧ + Enter ↵ to make a line break</div>
                      <div className='d-flex'>
                        <input
                          type='file'
                          style={{ display: 'none' }}
                          ref={fileInputRef}
                          onChange={(e) => setFileSelect(e.target.files[0])}
                        />

                        <div>
                          <button className='pinkButton' onClick={openFileInput}>
                            Attach Image or PDF
                          </button>

                          {fileSelect &&
                            <p style={{ color: "#000", textAlign: "center", fontSize: "17px", fontWeight: "500" }}> {fileSelect?.name} </p>}

                        </div>

                        <div>
                          <button className='pinkButton' onClick={submitHandler}>
                            {postLoading ? <Spinner animation='border' size='sm' /> : 'Submit'}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='Directions'>
                      You can attach a small image or presentation as a pdf *
                    </div>
                  </div> : parseInt(currentUser?.projectSubmit) === 1 ? <div className='submit_final_project'>
                    <h6>Your Project has been submitted</h6>
                  </div> :
                    <div className='submit_final_project'>
                      <h6>Please watch all Course Videos and submit their MCQS and passed them then you can submit your Final Project </h6>
                      <h6>The Criteria of passing the Course is minimum 70%</h6>
                    </div>
              }
            </>
        }
      </Container>
    </div>
  )
}

export default Courses




// < div className = 'Bottom' >
//                   <div className='Project'>
//                     <div className='Left'>
//                       <h1>Disruptive Project</h1>
//                       <div>
//                         <img src='/images/Group 763.png' alt='' />
//                         <div>
//                           <div>LESSON OR TOPIC NAME</div>
//                           <div className='Progress'>
//                             <div>
//                               <div className='Percentage'>50%</div>
//                               <div className='Status'>6/12 videos</div>
//                             </div>
//                             <div className='ProgressBar'>
//                               <div className='Status' style={{ width: `50%` }}></div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className='Right'>
//                       <div className='TopText'>
//                         Amet massa vitae tortor condimentum lacinia quis. Ultricies tristique nulla aliquet enim tortor. Libero enim sed faucibus turpis in eu mi. Euismod elementum nisi quis eleifend quam adipiscing vitae. Adipiscing elit ut aliquam purus sit amet luctus venenatis. Ut pharetra sit amet aliquam id. Auctor eu augue ut lectus arcu bibendum at varius vel. Amet massa vitae tortor condimentum lacinia quis vel. Nec tincidunt praesent semper feugiat. Amet nisl suscipit adipiscing bibendum. Id porta nibh venenatis cras sed felis eget. Pulvinar neque laoreet suspendisse interdum consectetur. Dignissim suspendisse in est ante in nibh mauris cursus mattis. Ac tincidunt vitae semper quis lectus nulla at. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a.
//                       </div>
//                     </div>
//                   </div>
//                   <div className='PitchHeading'>Short pitch on your disruptive plan.</div>
//                   <textarea
//                     className="custom-textarea"
//                     rows={7}
//                     placeholder="Type your answer here."
//                   ></textarea>
//                   <div className='UnderTextArea'>
//                     <div>Shift ⇧ + Enter ↵ to make a line break</div>
//                     <div>
//                       <button className='pinkButton'>
//                         Attach Image or PDF
//                       </button>
//                       <button className='pinkButton'>
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                   <div className='Directions'>
//                     You can attach a small image or presentation as a pdf *
//                   </div>
//                 </div >