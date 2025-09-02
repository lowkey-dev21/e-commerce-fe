import AppRoute from "./AppRoute";
import { CartProvider } from "./contexts/CartContext";

const App = () => {
  return (
    <CartProvider>
      <AppRoute />
    </CartProvider>
  );
};
export default App;
