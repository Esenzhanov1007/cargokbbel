import React from 'react'
import { Input } from 'antd'
import './CargoDetails.css';

function CargoDetails(props) {
  return (
    <>
        <div className="details-data">
            <h3 className='details-data-title'>Информация о грузе</h3>
            <div className="details-data-info">
                <div className="details-input-wrapper">
                    <h3 className='details-input-title'>Номер заказа</h3>
                    <Input size='large' disabled value={props.track?.track_code} style={{background: "#fff"}} />
                </div>
                <div className="details-input-wrapper">
                    <h3 className='details-input-title'>Статус</h3>
                    <Input size='large' disabled value={props.track?.status} style={{background: "#fff"}} />
                </div>
                <div className="details-input-wrapper">
                        <h3 className='details-input-title'>Вес</h3>
                    <Input size='large' disabled value={props.track?.weight + " кг"} style={{background: "#fff"}} />
                </div>
                <div className="details-input-wrapper">
                    <h3 className='details-input-title'>Сумма</h3>
                    <Input size='large' disabled value={props.track?.price + "$"} style={{background: "#fff"}} />
                </div>
            </div>
        </div>
    </>
  )
}

export default CargoDetails