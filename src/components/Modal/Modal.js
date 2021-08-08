import React from 'react'
import './styles.scss'

const Modal = ({ hideModal, toggleModal, children }) => {
    if(hideModal) return null;

    return (
        <>
            <div 
                className="modal-overlay" 
                onClick={() => toggleModal()}
            />
            <div className='modal-content'>
                <div className="modal">
                    { children }
                </div>
                
            </div>
        </>
    )
}

export default Modal
