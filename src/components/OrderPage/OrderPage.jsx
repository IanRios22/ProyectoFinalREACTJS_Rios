import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import deleted from "../../assets/ordenDeleted.png";

const OrderPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderDeleted, setOrderDeleted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [total, setTotal] = useState(0);

  const handleEliminarOrden = (orderId) => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta orden?")) {
      const orderRef = doc(db, "orders", orderId);

      deleteDoc(orderRef)
        .then(() => {
          console.log("Orden eliminada correctamente.");
          //Actualizamos el estado
          setOrderDeleted(true);
          setConfirmationMessage("La orden ha sido eliminada correctamente.");
          //LIMPIAMOS LOS DATOS
          setOrderData({});
        })
        .catch((error) => {
          console.error("Error al eliminar la orden:", error);
        });
    }
  };

  useEffect(() => {
    const orderRef = doc(db, "orders", orderId);

    getDoc(orderRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setOrderData(data);
          const totalOrden = data.items.reduce(
            (acc, product) => acc + product.price * product.cantidad,
            0
          );
          setTotal(totalOrden);
        } else {
          console.log("La orden no existe.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener la orden:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderId]);

  if (orderDeleted) {
    return (
      <div className="bg-white shadow-md p-4 rounded-md text-center m-5">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {confirmationMessage}
          <img
            src={deleted}
            alt="eliminar"
            className="mx-auto border border-red-500 rounded-full h-80 w-70 m-2"
          />
        </h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          <Link to="/">Regresar al Inicio</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-green-400 p-4">
      <div className="bg-orange-300 shadow-md p-4 rounded-md m-4 ">
        {loading ? (
          <p className="text-center text-gray-600">
            Cargando detalles de la orden...
          </p>
        ) : !orderData ? (
          <p className="text-center text-red-600">La orden no existe.</p>
        ) : (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 bg-gray-300 text-center rounded-xl">
              Detalles de la Orden:{" "}
              <p className="text-teal-500 font-bold">{orderId}</p>
            </h2>
            {orderData.user ? (
              <div>
                {/* EN ESTA SECCIÓN MOSTRAREMOS LOS DETALLES DE LA ORDEN */}
                <p>
                  <span className="font-bold text-blue-600">Nombre:</span>{" "}
                  {orderData.user.name || "No disponible"}
                </p>
                <p>
                  <span className="font-bold text-blue-600">Teléfono:</span>{" "}
                  {orderData.user.phone || "No disponible"}
                </p>
                <p>
                  <span className="font-bold text-blue-600">Email:</span>{" "}
                  {orderData.user.email || "No disponible"}
                </p>
                <h3 className="text-lg font-semibold mt-4">
                  Detalles del Producto:
                </h3>
                {orderData.items.map((product, index) => (
                  <div key={index}>
                    <p>
                      <span className="font-bold text-blue-600">
                        Nombre del Producto:
                      </span>{" "}
                      {product.name || "No disponible"}
                    </p>
                    <p>
                      <span className="font-bold text-blue-600">Cantidad:</span>{" "}
                      {product.cantidad || "No disponible"}
                    </p>
                    <p>
                      <span className="font-bold text-blue-600">Precio:</span> $
                      {product.price || "No disponible"}
                    </p>
                    {index < orderData.items.length - 1 && (
                      <hr className="my-4" />
                    )}
                  </div>
                ))}
                <div className="text-right">
                  <h3 className="text-xl font-semibold mt-2">
                    Total: ${total.toFixed(2)}
                  </h3>
                </div>
              </div>
            ) : (
              <p className="text-red-600">Datos del usuario no disponibles.</p>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          <Link to="/">Regresar al Inicio</Link>
        </button>
        <button
          onClick={() => handleEliminarOrden(orderId)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-red active:bg-red-800 ml-4"
        >
          Eliminar Orden
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
