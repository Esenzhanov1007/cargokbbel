import React, { useState } from 'react'
import { useMain } from '../contexts/MainContextProvider'
import { AdressModal } from './AdressModal';
import './OurAdressesSection.css'

const OurAdressesSection = () => {
    const {cnAdresses} = useMain();
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const handleOpenModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent({});
    };
  return (
    <div className='adresses-bg'>
        <div className='container'>
            <div className='adresses-section'>
                <h2 className='adresses-title'>Наши адреса в Китае</h2>
                <div className='adresses-data'>
                    <div className='adresses-logo'>
                        <h3 className='adresses-logo-title'>TaoBao</h3>
                        <img src="https://cdn4.iconfinder.com/data/icons/chinas-social-share-icons/256/cssi_taobao-512.png" alt="taobao" className='adresses-logo-img'/>
                        <button onClick={() => handleOpenModal(cnAdresses[3])} className='adresses-logo-btn'>Смотреть</button>
                    </div>
                    <div className='adresses-logo'>
                        <h3 className='adresses-logo-title'>PinDuoDuo</h3>
                        <img src="https://otcommerce.ru/wp-content/uploads/2023/04/5f10aa0684a834485488f873_Webflow-Episode-PDD-1.jpg" alt="pinduoduo" className='adresses-logo-img'/>
                        <button onClick={() => handleOpenModal(cnAdresses[0])} className='adresses-logo-btn'>Смотреть</button>
                    </div>
                    <div className='adresses-logo'>
                        <h3 className='adresses-logo-title'>1688</h3>
                        <img src="https://1688.ru.com/wp-content/uploads/2023/08/cropped-favicon.png" alt="1688" className='adresses-logo-img'/>
                        <button onClick={() => handleOpenModal(cnAdresses[2])} className='adresses-logo-btn'>Смотреть</button>
                    </div>
                    <div className='adresses-logo'>
                        <h3 className='adresses-logo-title'>POIZON</h3>
                        <img src="https://poizonshop.ru/poizon.jpg" alt="poizon"    className='adresses-logo-img'/>
                        <button onClick={() => handleOpenModal(cnAdresses[1])} className='adresses-logo-btn'>Смотреть</button>
                    </div>
                </div>
            </div>
        </div>
        <AdressModal show={showModal} handleClose={handleCloseModal}>
            <h2 style={{textAlign: 'center'}}>{modalContent.title}</h2>
            <div className='modal-description-container'>    
                <h5 style={{margin: '0'}}>Адрес:</h5>      
                <p style={{margin: '0'}}>{modalContent.description}</p>
            </div>
        </AdressModal>
    </div>
  )
}

export default OurAdressesSection;