import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContextProvider';
import CargoDetails from './CargoDetails'
import './CargoDetailsSection.css'

function CargoDetailsSection() {

  const { getTracks } = useAuth();

  const [userTracks, setUserTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
        let res = await getTracks();
        setUserTracks(res.filter((e) => e.status != "Доставлено"));
    }
    fetchData();
  }, [])

  return (
    <div className='details-bg'>
        <div className="container">
            <div className="details-section">
                <h2 className='details-title'>Отслеживание груза</h2>
                {userTracks ? userTracks.map((e) => <CargoDetails key={e.track_code} track={e} />) : <></>}
            </div>
        </div>
    </div>
  )
}

export default CargoDetailsSection