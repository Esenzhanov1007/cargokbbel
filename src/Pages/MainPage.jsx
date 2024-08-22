import React, { useEffect } from 'react'
import KeyMetricsSection from '../Components/KeyMetricsSection'
import OurAdressesSection from '../Components/OurAdressesSection'
import PickUpSection from '../Components/PickUpSection'
import RecentCargoSection from '../Components/RecentCargoSection'
import WelcomeSection from '../Components/WelcomeSection'
import { useMain } from '../contexts/MainContextProvider'
import './MainPage.css';

export default function MainPage() {

  const {getKgAdresses, getCnAdresses, getRecents} = useMain();
  useEffect(() => {
    getCnAdresses();
    getKgAdresses();
    getRecents();
  }, []);

  return (
    <>
        <WelcomeSection/>
        <KeyMetricsSection/>
        <OurAdressesSection/>
        <PickUpSection/>
        <RecentCargoSection/>
    </>
  )
}
