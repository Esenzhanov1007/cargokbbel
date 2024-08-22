import { Button } from 'antd';
import React, { Children } from 'react'
import './AdressModal.css';

export const AdressModal = ({ show, handleClose, children }) => {

    if (!show) {
        return null;
    }
    
  return (
    <div className='adress-modal-bg'>
        <div className='adress-modal'>
            <Button onClick={handleClose} className='close-modal'>Закрыть</Button>
            {children}
        </div>
    </div>
  )
}
