import React from 'react'

export const PickUpCard = (props) => {
  return (
    <div className="pickup-data-title">
        <h3 className='pickup-data-name'>{props.title}</h3>
        <p className='pickup-data-description'>{props.description}</p>
        <a href={props.link} className='pickup-data-link' >2GIS</a>
    </div>
  )
}
