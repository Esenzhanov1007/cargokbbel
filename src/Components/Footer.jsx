import React from 'react'
import './Footer.css'
import { PhoneOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Footer() {
    function openInNewTab(url) {
        window.open(url, '_blank').focus();
    }
    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = `tel:+996702176304`;
    };
  return (
    <div className='footer-bg'>
        <div className="container">
            <footer className='footer'>
                <div className="footer-links">
                    <div className='footer-logo'>
                        <Link to='/' className='footer-logo-text-link'>
                            <h2 className='footer-logo-text'>Cargo Belovodsk KB #1</h2>
                        </Link>
                    </div>
                    <div className="footer-links-contacts">
                        <div className="footer-links-contacts-link">
                            <PhoneOutlined style={{color: '#fff', fontSize: '22px'}} />
                            <span onClick={handleClick} className='footer-links-contacts-text'>+996 702 176 304</span>
                        </div>
                        <div onClick={() => openInNewTab('https://wa.me/996702176304')} className="footer-links-contacts-link">
                            <WhatsAppOutlined style={{color: '#53A537', fontSize: '22px'}} />
                            <span className='footer-links-contacts-text'>+996 702 176 304</span>
                        </div>
                        <div onClick={() => openInNewTab('https://www.instagram.com/cargo_kb_belovodsk?igsh=MWp2cXkxMWh4YnQ0Nw%3D%3D')} className="footer-links-contacts-link">
                            <InstagramOutlined style={{color: '#E933B3', fontSize: '22px'}} />
                            <span className='footer-links-contacts-text'>@cargo_kb_belovodsk</span>
                        </div>
                    </div>
                </div>
                <div className="footer-rights">
                    <h3 className='footer-rights-text'>© 2024 Cargo Belovodsk KB #1. Все права защищены.</h3>
                </div>
            </footer>
        </div>
    </div>
  )
}
