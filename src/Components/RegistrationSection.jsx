import React, { useState } from 'react'
import './RegistrationSecion.css'
import { Input, Button, ConfigProvider, Select, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { message } from 'antd';


function RegistrationSecion() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [pickupPoint, setPickupPoint] = useState("");
    const { register } = useAuth();
    const [messageApi, contextHolder] = message.useMessage();
    const errorMessage = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
          duration: 3,
        });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        
        return regex.test(password);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return regex.test(email);
    };
  
    async function handleRegister(email, password, name, surname, phone, pickupPoint) {
        if(validatePassword(password) && validateEmail(email) && password == confirmPassword) {
            let res = await register({ email, password, name, surname, phone, pickupPoint });
            if(res.status != 201 || res.status != 200) {
                errorMessage(res.data.error);
            }
        }   else if(password != confirmPassword) {
            errorMessage("Пароли не совпадают!")
        }   else if(!validatePassword(password)) {
                errorMessage("Пароль должен содержать как минимум одну латинскую букву и одну цифру и состоять из 8 символов и более");
        }   else if(!validateEmail(email)) {
                errorMessage("Некорректный формат email");
        }
    }

  return (
    <div className='register-bg'>
        <div className="container">
            <div className="register-section-wrapper">
                <div className="register-section">
                    <h2 className='register-title'>Зарегистрироваться</h2>
                    <div className="register-form">
                        <div className="register-form-name">
                            <h3 className='register-form-name-title'>Имя</h3>
                            <Input 
                            placeholder='Асан' 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            />
                        </div>
                        <div className="register-form-surname">
                            <h3 className='register-form-surname-title'>Фамилия</h3>
                            <Input 
                            placeholder='Асанов'
                            onChange={(e) => setSurname(e.target.value)}
                            value={surname}
                            />
                        </div>
                        <div className="register-form-email">
                            <h3 className='register-form-email-title'>Email</h3>
                            <Input 
                            placeholder='example@email.com'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            />
                        </div>
                        <div className="register-form-phone">
                            <h3 className='register-form-phone-title'>Номер</h3>
                            <Input 
                            placeholder='+996555123456'
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            />
                        </div>
                        <div className='register-form-pickup'>
                            <h3 className='register-form-pickup-title'>Пункт выдачи</h3>
                            <Input 
                            placeholder='Населенный пункт(Беловодск, Кара-Балта, Сокулук...)'
                            onChange={(e) => setPickupPoint(e.target.value)}
                            value={pickupPoint}
                            />
                        </div>
                        <div className="register-form-password">
                            <h3 className="register-form-password-title">Пароль (*не менее 8 символов, цифры и буквы латиницы)</h3>
                            <Input.Password 
                            placeholder='********' 
                            style={{marginBottom: '10px'}} 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            />
                        </div>
                        <div className="register-form-password">
                            <h3 className="register-form-password-title">Подтвердите пароль</h3>
                            <Input.Password 
                            placeholder='********' 
                            style={{marginBottom: '10px'}} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            />
                        </div>
                        <div className="register-form-btn">
                            <ConfigProvider
                                theme={{
                                    components: {
                                    Button: {
                                        defaultColor: "#fff",
                                        defaultBg: "#18181B",
                                        defaultHoverBg: "#2F2F32",
                                        defaultHoverColor: "#fff",
                                        defaultHoverBorderColor: "#2F2F32",
                                        defaultBorderColor: "#18181B",
                                        defaultActiveBorderColor: "#2F2F32",
                                        defaultActiveColor: "#fff",
                                        defaultActiveBg: "#2F2F32"
                                    },
                                    },
                                }}
                            >
                                <Button style={{width: '100%'}} size='large' onClick={() => handleRegister(email, password, name, surname, phone, pickupPoint)}>Зарегистрироваться</Button>          
                            </ConfigProvider>
                        </div>
                        <div className="register-form-bottomtext">
                            <div>
                                <span className='have-acc'>Уже есть аккаунт?</span>
                                <Link className='register-form-register-btn' to='/signin'>Войти</Link>
                            </div>
                            <div>
                                <span className='have-code'>Есть код?</span>
                                <Link className='login-form-usecode-btn' to='/registerbycode'>Зарегистрироваться используя код</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {contextHolder}
    </div>
  )
}

export default RegistrationSecion