import React from 'react'
import { Modal } from 'react-bootstrap';
import './Modal.css';

const DynamicModal = ({ show, setShow, heading, styleName, children, size }) => {
    return (
        <Modal show={show} onHide={setShow} className={styleName} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
export default DynamicModal