import React from 'react'
import { Button, List } from 'antd'
import { CheckCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import './CargoDetails.css';
import { useAuth } from '../contexts/AuthContextProvider';

function CargoDetails(props) {

    const { deleteTrack } = useAuth();

    const data = [
        `Вес: ${props.track.weight ? props.track.weight : '-'} кг`,
        `Цена: ${props.track.price ? props.track.price : '-'} сом`,
        `Китай`,
        `Кыргызстан`
    ];

    async function handleDeleteTrack(code) {
        let res = await deleteTrack(code);
        props.trackUpdated(!props.updated);
    }

  return (
    <>
        <div className="details-data">
            <h3 className='details-data-title'>Информация о грузе</h3>
            <List
                header={<div>Код: {props.track.track_code}</div>}
                bordered
                dataSource={data}
                renderItem={(item) => {
                    if(item == "Китай") {
                        return <List.Item>{props.track.warehouse_china ? <CheckCircleTwoTone twoToneColor="#5FCF73"/> : <MinusCircleTwoTone twoToneColor="#5E5E5E"/>} Склад в Китае</List.Item>
                    } else if (item == "Кыргызстан") {
                        return <List.Item>{props.track.warehouse_kg ? <CheckCircleTwoTone twoToneColor="#5FCF73"/> : <MinusCircleTwoTone twoToneColor="#5E5E5E"/>} Пункт получения</List.Item>
                    } else {
                        return <List.Item>{item}</List.Item>
                    }
                }}
            />
            <Button onClick={() => handleDeleteTrack(props.track.track_code)} style={{margin: "10px 0"}} danger type="primary">Удалить</Button>
        </div>
    </>
  )
}

export default CargoDetails