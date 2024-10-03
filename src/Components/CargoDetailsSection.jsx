import { Input, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContextProvider';
import CargoDetails from './CargoDetails'
import './CargoDetailsSection.css'

const { Search } = Input;

function CargoDetailsSection() {

  const { getTracks, postTrack } = useAuth();

  const [userTracks, setUserTracks] = useState([]);
  const [trackUpdated, setTrackUpdated] = useState(false);

  useEffect(() => {
    async function fetchData() {
        let res = await getTracks();
        setUserTracks(res.filter((e) => e.status != "Доставлено"));
    }
    fetchData();
  }, [])

  useEffect(() => {
    async function fetchData() {
        let res = await getTracks();
        setUserTracks(res.filter((e) => e.status != "Доставлено"));
    }
    fetchData();
  }, [trackUpdated])

  async function handleTrackCode(code) {
    let res = await postTrack(code);
    setTrackUpdated(!trackUpdated);
  }

  return (
    <div className='details-bg'>
        <div className="container">
            <div className="details-section">
                <h2 className='details-title'>Отслеживание груза</h2>
                <Space direction="vertical" style={{width: "100%"}}>
                  <Search
                    placeholder="Введите трек-код"
                    enterButton="Добавить"
                    size="large"
                    onSearch={(e) => handleTrackCode(e)}
                  />
                </Space>
                {userTracks ? userTracks.map((e) => <CargoDetails updated={trackUpdated} trackUpdated={setTrackUpdated} key={e.track_code} track={e} />) : <>Нет данных!</>}
            </div>
        </div>
    </div>
  )
}

export default CargoDetailsSection