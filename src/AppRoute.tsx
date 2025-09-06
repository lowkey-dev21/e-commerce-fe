import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Home, Details, Products, Signin, Signup } from "./pages";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import OAuthCallback from "./components/auth/OAuthCallback";
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
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="auth/google/callback" element={<OAuthCallback provider="google" />} />
          <Route path="auth/github/callback" element={<OAuthCallback provider="github" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
