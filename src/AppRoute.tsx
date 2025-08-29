import {Route, Routes,BrowserRouter } from 'react-router-dom';
import { Home, Signin, Signup } from './pages';
import MainLayout from './layouts/MainLayout';

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default AppRoute