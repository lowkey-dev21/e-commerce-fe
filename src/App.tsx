import AppRoute from "./AppRoute";
import { CartProvider } from "./contexts/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <CartProvider>
      <AppRoute />
      <ToastContainer position="top-right" />
    </CartProvider>
  );
};
export default App;
