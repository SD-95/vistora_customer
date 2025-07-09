import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './layouts/App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './component/general/Home.tsx';
import Profile from './component/general/Profile.tsx';
import Order from './component/general/Order.tsx';
import Ordertrack from './component/general/Ordertrack.tsx';
import Wishlist from './component/general/wishlist.tsx';
import Productdetail from './component/productdetail/productdetail.tsx';
import ProductPage from './component/general/Productpage.tsx';
import LandingPage from './layouts/landing.tsx';
import Auth from './layouts/Auth.tsx';
import Signin from './layouts/authentication/signin.tsx';
import Signup from './layouts/authentication/signup.tsx';
import { LogoutProvider } from './layouts/authentication/LogoutContext.tsx';
import AddToCart from './component/general/Addcart.tsx';
import Checkout from './component/general/Checkout.tsx';
import ContactPage from './component/contactpage.tsx';
import ScrollToTop from './layouts/ScrollToTop.tsx';
import NotificationPage from './component/Notification.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/vistora_cus/">
      <ScrollToTop />
      <LogoutProvider>
        <Routes>
          {/* Landing Page Route (Default) */}
          <Route element={<Auth />}>
            <Route index element={<LandingPage />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Main App Routes */}
          <Route path="" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="my-profile" element={<Profile />} />
            <Route path="order-page" element={<Order />} />
            <Route path="track-order" element={<Ordertrack />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="product-page" element={<ProductPage />} />
            <Route path="product-detail" element={<Productdetail />} />
            <Route path="add-cart" element={<AddToCart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="support" element={<ContactPage />} />
            <Route path="notifications" element={<NotificationPage />} />
          </Route>
        </Routes>
      </LogoutProvider>
    </BrowserRouter>
  </StrictMode>
);