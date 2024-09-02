import React, { createContext, useContext, useState } from 'react';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const APIID = 'https://api.cargokbbelovodsk1.kg/api/v1/users/'

export const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};
  
const AuthContextProvider = ({ children }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const successMessage = (message) => {
      messageApi.open({
        type: 'success',
        content: message,
        duration: 3,
      });
  };
    const errorMessage = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
          duration: 3,
        });
    };

    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const getTracks = async () => {
        let token = JSON.parse(localStorage.getItem('token')).key;
        
        const Authorization = `Token ${token}`;

        const config ={
          headers: {'Content-Type':'multipart/form-data',Authorization},
        };
        const { data } = await axios(`https://api.cargokbbelovodsk1.kg/api/v1/track/`, config);

        return data;
    }

    const getUserData = async () => {
        let token = JSON.parse(localStorage.getItem('token')).key;
        
        const Authorization = `Token ${token}`;

        const config ={
          headers: {'Content-Type':'multipart/form-data',Authorization},
        };
        const { data } = await axios(`${APIID}profile/`, config);

        return data;
    }
  
    const register = async (user) => {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      let formData = new FormData();
      formData.append('name', user.name);
      formData.append('surname', user.surname);
      formData.append('phone', user.phone);
      formData.append('pickup_point', user.pickupPoint);
      formData.append('email', user.email);
      formData.append('password', user.password);

      try {
        const res = await axios.post(`${APIID}registration/`, formData, config);
        return res;
      } catch (e) {
        setError('error occured');
        errorMessage("Данные неверны либо пользователь уже существует");
        return e.response;
      }
    };

    const registerWithCode = async (user) => {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
        };
        let formData = new FormData();
        formData.append('name', user.name);
        formData.append('surname', user.surname);
        formData.append('phone', user.phone);
        formData.append('pickup_point', user.pickupPoint);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('individual_code', user.personalCode);
  
        try {
          const res = await axios.post(`${APIID}registration/oldcode/`, formData, config);
          return res;
        } catch (e) {
          setError('error occured');
          errorMessage("Данные неверны либо пользователь уже существует");
          return e.response;
        }
      };

      const editUser = async (user) => {
        let token = JSON.parse(localStorage.getItem('token')).key;
        
        const Authorization = `Token ${token}`;

        const config ={
          headers: {'Content-Type':'multipart/form-data',Authorization},
        };
        let formData = new FormData();
        formData.append('name', user.name);
        formData.append('surname', user.surname);
        formData.append('phone', user.phone);
        formData.append('pickup_point', user.pickupPoint);
  
        try {
          const res = await axios.put(`${APIID}profile/`, formData, config);
          return res;
        } catch (e) {
          setError('error occured');
          errorMessage("Произошла ошибка!");
          return e.response;
        }
      };
  
    async function login(phone, password) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      let formData = new FormData();
      formData.append('phone', phone);
      formData.append('password', password);
  
      try {
        let res = await axios.post(`${APIID}authorization/`, formData, config);
        localStorage.setItem('token', JSON.stringify(res.data));
        localStorage.setItem('phone', phone);
        setUser(phone);
        navigate('/');
        return res;
      } catch (error) {
        setError('error occured');
        return error.response;
      }
    }
  
    async function handleCode(code, phone) {
      let formData = new FormData();
  
      formData.append('phone', phone);
      formData.append('confirmation_code', code);
  
      try { 
        let res = await axios.post(`${APIID}confirm_code/`, formData);
        navigate('/signin');
        return res;
      } catch (e) {
        setError('error occured');
        return e.response;
      }
    }

    async function handleResetReq(phone) {
      let formData = new FormData();

      formData.append('phone', phone);
      try { 
        let res = await axios.post(`${APIID}password_reset_request/`, formData);
        navigate('/signin');
        return res;
      } catch (e) {
        setError('error occured');
        return e.response;
      }
    }

    async function handleResetConf(uidb, token, password) {
      let formData = new FormData();

      formData.append('uidb64', uidb);
      formData.append('token', token);
      formData.append('new_password', password);

      try { 
        let res = await axios.post(`${APIID}password_reset_confirm/`, formData);
        successMessage("Пароль успешно изменен");
        navigate('/signin');
        return res;
      } catch (e) {
        setError('error occured');
        errorMessage("Что-то пошло не так");
        return e.response;
      }
    }
  
    async function logout() {
      let token = JSON.parse(localStorage.getItem('token')).key;
      localStorage.removeItem('token');
      localStorage.removeItem('phone');
        
      const config ={
        headers: {
          'Authorization' : `Token ${token}`,
          'Content-Type': 'application/json'
        },
      };

      try {
        await axios.post(`${APIID}logout/`, {} , config);
        successMessage('Вы вышли из аккаунта');
        setUser('');
        navigate('/');
      } catch(e) {
        console.error(e)
      }
    }
  
    return (
      <authContext.Provider
        value={{
          getUserData,
          register,
          registerWithCode,
          login,
          user,
          error,
          logout,
          handleCode,
          editUser,
          getTracks,
          handleResetReq,
          handleResetConf,
          isAuth: !!user,
        }}
      >
        {contextHolder}
        {children}
      </authContext.Provider>
    );
  };

 export default AuthContextProvider;