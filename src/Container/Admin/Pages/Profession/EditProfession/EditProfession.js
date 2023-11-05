import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { errorNotify, successNotify } from '../../../../../Util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { ProfessionEdit, ProfessionGet } from '../../../../../Redux/action/Admin';

const EditProfession = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [professionTitle, setProfessionTitle] = useState('')
    const { loading, professionEditData, error } = useSelector((state) => state.editProfession)
    const { professionGetData } = useSelector((state) => state.getProfession)

    useEffect(() => {
        dispatch(ProfessionGet())
    }, [])

    useEffect(() => {

        const filterData = professionGetData?.data?.rows?.filter((p_id) => parseInt(p_id.id) === parseInt(id))
        setProfessionTitle(filterData ? filterData[0]?.title : '')

    }, [professionGetData])

    useEffect(() => {
        if (professionEditData?.status === 1) {
            successNotify("Profession Edit Successfully!")
            dispatch({ type: "PROFESSION_EDIT_RESET" })
            navigate("/admin/profession")
        }
        else if (error) {
            errorNotify("Error in Editing!")
            dispatch({ type: "PROFESSION_EDIT_RESET" })
        }
    }, [professionEditData?.status, error])

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (setProfessionTitle.length === 0) {
            errorNotify("Please fill up all fields")
            return
        }

        const professionData = {
            title: professionTitle
        }

        dispatch(ProfessionEdit(professionData, id))
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
                                        value={professionTitle}
                                        onChange={(e) => setProfessionTitle(e.target.value)}
                                    />
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
export default EditProfession