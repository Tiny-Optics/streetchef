/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import type {User} from './context/AppContext';
import { SIGNED_OUT_PATH } from './lib/auth-routes';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { ItemDetail } from './pages/ItemDetail';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
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

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <p className="text-gray-500">Loading...</p>
  </div>
);

type AppRole = NonNullable<User['role']>;

function roleHome(role?: User['role']) {
  switch (role) {
    case 'driver':
      return '/driver/home';
    case 'merchant':
      return '/merchant/dashboard';
    default:
      return '/home';
  }
}

function normalizeRole(role?: User['role']): AppRole {
  return role ?? 'customer';
}

const ProtectedRoute = () => {
  const { user, authLoading } = useAppContext();
  if (authLoading) return <LoadingScreen />;
  if (!user) return <Navigate to={SIGNED_OUT_PATH} replace />;
  return <Outlet />;
};

const RoleRoute = ({allow}: {allow: AppRole[]}) => {
  const {user, authLoading} = useAppContext();
  if (authLoading) return <LoadingScreen />;
  if (!user) return <Navigate to={SIGNED_OUT_PATH} replace />;
  const role = normalizeRole(user.role);
  if (!allow.includes(role)) {
    return <Navigate to={roleHome(role)} replace />;
  }
  return <Outlet />;
};

const CustomerRoute = () => <RoleRoute allow={['customer']} />;
const DriverRoute = () => <RoleRoute allow={['driver']} />;
const MerchantRoute = () => <RoleRoute allow={['merchant']} />;

const AuthEntry = () => {
  const { user, authLoading } = useAppContext();
  if (authLoading) return <LoadingScreen />;
  if (user) {
    return <Navigate to={roleHome(user.role)} replace />;
  }
  return <Welcome />;
};

const HomeRoute = () => <Home />;

const PartnerLandingRoute = () => {
  const {user, authLoading} = useAppContext();
  if (authLoading) return <LoadingScreen />;
  const role = user?.role;
  if (user && (role === 'customer' || !role)) {
    return <Navigate to="/home" replace />;
  }
  return <PartnerLanding />;
};

const ONBOARDING_KEY = 'streetchef_onboarding_complete';

const AppContent = () => {
  const onboardingDone = localStorage.getItem(ONBOARDING_KEY) === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PartnerLandingRoute />} />
        <Route path="/partner" element={<Navigate to="/" replace />} />
        <Route
          path="/onboarding"
          element={
            <Onboarding
              onComplete={() => {
                localStorage.setItem(ONBOARDING_KEY, 'true');
                window.location.href = '/welcome';
              }}
            />
          }
        />
        {!onboardingDone && <Route path="/splash" element={<Navigate to="/onboarding" replace />} />}

        <Route path="/welcome" element={<AuthEntry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/new-password" element={<NewPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/choose-location" element={<ChooseLocation />} />
          <Route path="/map-location" element={<MapLocation />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/security" element={<Security />} />
          <Route path="/legal" element={<PrivacyPolicy />} />

          <Route element={<CustomerRoute />}>
            <Route path="/payment-method" element={<PaymentMethod />} />
            <Route path="/payment-info" element={<PaymentInfo />} />
            <Route path="/address-selection" element={<AddressSelection />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/tracking" element={<Navigate to="/my-order" replace />} />
            <Route path="/tracking/:orderId" element={<OrderTracking />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/item/:id/reviews" element={<Reviews />} />

            <Route element={<Layout />}>
              <Route path="/home" element={<HomeRoute />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/my-order" element={<MyOrder />} />
            </Route>
          </Route>

          <Route element={<DriverRoute />}>
            <Route path="/driver/home" element={<DriverHome />} />
            <Route path="/driver/earnings" element={<DriverEarnings />} />
            <Route path="/driver/account" element={<DriverAccount />} />
            <Route path="/driver/payment" element={<DriverPayment />} />
            <Route path="/driver/help" element={<DriverHelp />} />
          </Route>

          <Route element={<MerchantRoute />}>
            <Route path="/merchant/dashboard" element={<MerchantHome />} />
            <Route path="/merchant/orders" element={<MerchantOrders />} />
            <Route path="/merchant/menu" element={<MerchantMenu />} />
            <Route path="/merchant/earnings" element={<DriverEarnings />} />
            <Route path="/merchant/account" element={<DriverAccount />} />
            <Route path="/merchant/help" element={<DriverHelp />} />
          </Route>
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
