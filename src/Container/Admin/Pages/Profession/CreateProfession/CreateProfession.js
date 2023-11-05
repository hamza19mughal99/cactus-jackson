import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { errorNotify, successNotify } from '../../../../../Util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { ProfessionCreate } from '../../../../../Redux/action/Admin';

const CreateProfession = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [professionTitle, setProfessionTitle] = useState('')
    const { loading, professionCreateData, error } = useSelector((state) => state.createProfession)

    useEffect(() => {
        if (professionCreateData?.status === 1) {
            successNotify("Profession Created Successfully!")
            dispatch({ type: "PROFESSION_CREATE_RESET" })
            navigate("/admin/profession")
        }
        else if (error) {
            errorNotify("Error in Creating!")
            dispatch({ type: "PROFESSION_CREATE_RESET" })
        }
    }, [professionCreateData?.status, error])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (setProfessionTitle.length === 0) {
            errorNotify("Please fill up all fields")
            return
        }

        const professionData = {
            title: professionTitle
        }

        dispatch(ProfessionCreate(professionData))
    }

    return (
        <div>
            <div className='Divider'>
                <div className='TabName'>
                    Create Profession
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
                                        placeholder="Enter Profession Title"
                                        onChange={(e) => setProfessionTitle(e.target.value)}
                                    />
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
export default CreateProfession