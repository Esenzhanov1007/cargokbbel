import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import RegisterByCode from "../Components/RegisterByCodeSection";
import { authContext } from "../contexts/AuthContextProvider";
import CargoDetailsPage from "../Pages/CargoDetailsPage";
import LoginPage from "../Pages/LoginPage";
import MainPage from '../Pages/MainPage'
import NotFoundPage from "../Pages/NotFoundPage";
import ProfilePage from "../Pages/ProfilePage";
import RegistrationPage from "../Pages/RegistrationPage";
import { ResetPage } from "../Pages/ResetPage";

/* eslint-disable no-restricted-globals */

const MainRoutes = () => {

  const [isLogged, setIsLogged] = useState(false);
  const {isAuth} = useContext(authContext);

  useEffect(() => {
    setIsLogged(localStorage.getItem('token'));
  }, [location, isAuth]);

  const PRIVATE_ROUTES = [
    {
      link: "/profile",
      element: <ProfilePage />,
      id: 2,
  },
  {
    link: "/details",
    element: <CargoDetailsPage />,
    id: 3,
  },
  ];

  const SIGN_ROUTES = [
    {
      link: "/signup",
      element: <RegistrationPage />,
      id: 4,
    },
    {
      link: "/signin",
      element: <LoginPage /> ,
      id: 5,
    },
  ];

  const PUBLIC_ROUTES = [
    {
      link: "/",
      element: <MainPage />,
      id: 1,
    },
    {
      link: "/registerbycode",
      element: <RegisterByCode /> ,
      id: 5,
    },
    {
      link: "/reset/:uidb/:token",
      element: <ResetPage /> ,
      id: 6,
    },
    {
        link: "*",
        element: <NotFoundPage />,
        id: 99,
    }
  ];
  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id}></Route>
      ))}
      {isLogged ? PRIVATE_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id}></Route>
      )) : SIGN_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id}></Route>
      ))}
    </Routes>
  );
};

export default MainRoutes;
