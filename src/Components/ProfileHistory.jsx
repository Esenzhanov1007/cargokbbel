import React, { useEffect, useState } from 'react'
import './ProfileHistory.css'
import { Table } from 'antd'
import { useAuth } from '../contexts/AuthContextProvider';

export default function 
() {
  const windowInnerWidth = window.innerWidth;

  const { getTracks } = useAuth();

  const [userTracks, setUserTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getTracks();
      const filtered = res.filter((e) => e.status == "Доставлено").map(item => ({
        ...item, 
        weight: `${item.weight}кг`, 
        price: `${item.price} $` 
      }));;
      setUserTracks(filtered);
    }
    fetchData();
}, [])

      const columns = [
        {
          title: 'Номер заказа',
          dataIndex: 'track_code',
          key: 'id',
        },
        {
          title: 'Вес',
          dataIndex: 'weight',
          key: 'weight',
        },
        {
          title: 'Статус',
          dataIndex: 'status',
          key: 'status',
        },
        {
            title: 'Сумма',
            dataIndex: 'price',
            key: 'price',
        },
      ];

      const adaptiveColumns = [
        {
          title: 'Номер заказа',
          dataIndex: 'track_code',
          key: 'id',
        },
        {
            title: 'Сумма',
            dataIndex: 'price',
            key: 'price',
        },
      ];
          
  return (
    <div className='container'>
        <div className="cargo-history-section">
            <h2 className='cargo-history-title'>История грузов</h2>
            <Table dataSource={userTracks} columns={windowInnerWidth < 630 ? adaptiveColumns : columns} />
        </div>
    </div>
  )
}
