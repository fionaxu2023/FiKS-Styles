import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Main from "./components/homepage/Main"
import ProductDetail from './components/homepage/productDetail';
import Checkout from './components/checkout/Checkout';
import Confirmation from './components/checkout/Confirmation';
import AuthForm from "./components/auth/AuthForm"
import User from "./components/auth/User"
import SizeChart from './components/SizeChart';
import AboutContact from "./components/AboutContact"
import AdminDetail from "./components/auth/admin/AdminDetail"



const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(me());
  // }, []);

  return (
    <div>
    {isLoggedIn ? (
      <Routes>
       <Route path="/" element={<Main/>}></Route>
       <Route path="/product/:productId" element={<ProductDetail/>}></Route>
       <Route path="checkout" element={<Checkout />} />
       <Route path="checkout/success" element={<Confirmation/>} />
      <Route path="/user" element={<User/>} />
       <Route path="/sizechart" element={<SizeChart/>}/>
       <Route path="/contact" element={<AboutContact/>}/>
       <Route path="/admin/:productId" element={<AdminDetail/>}/>
       <Route
          path="/login"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route
          path="/signup"
          element={<AuthForm name="signup" displayName="Sign Up" />}
        />

      </Routes>
    ) : (
      <Routes>
        <Route path="/" element={<Main/>}></Route>
       <Route path="/product/:productId" element={<ProductDetail/>}></Route>
        <Route
          path="/login"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route
          path="/signup"
          element={<AuthForm name="signup" displayName="Sign Up" />}
        />
         <Route path="/sizechart" element={<SizeChart/>}/>
       <Route path="/contact" element={<AboutContact/>}/>
        
      </Routes>
    )}
  </div>
);
};

export default AppRoutes;
