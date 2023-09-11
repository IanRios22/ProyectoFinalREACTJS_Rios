import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";

const Cart = ({ closeCart }) => {
  const { cart, limpiarCart, totalCantidad, total } = useContext(CartContext);
  if (totalCantidad === 0) {
    return (
      <div className="text-center mt-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          No hay productos en el Carrito de Compras
        </h1>
        <div className="flex items-center justify-center mt-10">
          <img
            src="https://i.pinimg.com/550x/9a/67/ae/9a67ae65b9fea8c44b64d3307db86a7d.jpg"
            alt="Imagen"
            className="rounded-full w-36 h-36"
          />
        </div>
      </div>
    );
  }

  const handleValidarCompra = () => {
    closeCart(); 
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-4 items-center justify-between">
      <div className="flex-wrap m-3">
        {cart.map((p) => (
          <CartItem key={p.id} {...p} />
        ))}
      </div>
      <div className="text-center">
        <div className="m-3 inline-block text-center">
          <h3 className="text-2xl font-semibold">Total: ${total.toFixed(2)}</h3>
          <button
            onClick={() => limpiarCart()}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600"
          >
            Limpiar Carrito
          </button>
          <Link to="/login">
            {" "}
            <button
              onClick={handleValidarCompra}
              className="bg-blue-500 text-white px-4 p-4 rounded-md mt-4 hover:bg-blue-600 inline-block"
            >Validar Compra</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
