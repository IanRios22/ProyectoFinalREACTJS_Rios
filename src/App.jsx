import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import OrderPage from "./components/OrderPage/OrderPage";
import Login from "./components/Login/Login";

const App = () => {
  
  return (
    <div className="bg-green-400 h-screen ">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/ProyectoFinalREACTJS_Rios/" element={<ItemListContainer />} />
            <Route exact path="/" element={<ItemListContainer />} />
            <Route
              path="/category/:categoryId"
              element={<ItemListContainer />}
            />
            <Route
              exact
              path="/item/:itemId"
              element={<ItemDetailContainer />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:orderId" element={<OrderPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
