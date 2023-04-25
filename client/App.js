import React from 'react';
import Navbar from './components/global/Navbar';
import { useEffect } from 'react';
import {Routes, Route, useLocation} from "react-router-dom"
import AppRoutes from "./AppRoutes;
import Cart from './components/global/Cart';
import Menu from './components/global/Menu';

const ScrollToTop = ()=>{
  const {pathname}=useLocation()

  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])
  return null 
}


const App = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <AppRoutes/>
       <Cart/>
       <Menu/>
    </div>
  );
};

export default App;
