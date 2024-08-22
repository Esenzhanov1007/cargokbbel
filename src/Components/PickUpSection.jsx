import React from 'react'
import './PickUpSection.css'
import { useMain } from '../contexts/MainContextProvider';
import { PickUpCard } from './PickUpCard';

export default function PickUpSection() {
    const {kgAdresses} = useMain();
  return (
    <div className='container'>
        <div className='pickup-section'>
            <h2 className="pickup-title">Пункты самовывоза</h2>
            <div className='puckup-data'>
                {kgAdresses?.map((item) => (
                    <PickUpCard key={item.id} title={item.title} description={item.description} link={item.link} />
                ))}
            </div>
        </div>
    </div>  
  )
}
