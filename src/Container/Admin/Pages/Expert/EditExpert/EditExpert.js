import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import { errorNotify, successNotify } from '../../../../../Util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { ExpertEdit, ExpertGet, ProfessionGet } from '../../../../../Redux/action/Admin';

const EditExpert = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [expertFirstName, setExpertFirstName] = useState('')
    const [expertLastName, setExpertLastName] = useState('')
    const [file, setFile] = useState(null)
    const [profession, setProfession] = useState({
        value: '',
        label: 'Select a profession',
    })

    const { loading, expertEditData, error } = useSelector((state) => state.editExpert)
    const { professionGetData } = useSelector((state) => state.getProfession)
    const { expertGetData } = useSelector((state) => state.getExpert)

    useEffect(() => {
        dispatch(ProfessionGet())
        dispatch(ExpertGet())
    }, [])

    useEffect(() => {
        const filterData = expertGetData?.data?.rows?.filter((p_id) => parseInt(p_id.id) === parseInt(id))

        setExpertFirstName(filterData ? filterData[0]?.first_name : '')
        setExpertLastName(filterData ? filterData[0]?.last_name : '')
        setProfession({
            value: filterData ? filterData[0]?.Profession?.id : '',
            label: filterData ? filterData[0]?.Profession?.title : 'Select a profession'
        })
        setFile(filterData ? filterData[0]?.user_avatar : null)
    }, [expertGetData])

    useEffect(() => {
        if (expertEditData?.status === 1) {
            successNotify("Expert Created Successfully!")
            dispatch({ type: "EXPERT_EDIT_RESET" })
            navigate("/admin/experts")
        }
        else if (error) {
            errorNotify("Error in Creating!")
            dispatch({ type: "EXPERT_EDIT_RESET" })
        }
    }, [expertEditData?.status, error])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (expertFirstName.length === 0 || !profession) {
            errorNotify("Please fill up all fields")
            return
        }

        const expertFrom = new FormData();
        expertFrom.append("first_name", expertFirstName)
        expertLastName.length === 0 ? expertFrom.append("last_name", ' ') : expertFrom.append("last_name", expertLastName)
        typeof file !== 'string' && expertFrom.append("user_avatar", file)
        expertFrom.append("profession_id", profession.value)

        dispatch(ExpertEdit(expertFrom, id))
    }

    const promiseOptions = () => {
        const d = professionGetData?.data?.rows.map((p) => ({
            value: p.id,
            label: p.title,
        }));
        return d;
    };

    return (
        <div>
            <div className='Divider'>
                <div className='TabName'>
                    Edit Experts
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
                                        value={expertFirstName}
                                        onChange={(e) => setExpertFirstName(e.target.value)}
                                    />
                                </Col>

                                <Col md={6}>
                                    <input
                                        type="text"
                                        placeholder="Enter Expert Last Name"
                                        value={expertLastName}
                                        onChange={(e) => setExpertLastName(e.target.value)}
                                    />
                                </Col>

                                <Col md={12}>
                                    <div className='mb-3'>
                                        <Select
                                            options={promiseOptions()}
                                            value={profession}
                                            className='expert_select'
                                            placeholder="Expert Profession"
                                            onChange={(selectedOption) => setProfession(selectedOption)}
                                        />
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
export default EditExpert