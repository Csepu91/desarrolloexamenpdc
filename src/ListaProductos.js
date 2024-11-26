import React, { useEffect, useState } from "react";
import ItemProducto from "./ItemProducto";
import { firestore } from './firebaseConfig';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';


function ListaProductos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const colleccionP = collection(firestore, 'productos');


        const unsubscribe = onSnapshot(colleccionP, (snapshot) => {
            const productosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProductos(productosData);
        }, (error) => {
            console.error('Error al obtener productos:', error);
        });


        return () => unsubscribe();
    }, []);

    const handleDelete = async (idP) => {
        try {
            const productoDoc = doc(firestore, 'productos', idP);
            await deleteDoc(productoDoc);
            console.log(`Producto: ${idP} eliminado correctamente`);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    return (
        <div>
            <h2 className="text-start">Lista de Productos</h2>
            {productos.length > 0 ? (
                <ul className="list-group">
                    {productos.map((producto) => (
                        <ItemProducto
                            key={producto.id}
                            producto={producto}
                            onDelete={handleDelete}

                        />
                    ))}
                </ul>
            ) : (
                <p>No hay Productos</p>
            )}
        </div>
    );
}

export default ListaProductos;
