import AppRoute from "./AppRoute";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <CartProvider>
      <UserProvider>
        <AppRoute />
        <ToastContainer position="top-right" />
      </UserProvider>
    </CartProvider>
  );
};
export default App;
