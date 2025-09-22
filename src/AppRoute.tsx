import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Home, Details, Products, Signin, Signup } from "./pages";
import ConfirmSignin from "./pages/auth/ConfirmSignin";
import ConfirmSignup from "./pages/auth/ConfirmSignup";
import Dashboard from "./pages/dashboard/Dashboard";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import AuthLayout from "./layouts/AuthLayout";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product-detail/:id" element={<Details />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signin/confirm" element={<ConfirmSignin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signup/confirm" element={<ConfirmSignup />} />
          {/* OAuth callback routes removed - using email OTP flows only */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
