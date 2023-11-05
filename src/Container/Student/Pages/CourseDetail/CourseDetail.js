import React, { useEffect, useState } from 'react'
import { Accordion, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { FiChevronRight } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import './CourseDetail.css';
// import AllCourses from '../../../../Components/AllCourses/AllCourses';
import Vimeo from '@u-wave/react-vimeo';
import Loader from '../../../../Util/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CourseGetById, VideoPause, VideoWatchSec, SubmissionCreate, SubmissionGet, CourseMcqSubmit, CourseRetake } from '../../../../Redux/action/Student';
import { cloudURL } from '../../../../Util/helper';
import { errorNotify, successNotify } from '../../../../Util/toast';
import { MdDone } from "react-icons/md"
import { ImCross } from "react-icons/im"

const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [videoNum, setVideoNum] = useState(0)
  const [ansSubmit, setAnsSubmit] = useState({
    course_id: null,
    lesson_id: null,
    submittedData: [],
  });
  // const [allSubmit, setAllSubmit] = useState([])

  const [showResult, setShowResult] = useState(false)

  const { loading, courseIdData } = useSelector((state) => state.getCoursesById)

  const { loading: createSubLoading, subCreateData } = useSelector((state) => state.createSubmission)
  const { loading: getSubLoading, subGetData } = useSelector((state) => state.getSubmission)
  const { loading: videoPauseLoading, videoPauseData } = useSelector((state) => state.createVideoPause)
  const { loading: videoWatchLoading, videoWatchData } = useSelector((state) => state.createVideoWatch)
  const { loading: submitLoading, courseMcqData } = useSelector((state) => state.submitAllCoursesMcq)
  const { loading: retakeLoading, courseRetakeData } = useSelector((state) => state.courseRetake)

  useEffect(() => {
    if (courseRetakeData) {
      setShowResult(false)
    }
  }, [courseRetakeData])

  useEffect(() => {
    return () => {
      setShowResult(false)
      dispatch({ type: "COURSE_BY_ID_RESET" })
      dispatch({ type: "SUBMISSION_GET_RESET" })
    }
  }, [])

  useEffect(() => {
    dispatch(SubmissionGet(id))

  }, [subCreateData, courseRetakeData])

  useEffect(() => {
    dispatch(CourseGetById(id))
    dispatch({ type: "VIDEO_PAUSE_RESET" })
  }, [courseMcqData, videoPauseData?.action === 'Complete', courseRetakeData])

  useEffect(() => {
    if (subCreateData) {
      successNotify("Your answers saved successfully!")
      dispatch({ type: "SUBMISSION_CREATE_RESET" })
    }
  }, [subCreateData])

  useEffect(() => {
    if (courseIdData) {
      dispatch(VideoWatchSec(courseIdData?.data?.Lesson[videoNum]?.id))
    }
  }, [courseIdData, videoNum])

  useEffect(() => {
    if (courseIdData?.data?.CourseSubmittion?.length > 0) {
      setShowResult(true)
    }
  }, [courseIdData])

  const nextVideo = () => {
    let length = courseIdData?.data?.Lesson.length - 1
    if (videoNum < length) {
      setVideoNum(videoNum + 1)
    }
  }

  const previousVideo = () => {
    if (videoNum > 0) {
      setVideoNum(videoNum - 1)
    }
  }

  const accordionChange = (i) => {
    if (videoNum !== i) {
      setVideoNum(i)

      // window.location.hash = `#${i}`;


      // setAllSubmit((prev) => { return [...prev, ansSubmit] })

      // console.log(ansSubmit)

      // setAnsSubmit({
      //   course_id: null,
      //   lesson_id: null,
      //   submittedData: [],
      // })
    }
  }

  const choiceHandler = (t, c, e, lesson) => {

    const existingIndex = ansSubmit.submittedData.findIndex(item => item.question_id === t.id);

    const newData = {
      question_id: t.id,
      question_type: t.question_type,
    };

    if (t.question_type === "0") {
      newData.answer = c.id;
    } else if (t.question_type === "1") {
      newData.answer = e.target.value;
    }

    if (existingIndex !== -1) {
      setAnsSubmit((prev) => {
        const updatedData = [...prev.submittedData];
        updatedData[existingIndex] = newData;
        return {
          ...prev,
          submittedData: updatedData,
          course_id: courseIdData?.data?.id,
          lesson_id: lesson.id,
        };
      });
    }
    else {
      setAnsSubmit((prev) => ({
        ...prev,
        submittedData: [...prev.submittedData, newData],
        course_id: courseIdData?.data?.id,
        lesson_id: lesson.id,
      }));
    }
  };

  const lessonHandler = (d) => {

    // console.log(d, "Which lesson")

    if (ansSubmit?.submittedData?.length === 0) {
      errorNotify("Please select questions")
      return
    }

    // else if (d?.Question?.length !== ansSubmit?.submittedData?.length) {
    //   errorNotify("Please give all answers")
    //   return
    // }

    // console.log(allSubmit)

    let lessonData = [];
    d?.Question?.forEach((l) => {
      const matchingData = ansSubmit?.submittedData?.filter((v) => parseInt(v.question_id) === l.id);
      if (matchingData?.length > 0) {
        lessonData.push({
          question_id: matchingData[0]?.question_id,
          question_type: matchingData[0]?.question_type,
          answer: parseInt(matchingData[0]?.answer)
        });
      }
    });

    // console.log(lessonData)

    let data = {
      data: JSON.stringify(lessonData)
    }

    // console.log(data)

    dispatch(SubmissionCreate(ansSubmit?.course_id, ansSubmit?.lesson_id, data))
  }

  const submitAllHandler = (getCourseData) => {

    if (subGetData?.data?.length === 0) {
      errorNotify("Please solve all questions")
      return
    }

    else if (parseInt(courseIdData?.course_status) !== 100) {
      errorNotify("Please watch all videos completely!")
      return
    }

    let d = [];
    getCourseData?.Lesson?.forEach((l) => {
      l?.Question?.forEach((q) => {
        q?.Choices?.forEach((c) => {
          const matchingData = subGetData?.data?.filter((v) => parseInt(v.answer) === c.id);
          if (matchingData?.length > 0) {
            d.push({
              question_id: q?.id,
              question_type: q?.question_type,
              answer: parseInt(matchingData[0]?.answer)
            });
          }
        });
      });
    });

    let obj = [
      ...d,
      //   ...ansSubmit?.submittedData
    ]

    // console.log(obj)

    let getActualQuestionsLength = getCourseData?.Lesson.reduce((acc, currVal) => {
      return parseInt(acc) + parseInt(currVal?.Question?.length)
    }, 0)

    if (obj.length !== getActualQuestionsLength) {
      errorNotify("Please give all question answers")
      return
    }

    let data = {
      data: obj
    }

    dispatch(CourseMcqSubmit(id, data))
  }

  const videoPauseHandler = (e, lesson) => {
    // console.log(e)
    if (e.percent !== 1) {
      console.log("calling pause")
      let data = {
        time: e.seconds
      }
      dispatch(VideoPause(lesson.id, data))
    }
  };

  const endTriggerHandler = (e, lesson) => {
    if (e.seconds === e.duration) {
      console.log("calling end")
      let data = {
        time: e.seconds,
        isComplete: 1
      }
      if (courseIdData?.data?.CourseSubmittion?.length === 0) {
        dispatch(VideoPause(lesson.id, data))
      }

      let length = parseInt(courseIdData?.data?.Lesson.length) - 1
      if (videoNum < length) {
        setVideoNum(videoNum + 1)
      }
    }
  }

  const backHandler = () => {
    setShowResult(false)
    navigate('/student/courses')
  }

  const retakeHandler = () => {
    dispatch(CourseRetake(id))
  }

  const calculatePercentage = () => {
    let getActualQuestionsLength = courseIdData?.data?.Lesson.reduce((acc, currVal) => {
      return parseInt(acc) + parseInt(currVal?.Question?.length)
    }, 0)

    let calculatedPercentage = parseInt(courseIdData?.data?.CourseSubmittion[0]?.score) * 100
    let finalPercentage = calculatedPercentage / getActualQuestionsLength

    if (parseFloat(courseIdData?.data?.CourseSubmittion[0]?.percentage).toFixed(2) === parseFloat(finalPercentage).toFixed(2)) {
      return parseFloat(courseIdData?.data?.CourseSubmittion[0]?.percentage).toFixed(2)
    }
    else return parseFloat(finalPercentage).toFixed(2)
  }

  const modal = <Modal
    show={showResult}
    // backdrop="static"
    // keyboard={false}
    onHide={() => setShowResult(false)}
    size='md'
    className='modal_main'
  // centered
  >
    <Modal.Body>
      <div className='result_div'>
        {
          courseIdData?.data?.CourseSubmittion[0]?.isPass == '1' ?
            <div>
              <MdDone /> <br />
              <p>Congratulation you Passed</p>
            </div> :
            <div>
              <ImCross style={{ fontSize: "30px", color: "red" }} />
              <p style={{ color: "red" }}>TRY AGAIN</p>
            </div>
        }
        {/* <h3>Your Score is <span>{courseIdData?.data?.CourseSubmittion[0]?.score}</span></h3> */}
        <h3>Your Percentage is <span>{courseIdData?.data?.CourseSubmittion[0]?.percentage > 100 ? '100.00' : `${calculatePercentage()} %`} </span></h3>

        {
          courseIdData?.data?.CourseSubmittion[0]?.isPass == '1' ?
            <h6 style={{ fontSize: "22px", margin: "30px 0", fontWeight: "600", color: "green" }}>NICE JOB KEEP GOING</h6> :
            <h6 style={{ fontSize: "22px", margin: "30px 0", fontWeight: "600", color: "green" }}>KEEP GOING YOU CAN DO IT</h6>
        }

        <div className='modal_btn'>
          <button className='modal_back_btn' onClick={backHandler}>Back</button>
          {courseIdData?.data?.CourseSubmittion[0]?.isPass == '0' &&
            <button className='retake_back_btn' onClick={retakeHandler}> {retakeLoading ? <Spinner animation='border' size='sm' /> : 'Retake Test?'} </button>
          }
        </div>
      </div>
    </Modal.Body>
  </Modal>

  function calculateVideos(percentageWatched, totalVideos) {
    if (percentageWatched >= 0 && percentageWatched <= 1) {
      const watchedVideos = totalVideos * percentageWatched;
      return Math.round(watchedVideos)
    }
    else return 0
  }

  return (
    <div>
      {modal}
      {
        loading && getSubLoading ?
          <div className='loader_main_div'> <Loader /> </div> :
          <div className='course_detail'>
            <Container>
              <Row>
                <Col md={12}>
                  <div className='main_breadcrumb'>
                    <p>Course</p>
                    <FiChevronRight />
                    <p>{courseIdData?.data?.Expert?.first_name} {courseIdData?.data?.Expert?.last_name}</p>
                    <FiChevronRight />
                    <p>{courseIdData?.data?.course_name}</p>
                  </div>
                </Col>
                <Col md={5} className='mt-3'>
                  <div className='detail_main'>
                    <h1>{courseIdData?.data?.Expert?.first_name} {courseIdData?.data?.Expert?.last_name}</h1>

                    <Row>
                      <Col md={6} xs={6}>
                        <img src={`${cloudURL}/logo/${courseIdData?.data?.Expert?.user_avatar}`} alt='' style={{ width: "100%" }} />
                      </Col>
                      <Col md={6} xs={6}>
                        <div style={{ position: 'relative', height: "100%" }}>
                          <div className='video_topic'>
                            <h5>{courseIdData?.data?.course_name}</h5>
                          </div>

                          {
                            loading ? <div style={{ width: "100%", position: "absolute", bottom: "15px" }}> <Loader /> </div> :
                              <div className='Progress' style={{ width: "100%", position: "absolute", bottom: "0" }}>
                                <div>
                                  <div className='Percentage'>{parseFloat(courseIdData?.course_status).toFixed(2)}%</div>
                                  <div className='Status'>{calculateVideos(courseIdData?.course_status / 100, courseIdData?.data?.Lesson.length)}/{courseIdData?.data?.Lesson.length} videos</div>
                                </div>
                                <div className='ProgressBar'>
                                  <div className='Status' style={{ width: `${parseFloat(courseIdData?.course_status).toFixed(2)}%` }}></div>
                                </div>
                              </div>
                          }
                        </div>
                      </Col>
                    </Row>

                    <p>{courseIdData?.data?.course_description}</p>

                    <p>AFTER WATCHING THE VIDEOS ANSWER THE QUESTIONS BELOW.</p>
                  </div>
                </Col>
                <Col md={7} className='mt-3'>
                  <div className='course_detail_right'>
                    <div className='vimeo_videos'>
                      {
                        courseIdData && !videoWatchLoading ?
                          <Vimeo
                            video={`${courseIdData?.data?.Lesson[videoNum].video_link}`}
                            start={videoWatchData ? parseInt(videoWatchData?.data?.watch_time) : 0}
                            onPause={(e) => {
                              videoPauseHandler(e, courseIdData?.data?.Lesson[videoNum]);
                            }}
                            onEnd={(e) => endTriggerHandler(e, courseIdData?.data?.Lesson[videoNum])}
                          /> :
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
                            <Loader />
                          </div>
                      }
                    </div>

                    <div className='video_swap'>
                      <Row className='align-items-center'>
                        <Col md={3} xs={4}>
                          <h5 onClick={previousVideo}><FaChevronLeft /> Past Video</h5>
                        </Col>
                        <Col md={6} xs={4}>
                          <h6 className='text-center'>{videoNum + 1}/{courseIdData?.data?.Lesson.length} Videos</h6>
                        </Col>
                        <Col md={3} xs={4}>
                          <h5 onClick={nextVideo} className='justify-content-end'> Next Video <FaChevronRight /> </h5>
                        </Col>
                      </Row>
                    </div>
                    <h4>{courseIdData?.data?.Lesson[videoNum].lesson_title}</h4>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
      }
      {
        getSubLoading ? <div style={{ margin: "100px 0" }}> <Loader />  </div> :
          <Container className='my-3'>
            <Accordion activeKey={videoNum.toString()}>
              {
                courseIdData?.data?.Lesson?.map((lesson, index) => {
                  return (
                    <Accordion.Item eventKey={index.toString()} id={index} onClick={() => accordionChange(index)} aria-controls="example-collapse-text">
                      <Accordion.Header id={index}>
                        <div className='head_question'>
                          <img src='/images/plus.png' alt='' className='plus' />
                          <img src='/images/minus.png' alt='' className='minus' />
                          <div>
                            <span>{index + 1}</span>
                            <h6>{lesson.lesson_title}</h6>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body id="example-collapse-text">
                        <div className='accordion_form'>
                          {
                            lesson?.Question.map((t, i) => {
                              if (t.question_type === "0") {
                                return (
                                  <div className='question'>
                                    <div className='d-flex justify-content-between'>
                                      <h6> {i + 1}-  {t.question_text}</h6>
                                    </div>

                                    <div key={`inline-radio`} className="mb-3 form_radio">
                                      {
                                        t?.Choices?.map((c) => {
                                          return (
                                            <label style={{ display: "block", cursor: "pointer" }}>
                                              <Form.Check
                                                inline
                                                label={c.choice_text}
                                                name={t.id}
                                                disabled={courseIdData?.data?.CourseSubmittion?.length > 0 ? true : false}
                                                defaultChecked={subGetData?.data?.some((v) => parseInt(v.answer) === c.id)}
                                                type="radio"
                                                id={c.choice_text}
                                                onChange={(e) => choiceHandler(t, c, e, lesson, index)}
                                              />
                                            </label>
                                          )
                                        })
                                      }
                                    </div>
                                  </div>
                                )
                              }
                              else if (t.question_type === "1") {
                                return (
                                  <>
                                    <hr />
                                    <div className='question'>
                                      <div className='d-flex justify-content-between'>
                                        <h6> {i + 1}-  {t.question_text}</h6>
                                      </div>

                                      <Form.Group>
                                        <Form.Control as="textarea" rows={6} className='question_input' />
                                      </Form.Group>
                                    </div>
                                  </>
                                )
                              }
                            })
                          }
                          <div className='text-end'>
                            <button
                              style={{ cursor: "pointer" }}
                              disabled={courseIdData?.data?.CourseSubmittion?.length > 0 ? true : false}
                              onClick={() => lessonHandler(lesson)}> {createSubLoading ? <Spinner animation='border' size='sm' /> : 'Save'} </button>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })
              }
            </Accordion>
            <hr />

            <h6 style={{ textAlign: "center", fontSize: "20px", marginTop: "30px", fontWeight: "700" }}>
              Please review your saved answers before submitting</h6>
            <p style={{ fontSize: "22px", textAlign: "center" }}>You will need to get above 70% to pass this course or you will need to try again.</p>

            <div className='text-end submit_all_btn'>
              <button style={{ cursor: "pointer" }} type='button' disabled={courseIdData?.data?.CourseSubmittion?.length > 0 ? true : false} onClick={() => submitAllHandler(courseIdData?.data)}>
                {submitLoading ? <Spinner animation='border' size='sm' /> : 'Submit All'} </button>
            </div>
          </Container>
      }
    </div >
  )
}
export default CourseDetail