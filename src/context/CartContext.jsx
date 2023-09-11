import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  agregarItem: () => {},
  eliminarItem: () => {},
  limpiarCart: () => {},
  total: 0,
  totalCantidad: 0, // Agrega un campo para totalCantidad
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0); // Inicializa la cantidad total en  = 0

  const agregarItem = (item, cantidad) => {
    if (!estaEnCart(item.id)) {
      setCart((prev) => [
        ...prev,
        {
          ...item,
          cantidad,
        },
      ]);
      setTotalCantidad((prev) => prev + cantidad);
    } else {
      console.error("Ya fue agregado el producto xd");
    }
  };

  const eliminarItem = (itemId) => {
    const item = cart.find((prod) => prod.id === itemId);
    if (item) {
      setCart((prev) => prev.filter((prod) => prod.id !== itemId));
      setTotalCantidad((prev) => prev - item.cantidad); // Actualiza totalCantidad
    }
  };

  const limpiarCart = () => {
    setCart([]);
    setTotalCantidad(0); // Limpia totalCantidad
  };

  const estaEnCart = (itemId) => {
    return cart.some((prod) => prod.id === itemId);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        agregarItem,
        eliminarItem,
        limpiarCart,
        total,
        totalCantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
