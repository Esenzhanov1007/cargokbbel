import { Input, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContextProvider';
import ArrivedCargoDetails from './ArrivedCargoDetails';
import './ArrivedCargo.css'

function ArrivedCargo() {

  const { getArrivedTracks } = useAuth();

  const [userTracks, setUserTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
        let res = await getArrivedTracks();
        setUserTracks(res);
    }
    fetchData();
  }, [])

  return (
    <div className='details-bg'>
        <div className="container">
            <div className="details-section">
                <h2 className='details-title'>Прибывшие товары</h2>
                {userTracks ? userTracks.map((e) => <ArrivedCargoDetails key={e.track_code} track={e} />) : <>Нет данных!</>}
            </div>
        </div>
    </div>
  )
}

export default ArrivedCargo