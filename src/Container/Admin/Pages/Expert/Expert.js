import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { ExpertDelete, ExpertGet } from '../../../../Redux/action/Admin';
import Loader from '../../../../Util/Loader';
import { cloudURL } from '../../../../Util/helper';
import DynamicModal from '../../../../Components/Modal/Modal';
import { Spinner } from 'react-bootstrap';
import { successNotify } from '../../../../Util/toast';

const Expert = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [deleteId, setDeleteId] = useState(false)

    const { loading, expertGetData } = useSelector((state) => state.getExpert)
    const { loading: deleteLoading, expertDeleteData } = useSelector((state) => state.deleteExpert)

    useEffect(() => {
        dispatch(ExpertGet())

        if (expertDeleteData && expertDeleteData?.status === 1) {
            successNotify("Expert Deleted Successfully!")
            setShow(false)
            dispatch({ type: "EXPERT_DELETE_RESET" })
        }
    }, [expertDeleteData?.status === 1])

    const deleteHandler = (id) => {
        setShow(!show)
        setDeleteId(id)
    }

    const deleteApi = () => {
        dispatch(ExpertDelete(deleteId))
    }

    const modal = <DynamicModal show={show} setShow={() => setShow(!show)} heading="Delete Expert" styleName='profession_delete'>
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
                    All Experts
                </div>
            </div>

            <div className='create_course'>
                <button onClick={() => navigate("/admin/experts/create-expert")}>Create Expert</button>
            </div>

            {
                loading ? <Loader /> :
                    <div className='row mt-4'>
                        {
                            expertGetData?.data?.rows?.length > 0 ? expertGetData?.data?.rows?.map((exp, i) => {
                                return (
                                    <div className='col-md-4'>
                                        <div className='expert_Card' key={exp.id}>
                                            {
                                                !exp.user_avatar ?
                                                    <img src={`/images/dummy-image.jpeg`} alt='' /> :
                                                    <img src={`${cloudURL}logo/${exp.user_avatar}`} alt='' />
                                            }
                                            <h1>{exp.first_name} {exp.last_name}</h1>
                                            <h3>{exp.Profession.title}</h3>

                                            <div style={{ marginTop: "50px" }}>
                                                <button style={{ right: "100px" }} onClick={() => navigate(`/admin/experts/edit-expert/${exp.id}`)}>Edit</button>
                                                <button style={{ backgroundColor: "rgb(253 31 40)" }} onClick={() => deleteHandler(exp.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <h6 className='course_not_found'> No Expert Found </h6>
                        }
                    </div>
            }
        </div>
    )
}

export default Expert
