import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';


export default function 
() {
    const location = useLocation();

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        setIsLogged(localStorage.getItem('token'));
    }, [location])

  return (
    <div className='header-bg'>
        <div className='container'>
            <div className='header'>
                <div className='header-logo'>
                    <Link to="/" className='header-logo-link'><h1 className='header-logo-link-title'>Cargo Belovodsk KB #1</h1></Link>
                </div>
                {isLogged ? <div className='header-links'>
                    <Link to='/details' className='header-links-tracking-btn'>Отслеживание Груза</Link>
                    <Link to='/profile' className='header-links-profile-btn'>Профиль</Link>
                </div> : <></>}
               
                {isLogged ? <></> :  <div className='header-sign'>
                    <Link to='/signin' className='header-sign-in-btn'>Войти</Link>
                    <Link to='/signup' className='header-sign-up-btn'>Зарегистрироваться</Link>
                </div>}
            </div>
        </div>
    </div>
  )
}
