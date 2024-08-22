import React, { useState } from 'react'
import './LoginSection.css'
import { Input, ConfigProvider, Button, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';


function LoginSection() {

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Пройдите по ссылке, отправленной на вашу почту',
          duration: 3,
        });
    };

    const error = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
          duration: 3,
        });
    };

    const [isOk, setIsOk] = useState(false);    
    const [phone, setPhone] = React.useState("");
    const [resetPhone, setResetPhone] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { login, handleResetReq } = useAuth();

    async function handleLogin(phone, password) {
      let res = await login(phone, password);
      if(res.status == 401) {
        error(res.data.error);
        setPhone('');
        setPassword('');
      }
    }

    const handleCancel = () => {
        setIsOk(false);
    };

    const handleOk = async () => {
        let res = await handleResetReq(resetPhone);
        if(res.status !== 200) {
            setIsOk(false);
            error('Произошла ошибка');
        } else if(res.status == 200) {
            setIsOk(false);
            success();
        }
    };

  return (
    <div className='login-bg'>
        {contextHolder}
        <Modal
            open={isOk}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Введите номер:</p>
            <Input 
                placeholder='Номер'
                onChange={(e) => setResetPhone(e.target.value)}
                value={resetPhone}
            />
      </Modal>
        <div className="container">
            <div className="login-section-wrapper">
                <div className="login-section">
                    <h2 className='login-title'>Войти</h2>
                    <div className="login-form">
                        <div className="login-form-email">
                            <h3 className='login-form-email-title'>Номер</h3>
                            <Input 
                            placeholder='+996505123123' 
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            />
                        </div>
                        <div className="login-form-password">
                            <h3 className="login-form-password-title">Пароль</h3>
                            <Input.Password 
                            placeholder='********' 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            />
                        </div>
                        <div className="login-form-btn">
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
                                <Button style={{width: '100%'}} size='large' onClick={() => handleLogin(phone, password)}>Войти</Button>          
                            </ConfigProvider>
                        </div>
                        <div className="login-form-bottomtext">
                            <div>
                                <span className='no-acc'>Нет аккаунта?</span>
                                <Link className='login-form-register-btn' to='/signup'>Зарегистрироваться</Link>
                            </div>
                            <div>
                                <span className='no-acc'>Забыли пароль?</span>
                                <Link className='login-form-register-btn' onClick={() => setIsOk(!isOk)}>Сбросить</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginSection