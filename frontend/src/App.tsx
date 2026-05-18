/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { ItemDetail } from './pages/ItemDetail';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
import { Splash } from './pages/Splash';
import { Onboarding } from './pages/Onboarding';
import { Welcome } from './pages/auth/Welcome';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { VerifyCode } from './pages/auth/VerifyCode';
import { NewPassword } from './pages/auth/NewPassword';
import { ChooseLocation } from './pages/location/ChooseLocation';
import { MapLocation } from './pages/location/MapLocation';
import { PaymentMethod } from './pages/payment/PaymentMethod';
import { PaymentInfo } from './pages/payment/PaymentInfo';
import { Favorites } from './pages/Favorites';
import { MyOrder } from './pages/MyOrder';
import { Reviews } from './pages/Reviews';
import { AddressSelection } from './pages/location/AddressSelection';
import { OrderSuccess } from './pages/OrderSuccess';
import { EditProfile } from './pages/EditProfile';
import { HelpSupport } from './pages/HelpSupport';
import { Notifications } from './pages/Notifications';
import { Security } from './pages/Security';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { PartnerLanding } from './pages/PartnerLanding';
import { DriverHome } from './pages/driver/DriverHome';
import { DriverEarnings } from './pages/driver/Earnings';
import { DriverAccount } from './pages/driver/Account';
import { DriverPayment } from './pages/driver/Payment';
import { DriverHelp } from './pages/driver/Help';
import { MerchantHome } from './pages/merchant/MerchantHome';
import { MerchantOrders } from './pages/merchant/MerchantOrders';
import { MerchantMenu } from './pages/merchant/MerchantMenu';

const ProtectedRoute = () => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/welcome" replace />;
  }
  return <Outlet />;
};

const HomeRoute = () => {
  const { user } = useAppContext();
  if (user?.role === 'driver') {
    return <Navigate to="/driver/home" replace />;
  }
  if (user?.role === 'merchant') {
    return <Navigate to="/merchant/dashboard" replace />;
  }
  return <Home />;
};

const AppContent = () => {
  return (
    <Router>
      <Routes>
        {/* Public Landing Pages */}
        <Route path="/" element={<PartnerLanding />} />
        <Route path="/partner" element={<Navigate to="/" replace />} />
        
        {/* Auth Routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/new-password" element={<NewPassword />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/choose-location" element={<ChooseLocation />} />
          <Route path="/map-location" element={<MapLocation />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/payment-info" element={<PaymentInfo />} />
          <Route path="/address-selection" element={<AddressSelection />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/security" element={<Security />} />
          <Route path="/legal" element={<PrivacyPolicy />} />
          
          <Route path="/menu" element={<Menu />} />
          <Route path="/driver/home" element={<DriverHome />} />
          <Route path="/driver/earnings" element={<DriverEarnings />} />
          <Route path="/driver/account" element={<DriverAccount />} />
          <Route path="/driver/payment" element={<DriverPayment />} />
          <Route path="/driver/help" element={<DriverHelp />} />
          
          {/* Merchant Routes */}
          <Route path="/merchant/dashboard" element={<MerchantHome />} />
          <Route path="/merchant/orders" element={<MerchantOrders />} />
          <Route path="/merchant/menu" element={<MerchantMenu />} />
          <Route path="/merchant/earnings" element={<DriverEarnings />} />
          <Route path="/merchant/account" element={<DriverAccount />} />
          <Route path="/merchant/help" element={<DriverHelp />} />

          <Route element={<Layout />}>
            <Route path="/home" element={<HomeRoute />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/my-order" element={<MyOrder />} />
          </Route>
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/item/:id/reviews" element={<Reviews />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<OrderTracking />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
