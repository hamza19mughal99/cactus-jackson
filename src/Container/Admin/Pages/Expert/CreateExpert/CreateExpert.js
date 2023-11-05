import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import './CreateExpert.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { errorNotify, successNotify } from '../../../../../Util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { ExpertCreate, ProfessionGet } from '../../../../../Redux/action/Admin';

const CreateExpert = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [expertFirstName, setExpertFirstName] = useState('')
    const [expertLastName, setExpertLastName] = useState('')
    const [file, setFile] = useState(null)
    const [profession, setProfession] = useState()

    const { loading, expertCreate, error } = useSelector((state) => state.createExpert)
    const { professionGetData } = useSelector((state) => state.getProfession)

    useEffect(() => {
        dispatch(ProfessionGet())
    }, [])

    useEffect(() => {
        if (expertCreate?.status === 1) {
            successNotify("Expert Created Successfully!")
            dispatch({ type: "EXPERT_CREATE_RESET" })
            navigate("/admin/experts")
        }
        else if (error) {
            errorNotify("Error in Creating!")
            dispatch({ type: "EXPERT_CREATE_RESET" })
        }
    }, [expertCreate?.status, error])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (expertFirstName.length === 0 || !file || !profession) {
            errorNotify("Please fill up all fields")
            return
        }

        const expertFrom = new FormData();
        expertFrom.append("first_name", expertFirstName)
        expertLastName.length > 0 && expertFrom.append("last_name", expertLastName)
        expertFrom.append("user_avatar", file)
        expertFrom.append("profession", profession.value)

        dispatch(ExpertCreate(expertFrom))
    }

    const promiseOptions = () => {
        const d = professionGetData?.data?.rows.map((p) => {
            return { value: p.id, label: p.title }
        })

        return d
    };

    return (
        <div>
            <div className='Divider'>
                <div className='TabName'>
                    Create Experts
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
                                        type="file"
                                        id="file-input"
                                        placeholder='upload picture'
                                        style={{ border: "none", paddingLeft: "0", marginBottom: "10px" }}
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        placeholder="Enter Expert First Name"
                                        onChange={(e) => setExpertFirstName(e.target.value)}
                                    />
                                </Col>

                                <Col md={6}>
                                    <input
                                        type="text"
                                        placeholder="Enter Expert Last Name"
                                        onChange={(e) => setExpertLastName(e.target.value)}
                                    />
                                </Col>

                                <Col md={12}>
                                    <div className='mb-3'>
                                        <Select options={promiseOptions()} className='expert_select' placeholder="Expert Profession" onChange={(selectedOption) => setProfession(selectedOption)} />
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
export default CreateExpert