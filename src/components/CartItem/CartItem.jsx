import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartItem = (p) => {
  const { eliminarItem } = useContext(CartContext);

  return (
    <div className="border-b border-gray-300 py-2  items-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">{p.name}</h2>
        <section className="mt-2">
          <p className="text-gray-600">Cantidad: {p.cantidad}</p>
          <p className="text-gray-600">
            Precio x Unidad: ${p.price}
          </p>
          <p className="text-gray-600">Subtotal: ${p.price * p.cantidad}</p>
        </section>
        <button
          onClick={() => eliminarItem(p.id)}
          className="text-blue-500 font-bold hover:text-red-600 mt-2 bg-green-300 rounded-xl p-3"
        >
          Eliminar Item
        </button>
      </div>
    </div>
  );
};

export default CartItem;
