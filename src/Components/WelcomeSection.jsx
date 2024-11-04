import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './WelcomeSection.css';
import logo from '../assets/images/logo.png';

export default function WelcomeSection() {

    const location = useLocation();

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        setIsLogged(localStorage.getItem('token'));
    }, [location])

  return (
    <div className='welcome-section-bg'>
        <div className='container'>
            <div className='welcome-section'>
                <div className='welcome-text'>
                    <h2 className='welcome-text-title'>Добро пожаловать в Asia Cargo</h2>
                    <p className='welcome-text-description'>Управляйте своими грузовыми перевозками с легкостью. Отслеживайте ваши заказы, просматривайте обновления и обновляйте ваш профиль.</p>
                    <div className='welcome-text-links'>
                        {isLogged ? <div className='welcome-links'>
                            <Link to='/details' className='welcome-text-tracking-link'>Отслеживание Груза</Link>
                            <Link to='/profile' className='welcome-text-profile-link'>Профиль</Link>
                            </div> : <></>}
                        {isLogged ? <></> :  <div className='welcome-sign'>
                            <Link to='/signin' className='welcome-sign-in-btn'>Войти</Link>
                            <Link to='/signup' className='welcome-sign-up-btn'>Зарегистрироваться</Link>
                            <Link to='/registerbycode' className='welcome-sign-up-btn'>Зарегистрироваться по старому коду</Link>
                            </div>}
                    </div>
                </div>
                <div className='welcome-image-container'>
                    <img src={logo} alt="cargo-logo" className='welcome-image' />
                </div>
            </div>
        </div>
    </div>
  )
}
