import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import ItemDetail from "../ItemDetail/ItemDetail";
import image from "../../assets/loading-2.gif";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    const collectionRef = collection(db, "products");
    const filteredCollectionRef = query(
      collectionRef,
      where("id", "==", itemId)
    );

    getDocs(filteredCollectionRef)
      .then((querySnapshot) => {
        // Se verifica si el ID del documento de Firebase coincide
        if (!querySnapshot.empty) {
          // Obtenemos el primer ID del documento que coincide
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          const productAdapted = { id: doc.id, ...data };
          // Simula una demora de 2 segundos antes de mostrar el producto
          setTimeout(() => {
            setProduct(productAdapted);
            setLoading(false); // Cambia loading a false después de 2 segundos
          }, 1000); // Espera 2 segundos
        } else {
          console.log("El producto no existe.");
          setProduct(null);
          setLoading(false); // Cambia loading a false si el producto no existe
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemId]);

  return (
    <div>
      {loading ? (
        <img
          src={image}
          alt="loading"
          className="w-80 h-80 rounded-full shadow-md mx-auto mt-20"
        />
      ) : product ? (
        <ItemDetail {...product} />
      ) : (
        <p>El producto no existe</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
