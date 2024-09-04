import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { Dropdown, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';


export default function 
() {
    const location = useLocation();
    const windowInnerWidth = window.innerWidth;

    const [isLogged, setIsLogged] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 705);

    useEffect(() => {
        setIsLogged(localStorage.getItem('token'));
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 705);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const items = [
        {
          key: '1',
          label: (
            <Link to='/signin' className='header-dropdown-sign-in-btn'>Войти</Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to='/signup' className='header-dropdown-sign-up-btn'>Зарегистрироваться</Link>
          ),
        },
        {
          key: '3',
          label: (
            <Link to='/registerbycode' className='header-dropdown-sign-up-btn'>Зарегистрироваться по старому коду</Link>
          ),
        },
      ];

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
                    {isLogged ? (
                        <></>
                    ) : isMobile ? (
                        <div className='header-sign'>
                        <Dropdown
                            menu={{ items }}
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <MenuOutlined style={{ color: '#fff' }} />
                                </Space>
                            </a>
                        </Dropdown>
                        </div>
                    ) : (
                        <div className='header-sign'>
                            <Link to='/signin' className='header-sign-in-btn'>Войти</Link>
                            <Link to='/signup' className='header-sign-up-btn'>Зарегистрироваться</Link>
                            <Link to='/registerbycode' className='header-sign-up-btn'>Зарегистрироваться по старому коду</Link>
                        </div>
                    )}
            </div>
        </div>
    </div>
  )
}