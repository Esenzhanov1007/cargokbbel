import React from 'react'
import { useMain } from '../contexts/MainContextProvider';
import { RecentCargo } from './RecentCargo';
import './RecentCargoSection.css'

export default function RecentCargoSection() {
    const {recents} = useMain();

  return (
    <div className='recent-bg'>
        <div className="container">
            <div className='recentcargo-section'>
                <h2 className='recentcargo-title'>Последние грузы</h2>
                <div className="recentcargo-data">
                    {recents?.map((item) => (
                        <RecentCargo key={item.id} img={item.photo} title={item.title} price={item.price} weight={item.weight} date={item.date} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
