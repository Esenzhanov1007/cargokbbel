import axios from 'axios';
import React from 'react'
import { convertDate } from '../helpers/dateConverter'

const baseURL = 'http://139.59.135.34:8000';

export const RecentCargo = (props) => {

  const imageURL = `${baseURL}${props.img}`

  return (
    <div className="recentcargo-data-box">
        <img src={imageURL} height={200} alt={props.title} className='recentcargo-data-img' />
        <span className='recentcargo-data-date'>{convertDate(props.date)}</span>
        <span className='recentcargo-data-weight'>{props.weight}кг</span>
        <span className='recentcargo-data-time'>{props.price} сом</span>
    </div>
  )
}
