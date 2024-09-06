import React, { useState } from 'react'
import { Input, Button, ConfigProvider, Select, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { message } from 'antd';


function RegisterByCodeSection() {

    const [modalText, setModalText] = useState('Введите код отправленный вам на почту:');
    const [personalCode, setPersonalCode] = useState("");
    const [code, setCode] = useState("");
    const [isOk, setIsOk] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [pickupPoint, setPickupPoint] = useState("");
    const { registerWithCode, handleCode } = useAuth();
    const [messageApi, contextHolder] = message.useMessage();
    const errorMessage = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
          duration: 3,
        });
    };
  
    async function handleRegister(email, password, name, surname, phone, pickupPoint, personalCode) {
      if(password.length >= 8) {
        let res = await registerWithCode({ email, password, name, surname, phone, pickupPoint, personalCode });
        if(res.status != 400) {
            setIsOk(true);
        }
      } else {
            errorMessage("Пароль должен содержать 8 или более символов!");
        }
    }

    const handleCancel = () => {
        setIsOk(false);
        setModalText('Введите код отпрвленный вам на почту:')
      };

    const handleOk = async () => {
        let res = await handleCode(code, phone);
        if(res.status !== 200) {
            setModalText('Введенный код неверен, попробуйте еще раз!')
        }
      };

  return (
    <div className='register-bg'>
        <Modal
        open={isOk}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            <p>{modalText}</p>
            <Input 
                placeholder='XXXXXX'
                onChange={(e) => setCode(e.target.value)}
                value={code}
            />
      </Modal>
        <div className="container">
            <div className="register-section-wrapper">
                <div className="register-section">
                    <h2 className='register-title'>Зарегистрироваться с кодом</h2>
                    <div className="register-form">
                        <div className="register-form-code">
                            <h3 className='register-form-code-title'>Персональный код</h3>
                            <Input 
                            placeholder='Ваш код' 
                            onChange={(e) => setPersonalCode(e.target.value)}
                            value={personalCode}
                            />
                        </div>
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
                            <h3 className="register-form-password-title">Пароль (*не менее 8 символов)</h3>
                            <Input.Password 
                            placeholder='********' 
                            style={{marginBottom: '10px'}} 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
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
                                <Button style={{width: '100%'}} size='large' onClick={() => handleRegister(email, password, name, surname, phone, pickupPoint, personalCode)}>Зарегистрироваться</Button>          
                            </ConfigProvider>
                        </div>
                        <div className="register-form-bottomtext">
                            <div>
                                <span className='have-acc'>Уже есть аккаунт?</span>
                                <Link className='register-form-register-btn' to='/signin'>Войти</Link>
                            </div>
                            <div>
                                <span className='have-code'>Зарегистрироваться без кода?</span>
                                <Link className='login-form-usecode-btn' to='/register'>Зарегистрироваться</Link>
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

export default RegisterByCodeSection