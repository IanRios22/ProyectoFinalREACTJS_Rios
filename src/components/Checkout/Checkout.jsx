import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  query,
  writeBatch,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import CheckoutForm from "../ChekoutForm/CheckoutForm";
import cargandoOrden from "../../assets/cargandoOrden.gif";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { cart, total, limpiarCart } = useContext(CartContext);

  const crearOrder = async ({ name, phone, email }) => {
    setLoading(true);

    try {
      const objOrden = {
        user: {
          name,
          phone,
          email,
        },
        items: cart,
        total: total,
        date: Timestamp.fromDate(new Date()),
      };
      const batch = writeBatch(db);
      const ids = cart.map((prod) => prod.id);
      const productsRef = collection(db, "products");
      const productsAddedFromFirestore = await getDocs(
        query(productsRef, where(documentId(), "in", ids))
      );
      const { docs } = productsAddedFromFirestore;
      let productosFueraDeStock = false;

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDb = dataDoc.stock;
        const productAddedToCart = cart.find((prod) => prod.id === doc.id);
        const prodCantidad = productAddedToCart?.cantidad;

        if (stockDb >= prodCantidad) {
          batch.update(doc.ref, { stock: stockDb - prodCantidad });
        } else {
          productosFueraDeStock.push({ id: doc.id, ...dataDoc });
          productosFueraDeStock = true;
        }
      });

      if (productosFueraDeStock) {
        console.error("productos fuera de stock");
      } else {
        await batch.commit();
        const orderRef = collection(db, "orders");
        const orderAgregar = await addDoc(orderRef, objOrden);
        setOrderId(orderAgregar.id);
        limpiarCart();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="bg-gray-300 shadow-md p-4 rounded-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Espere, estamos procesando su orden
        </h1>
        <img
          src={cargandoOrden}
          alt="cargandoOrden"
          className="w-80 h-80 rounded-full shadow-md mx-auto mb-4"
        />
      </div>
    );
  }
  if (orderId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-sky-500 p-5 rounded-xl m-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            El ID de su orden es:{" "}
            <p className="text-white font-bold">{orderId}</p>
          </h1>
          <div className="mt-4 text-center flex justify-center items-center">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-green-800">
              <Link to={`/order/${orderId}`} className="text-white">
                Revisar Orden
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Checkout</h1>
      <CheckoutForm onConfirm={crearOrder} />
    </div>
  );
};

export default Checkout;
