import React from 'react';
import './KeyMetricsSection.css';
import { ClockCircleTwoTone, DollarTwoTone, CloudTwoTone } from '@ant-design/icons';

export default function () {
  return (
    <div className='container'>
        <div className='keymetrics-section'>
            <h2 className='keymetrics-title'>Ключевые показатели</h2>
            <div className='keymetrics-data'>
                <div className='keymetrics-data-time'>
                    <h3 className='keymetrics-data-time-title'>Время доставки</h3>
                    <ClockCircleTwoTone style={{fontSize: '36px'}} />
                    <h2 className='keymetrics-data-time-time'>7-15 дней</h2>
                </div>
                <div className='keymetrics-data-price'>
                    <h3 className='keymetrics-data-price-title'>Цена за кг</h3>
                    <DollarTwoTone twoToneColor="#5EC26A" style={{fontSize: '36px'}} />
                    <h2 className='keymetrics-data-price-price'>$3.30</h2>
                </div>
                <div className='keymetrics-data-type'>
                    <h3 className='keymetrics-data-type-title'>Способ доставки</h3>
                    <CloudTwoTone twoToneColor="#E2B53F" style={{fontSize: '36px'}} />
                    <h2 className='keymetrics-data-type-type'>Авиа</h2>
                </div>
            </div>
        </div>
    </div>
  )
}
