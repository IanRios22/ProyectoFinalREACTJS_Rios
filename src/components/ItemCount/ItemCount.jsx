import { useState } from "react";

const ItemCount = ({ stock, inicial, onAdd }) => {
  const [cantidad, setCantidad] = useState(inicial);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="p-4 border border-gray-500 rounded-md shadow-md m-7 bg-yellow-500">
      <div className="flex items-center justify-center space-x-4 m-2">
        <button
          onClick={decrementar}
          className="px-2 py-1 border border-gray-300 rounded-md bg-white"
        >
          -
        </button>
        <h4 className="text-xl font-bold">{cantidad}</h4>
        <button
          onClick={incrementar}
          className="px-2 py-1 border border-gray-300 rounded-md bg-white"
        >
          +
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            if (stock) {
              onAdd(cantidad);
            }
          }}
          disabled={!stock}
          className={`w-full py-2 ${
            stock
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          } rounded-md hover:bg-lime-500`}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ItemCount;
