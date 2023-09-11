import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import ItemList from "../ItemList/ItemList";
import cargandoProductos from '../../assets/cargandoProducts.gif'

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const collectionRef = collection(db, "products");
    let filteredCollectionRef;

    if (categoryId) {
      filteredCollectionRef = query(
        collectionRef,
        where("category", "==", categoryId)
      );
    } else {
      filteredCollectionRef = collectionRef;
    }

    getDocs(filteredCollectionRef)
      .then((response) => {
        const productAdapted = response.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProducts(productAdapted);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="bg-green-400 mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        {categoryId ? `Categoría: ${categoryId}` : "Todos los Productos"}
      </h1>
      {loading ? (
        <img src={cargandoProductos} alt='carga de productos' className="w-80 h-80 rounded-full shadow-md mx-auto mt-20"/>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;
