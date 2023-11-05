import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../Util/Loader';
import { ProfessionDelete, ProfessionGet } from '../../../../Redux/action/Admin';
import DynamicModal from '../../../../Components/Modal/Modal';
import { Spinner } from 'react-bootstrap';
import { successNotify } from '../../../../Util/toast';

const Profession = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [deleteId, setDeleteId] = useState(false)
    const { loading, professionGetData } = useSelector((state) => state.getProfession)
    const { loading: deleteLoading, professionDeleteData } = useSelector((state) => state.deleteProfession)

    useEffect(() => {
        dispatch(ProfessionGet())

        if (professionDeleteData && professionDeleteData?.status === 1) {
            successNotify("Professional Deleted Successfully!")
            setShow(false)
            dispatch({ type: "PROFESSION_DELETE_RESET" })
        }
    }, [professionDeleteData?.status === 1])

    const deleteHandler = (id) => {
        setShow(!show)
        setDeleteId(id)
    }

    const deleteApi = () => {
        dispatch(ProfessionDelete(deleteId))
    }

    const modal = <DynamicModal show={show} setShow={() => setShow(!show)} heading="Delete Profession" styleName='profession_delete'>
        <div>
            <p>Are you sure you want to delete?</p>

            <div className='text-end'>
                <button className='yes_btn' onClick={deleteApi}> {deleteLoading ? <Spinner animation='border' size='sm' /> : 'Yes'} </button>
                <button className='no_btn' onClick={() => setShow(!show)}>No</button>
            </div>
        </div>
    </DynamicModal>

    return (
        <div>
            {modal}
            <div className='Divider'>
                <div className='TabName'>
                    Profession
                </div>
            </div>

            <div className='create_course'>
                <button onClick={() => navigate('/admin/profession/create-profession')}>Create Profession</button>
            </div>

            {
                loading ? <Loader /> :
                    <div className='row mt-4' style={{ gap: "25px 0" }}>
                        {
                            professionGetData?.data?.rows?.length > 0 ? professionGetData?.data?.rows?.map((exp) => {
                                return (
                                    <div className='col-md-4'>
                                        <div className='expert_Card lesson_card' key={exp.id}>
                                            <h3>Profession Title: <br /> <span>{exp.title}</span></h3>

                                            <div style={{ marginTop: "30px" }}>
                                                <button style={{ right: "100px" }} onClick={() => navigate(`/admin/profession/edit-profession/${exp.id}`)}>Edit</button>
                                                <button style={{ backgroundColor: "rgb(253 31 40)" }} onClick={() => deleteHandler(exp.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <h6 className='course_not_found'> No Profession Found </h6>
                        }
                    </div>
            }
        </div>
    )
}
export default Profession