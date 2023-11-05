import React, { useEffect, useState } from 'react'
import { Col, Row, Accordion, Form, Spinner } from 'react-bootstrap';
import Select from 'react-select'
import { McqCreate, McqGet, QuestionDelete, QuestionEdit } from '../../../../../Redux/action/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { errorNotify, successNotify } from '../../../../../Util/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from '../../../../../Util/Loader';
import DynamicModal from '../../../../../Components/Modal/Modal';

const AddMcqs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [questions, setQuestions] = useState([
        {
            questionType: {
                value: '',
                label: "Select Question Type"
            }, question: '', answers: ['', '', ''], correctAnswerIndex: 0
        },
    ]);

    const [sQuestion, setSQuestion] = useState({
        Choices: [],
        active: '0',
        id: 0,
        question_text: 'q1',
        question_type: '0',
    });

    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [deleteQues, setDeleteQues] = useState(false)

    const { loading, mcqCreateData, error } = useSelector((state) => state.createMcq)
    const { loading: getLoading, mcqGetData } = useSelector((state) => state.getMcq)
    const { loading: editLoading, quesEditData, error: editError } = useSelector((state) => state.editQues)
    const { loading: deleteLoading, quesDeleteData } = useSelector((state) => state.deleteQues)

    useEffect(() => {
        if (quesDeleteData?.status === 1) {
            successNotify("Question Deleted Successfully!")
            setShow2(false)
            dispatch({ type: "QUESTION_DELETE_RESET" })
        }
    }, [quesDeleteData?.status])

    useEffect(() => {
        dispatch(McqGet(id))
    }, [mcqCreateData, quesEditData, quesDeleteData])

    useEffect(() => {
        if (quesEditData?.status === 1) {
            successNotify("Question Updated Successfully!")
            dispatch({ type: "QUESTION_EDIT_RESET" })

            setSQuestion({
                Choices: [],
                active: '0',
                id: 0,
                question_text: 'q1',
                question_type: '0',
            })

            setShow(!show)
        }
        else if (editError) {
            errorNotify("Error in Creating!")
            dispatch({ type: "QUESTION_EDIT_RESET" })
        }
    }, [quesEditData?.status, editError])

    useEffect(() => {
        if (mcqCreateData?.status === 1) {
            successNotify("Question Created Successfully!")
            dispatch({ type: "MCQ_CREATE_RESET" })

            setQuestions([
                {
                    questionType: {
                        value: '',
                        label: "Select Question Type"
                    }, question: '', answers: ['', '', ''], correctAnswerIndex: 0
                },
            ])
        }
        else if (error) {
            errorNotify("Error in Creating!")
            dispatch({ type: "MCQ_CREATE_RESET" })
        }
    }, [mcqCreateData?.status, error])


    const options = [
        { value: 'mcq', label: 'MCQ' },
        { value: 'input', label: 'input' },
    ]

    const addQuestion = () => {

        let filledQuestion = questions.map((q) => {
            if (q.questionType.value.length === 0) {
                return true
            }
            else if (q.questionType.value === "input") {
                if (q.question.length === 0) {
                    return true
                }
            }
            else if (q.questionType.value === "mcq") {
                if (q.answers[0].length === 0 || q.answers[1].length === 0 || q.answers[2].length === 0 || q.question.length === 0) {
                    return true
                }
            }
            else return false
        })

        let errorFound = false;

        for (let i = 0; i < filledQuestion.length; i++) {
            if (filledQuestion[i] === true) {
                errorFound = true;
                break;
            }
        }

        if (errorFound) {
            errorNotify("Please filled up all fields")
            return
        }

        setQuestions([
            ...questions,
            {
                questionType: {
                    value: '',
                    label: "Select Question Type"
                }, question: '', answers: ['', '', ''], correctAnswerIndex: 0
            }
        ]);
    };

    const handleQuestionChange = (index, event) => {
        const { name, value } = event.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index][name] = value;
        setQuestions(updatedQuestions);
    };

    const handleQuestionTypeChange = (index, v, name) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][name] = {
            value: v.value,
            label: v.label
        };
        setQuestions(updatedQuestions);
    }

    const handleAnswerChange = (questionIndex, answerIndex, event) => {
        const { value } = event.target;
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers[answerIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswerChange = (questionIndex, event) => {
        const { value } = event.target;
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctAnswerIndex = parseInt(value);
        setQuestions(updatedQuestions);
    };

    const addTopic = () => {

        let filledQuestion = questions.map((q) => {
            if (q.questionType.value.length === 0) {
                return true
            }
            else if (q.questionType.value === "input") {
                if (q.question.length === 0) {
                    return true
                }
            }
            else if (q.questionType.value === "mcq") {
                if (q.answers[0].length === 0 || q.answers[1].length === 0 || q.answers[2].length === 0 || q.question.length === 0) {
                    return true
                }
            }
            else return false
        })

        let errorFound = false;

        for (let i = 0; i < filledQuestion.length; i++) {
            if (filledQuestion[i] === true) {
                errorFound = true;
                break;
            }
        }

        if (errorFound) {
            errorNotify("Please filled up all fields")
            return
        }

        let data = {
            lesson_id: id,
            question_data: JSON.stringify(questions)
        }

        dispatch(McqCreate(data))
    }

    const saveQuestionData = (t, i) => {
        setShow(!show)
        setSQuestion(t)
    }

    const handleQuestionTextChange = (e) => {
        const updatedQuestion = { ...sQuestion, question_text: e.target.value };
        setSQuestion(updatedQuestion);
    };

    const handleChoiceChange = (e, index) => {
        const updatedChoices = [...sQuestion.Choices];
        updatedChoices[index].choice_text = e.target.value;
        setSQuestion({ ...sQuestion, Choices: updatedChoices });
    };

    const EditCorrectAnswerChange = (e, index) => {
        const updatedChoices = [...sQuestion.Choices];

        updatedChoices.map((u, i) => {
            if (i === index) {
                return u.is_correct = '1';
            }
            else {
                return u.is_correct = '0';
            }
        })

        setSQuestion({ ...sQuestion, Choices: updatedChoices });
    };

    const saveUpdatedData = () => {

        // let formattedData = {}

        const choices = sQuestion.Choices;

        // console.log(choices)

        // const answerTexts = choices.filter((choice) => choice.is_correct === '1')
        // console.log(answerTexts)

        // if (choice.is_correct === '1') {
        // formattedData.correctAnswerIndex = index;
        // return choice;
        // }
        // });

        // console.log(answerTexts)

        // formattedData.answers = answerTexts
        // formattedData.question = sQuestion.question_text
        // formattedData.questionType = sQuestion.question_type === '0' ? { value: 'mcq', label: 'MCQ' } : { value: 'input', label: 'input' }

        // console.log(formattedData)

        let updateData = {
            answers: choices,
            question: sQuestion.question_text,
            questionType: sQuestion.question_type === '0' ? { value: 'mcq', label: 'MCQ' } : { value: 'input', label: 'input' }
        }

        // console.log(JSON.stringify(updateData))
        // let finalData = JSON.stringify(updateData)

        let d = {
            question_data: JSON.stringify(updateData)
        }

        // console.log(d)

        dispatch(QuestionEdit(d, sQuestion.id))

    };

    const questionDelete = (id) => {
        setDeleteQues(id)
        setShow2(!show2)
    }

    const modal = <DynamicModal show={show} setShow={() => setShow(!show)} heading="Edit Question" styleName='profession_delete' size={'lg'}>
        <div className='create_expert_form'>
            {
                sQuestion.question_type === '0' && <div className='question_answer mt-4'>
                    <Row>
                        <Col md={1}> <h5>Q.</h5> </Col>
                        <Col md={11}>
                            <input
                                type="text"
                                placeholder="Write Mcq Question"
                                name="question"
                                value={sQuestion.question_text}
                                onChange={handleQuestionTextChange}
                            />
                        </Col>
                    </Row>

                    {
                        sQuestion.Choices.map((ans, ansIndex) => {
                            return (
                                <Row>
                                    <Col md={11}>
                                        <input
                                            type="text"
                                            placeholder={`Answer ${ansIndex + 1}`}
                                            value={ans.choice_text}
                                            onChange={(e) => handleChoiceChange(e, ansIndex)}
                                        />
                                    </Col>
                                    <Col md={1}>
                                        <div className='d-flex align-items-center' style={{ marginTop: "10px" }}>
                                            <input
                                                type="radio"
                                                name={`correctAnswer${sQuestion.id}`}
                                                value={ans.is_correct}
                                                checked={ans.is_correct === '1'}
                                                onChange={(e) => EditCorrectAnswerChange(e, ansIndex)}
                                                style={{ marginBottom: '0' }}
                                            />
                                            <label htmlFor={`correctAnswer${sQuestion.id}`}>Correct</label>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        })
                    }

                    <Row>
                        <Col md={12}>
                            <button type='button' className='mt-4' onClick={saveUpdatedData}>
                                {editLoading ? <Spinner animation='border' size='sm' /> : 'Save'}  </button>
                        </Col>
                    </Row>
                </div>
            }

            {
                sQuestion.question_type === '1' && <div className='question_answer mt-4'>
                    <Row>
                        <Col md={1}> <h5>Q.</h5> </Col>
                        <Col md={11}>
                            <input
                                type="text"
                                placeholder="Write Mcq Question"
                                name="question"
                                value={sQuestion.question_text}
                                onChange={handleQuestionTextChange}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <button type='button' className='mt-4' onClick={saveUpdatedData}>
                                {editLoading ? <Spinner animation='border' size='sm' /> : 'Save'}
                            </button>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    </DynamicModal>

    const modal2 = <DynamicModal show={show2} setShow={() => setShow2(!show2)} heading="Delete Question" styleName='profession_delete'>
        <div>
            <p>Are you sure you want to delete?</p>

            <div className='text-end'>
                <button className='yes_btn' onClick={() => dispatch(QuestionDelete(deleteQues))}> {deleteLoading ? <Spinner animation='border' size='sm' /> : 'Yes'} </button>
                <button className='no_btn' onClick={() => setShow2(!show2)}>No</button>
            </div>
        </div>
    </DynamicModal>

    return (
        <div>
            {modal}
            {modal2}
            <div className='Divider'>
                <div className='TabName'>
                    Add Mcqs
                </div>
            </div>

            <div className='back_btn' style={{ marginTop: "10px" }}>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>

            <div className='row justify-content-center'>
                <div className='col-md-12'>
                    <div className='create_expert_form'>
                        <form>
                            <Row>
                                {
                                    questions.map((question, quesIndex) => {
                                        return (
                                            <Col md={12} key={quesIndex}>
                                                <hr style={{ color: "#C45856", opacity: "1" }} />
                                                <Col md={12}>
                                                    <Select options={options} placeholder="Select Type of Question"
                                                        value={question.questionType}
                                                        onChange={(selectedOption) => handleQuestionTypeChange(quesIndex, selectedOption, 'questionType')}
                                                    />
                                                </Col>
                                                {
                                                    question.questionType.value === 'mcq' ?
                                                        <div className='question_answer mt-4'>
                                                            <Row>
                                                                <Col md={1}> <h5>Q{quesIndex + 1}.</h5> </Col>
                                                                <Col md={11}>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Write Mcq Question"
                                                                        name="question"
                                                                        value={question.question}
                                                                        onChange={(e) => handleQuestionChange(quesIndex, e)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            {
                                                                question.answers.map((ans, ansIndex) => {
                                                                    return (
                                                                        <Row>
                                                                            <Col md={11}>
                                                                                <input
                                                                                    type="text"
                                                                                    placeholder={`Answer${ansIndex + 1}`}
                                                                                    value={ans}
                                                                                    onChange={(e) => handleAnswerChange(quesIndex, ansIndex, e)}
                                                                                />
                                                                            </Col>
                                                                            <Col md={1}>
                                                                                <div className='d-flex align-items-center' style={{ marginTop: "10px" }}>
                                                                                    <input type="radio"
                                                                                        name={`correctAnswer${quesIndex}`}
                                                                                        value={ansIndex}
                                                                                        checked={question.correctAnswerIndex === ansIndex}
                                                                                        onChange={(e) => handleCorrectAnswerChange(quesIndex, e)}
                                                                                        style={{ marginBottom: "0" }}
                                                                                    />
                                                                                    <label for="html">Correct</label>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    )
                                                                })
                                                            }
                                                        </div> : null
                                                }
                                                {
                                                    question.questionType.value === 'input' ?
                                                        <div className='question_answer mt-4'>
                                                            <Row>
                                                                <Col md={1}> <h5>Q{quesIndex + 1}.</h5> </Col>
                                                                <Col md={11}>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Write Input Question"
                                                                        name="question"
                                                                        value={question.question}
                                                                        onChange={(e) => handleQuestionChange(quesIndex, e)}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </div> : null
                                                }
                                            </Col>
                                        )
                                    })
                                }
                                <Col md={12} className="d-flex justify-content-end mt-4">
                                    <button className="save_btn" type="button" onClick={addQuestion}>
                                        Add More Questions
                                    </button>
                                </Col>
                            </Row>
                            <button type='button' onClick={addTopic} className='mt-4'> {loading ? <Spinner animation="border" size="sm" /> : 'Save'} </button>
                        </form>
                    </div>
                </div>
                {
                    getLoading ? <Loader /> :
                        <>
                            {
                                mcqGetData && mcqGetData?.data?.rows.length > 0 ?
                                    <div className='col-md-12 mt-5'>
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey={"0"}>
                                                <Accordion.Header>
                                                    <div className='head_question'>
                                                        <img src='/images/plus.png' alt='' className='plus' />
                                                        <img src='/images/minus.png' alt='' className='minus' />
                                                        <div>
                                                            <span>1</span>
                                                        </div>
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        mcqGetData?.data?.rows.map((t, i) => {
                                                            // console.log(t)
                                                            if (t.question_type === "0") {
                                                                return (
                                                                    <>
                                                                        <div className='question'>
                                                                            <div className='d-flex justify-content-between'>
                                                                                <h6> {i + 1}-  {t.question_text}</h6>

                                                                                <div className='edit_question'>
                                                                                    <FiEdit onClick={() => saveQuestionData(t, i)} />
                                                                                    <AiOutlineDelete onClick={() => questionDelete(t.id)} />
                                                                                </div>
                                                                            </div>

                                                                            <div key={`inline-radio`} className="mb-3 form_radio">
                                                                                {
                                                                                    t?.Choices?.map((c) => {
                                                                                        return (
                                                                                            <Form.Check
                                                                                                inline
                                                                                                label={c.choice_text}
                                                                                                // name="q1"
                                                                                                type="radio"
                                                                                                id={c.id}
                                                                                                disabled
                                                                                                checked={c.is_correct === "1" ? true : false}
                                                                                            />
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                            else if (t.question_type === "1") {
                                                                return (
                                                                    <>
                                                                        <hr />
                                                                        <div className='question'>
                                                                            <div className='d-flex justify-content-between'>
                                                                                <h6> {i + 1}-  {t.question_text}</h6>

                                                                                <div className='edit_question'>
                                                                                    <FiEdit onClick={() => saveQuestionData(t, i)} />
                                                                                    <AiOutlineDelete onClick={() => questionDelete(t.id)} />
                                                                                </div>
                                                                            </div>

                                                                            <Form.Group>
                                                                                <Form.Control as="textarea" rows={6} className='question_input' disabled />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div> : <h6 className='course_not_found mt-5'> No Mcq Found </h6>
                            }
                        </>
                }
            </div>
        </div>
    )
}
export default AddMcqs