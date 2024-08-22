import React, { useEffect, useState } from 'react'
import './ProfileData.css'
import { Input, Select, Button, ConfigProvider } from 'antd';
import { useAuth } from '../contexts/AuthContextProvider';

export default function ProfileData() {
    const { logout, getUserData, editUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userCode, setUserCode] = useState("");
    const [userPickup, setUserPickup] = useState("");

    useEffect(() => {
        async function fetchData() {
            let res = await getUserData();
            setUserName(res.profile_data.name);
            setUserCode(res.profile_data.individual_code);
            setUserPhone(res.profile_data.phone);
            setUserPickup(res.profile_data.pickup_point)
            setUserSurname(res.profile_data.surname);
        }
        fetchData();
    }, [])

    const handleEdit = (name, surname, phone, pickupPoint) => {
        editUser({name, surname, phone, pickupPoint});
        setIsEditing(!isEditing);
    }

  return (
    <div className="profile-bg">
        <div className='container'>
            <div className="profilepage">
                <Button type="primary" onClick={logout} danger size='large' style={{marginTop: '30px'}}>
                    Выйти
                </Button>
                <div className='profile-data-section'>
                    <div className="profile-data">
                        <h2 className="profile-data-title">Профиль</h2>
                        <div className="profile-data-info">
                            <div className='profile-data-name profile-data-input-wrapper'>
                                <h3 className='profile-data-input-title'>Имя</h3>
                                <Input size='large' disabled={!isEditing} value={userName} onChange={(e) => setUserName(e.target.value)} style={{background: "#fff"}}/>
                            </div>
                            <div className='profile-data-lastname profile-data-input-wrapper'>
                                <h3 className='profile-data-input-title'>Фамилия</h3>
                                <Input size='large' disabled={!isEditing} value={userSurname} onChange={(e) => setUserSurname(e.target.value)} style={{background: "#fff"}}/>
                            </div>
                            <div className='profile-data-phone profile-data-input-wrapper'>
                                <h3 className='profile-data-input-title'>Телефон</h3>
                                <Input size='large' disabled={!isEditing} value={userPhone} onChange={(e) => setUserPhone(e.target.value)} style={{background: "#fff"}}/>
                            </div>
                            <div className='profile-data-code profile-data-input-wrapper'>
                                <h3 className='profile-data-input-title'>Индивидуальный код</h3>
                                <Input size='large' disabled value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{background: "#fff"}}/>
                            </div>
                            <div className='profile-data-pickup profile-data-input-wrapper'>
                                <h3 className='profile-data-input-title'>Пункт выдачи</h3>
                                <Input size='large' disabled={!isEditing} value={userPickup} onChange={(e) => setUserPickup(e.target.value)} style={{background: "#fff"}}/>
                            </div>
                            <div className='profile-data-edit'>
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
                                    {!isEditing ? <Button size='large' onClick={() => setIsEditing(!isEditing)}>Редактировать</Button> : ""}
                                    {isEditing ? <Button size='large' onClick={() => handleEdit(userName, userSurname, userPhone, userPickup)}>Сохранить</Button> : ""}       
                                </ConfigProvider>
                            </div>
                        </div>
                    </div>
                    <div className="profile-logo">
                        <img src="https://us.123rf.com/450wm/sentavio/sentavio1701/sentavio170100087/69594465-truck-delivery-cargo-logo-design-vector-template-lorry-auto-car-vehicle-logotype-silhouette-negative.jpg?ver=6" alt="cargo logo" className='profile-logo-img'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
