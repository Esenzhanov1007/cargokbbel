import { useParams } from 'react-router-dom'
import React from 'react'
import { Input, ConfigProvider, Button, message } from 'antd';
import { useAuth } from '../contexts/AuthContextProvider';

export const ResetPage = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const error = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
          duration: 3,
        });
    };

    const {uidb, token} = useParams();
    
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const { handleResetConf } = useAuth();

    const handleSumbit = async (password) => {
        if(password == passwordConfirm) {
            await handleResetConf(uidb, token, password);
        } else {
            error("Пароли не совпадают")
        }
    };

  return (
    <div className='login-bg'>
        {contextHolder}
        <div className="container">
            <div className="login-section-wrapper">
                <div className="login-section">
                    <h2 className='login-title'>Введите новый пароль</h2>
                    <div className="login-form">
                        <div className="login-form-email">
                            <h3 className='login-form-email-title'>Пароль</h3>
                            <Input.Password
                            placeholder='********' 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            />
                        </div>
                        <div className="login-form-password">
                            <h3 className="login-form-password-title">Подтвердите пароль</h3>
                            <Input.Password 
                            placeholder='********' 
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            value={passwordConfirm}
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
                                <Button style={{width: '100%'}} size='large' onClick={() => handleSumbit(password)}>Готово</Button>          
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
