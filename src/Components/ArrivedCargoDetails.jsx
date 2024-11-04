import React, { useState } from 'react'
import { Button, List, Modal } from 'antd'
import { CheckCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import './CargoDetails.css';

function CargoDetails(props) {

    const data = [
        `Вес`,
        `Цена`,
        `Дата прибытия`,
        `Получено`
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

  return (
    <>
        <div className="details-data">
            <h3 className='details-data-title'>Информация о грузе</h3>
            <List
                bordered
                dataSource={data}
                renderItem={(item) => {
                    if (item == "Получено") {
                        return <List.Item>{props.track.date_received_by_client ? <CheckCircleTwoTone twoToneColor="#5FCF73"/> : <MinusCircleTwoTone twoToneColor="#5E5E5E"/>} Получено{props?.track?.date_received_by_client ? `: ${props?.track?.date_received_by_client}` : ""}</List.Item>
                    } else if (item == "Вес") {
                        return <List.Item>{item}: {props.track.total_weight}</List.Item>
                    } else if (item == "Цена") {
                        return <List.Item>{item}: {props.track.total_price}</List.Item>
                    } else if (item == "Дата прибытия") {
                        return <List.Item>{item}: {props.track.date_created}</List.Item>
                    }
                }}
            />
            <Button style={{margin: "10px 0"}} onClick={showModal} type="primary">Посмотреть товары</Button>
        </div>
        <Modal title="Коды товаров" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
            {props?.track?.list_of_tracks.map((e) => <p key={e}>{e}</p>)}
        </Modal>
    </>
  )
}

export default CargoDetails