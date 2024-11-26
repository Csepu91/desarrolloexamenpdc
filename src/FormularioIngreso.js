import React, { useState, useRef } from 'react';
import { firestore } from "./firebaseConfig";
import { collection, addDoc } from 'firebase/firestore';
import SimpleReactValidator from 'simple-react-validator';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormularioIngreso() {
    const [producto, setProducto] = useState({ nombreP: '' });
    const validador = useRef(new SimpleReactValidator());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validador.current.allValid()) {
            try {
                const newProducto = { nombreP: producto.nombreP };
                await addDoc(collection(firestore, 'productos'), newProducto);

                console.log(`Producto: ${producto.nombreP} agregado correctamente`);
                setProducto({ nombreP: '' });

            } catch (error) {
                console.error('Error al agregar Producto:', error);
            }
        } else {
            validador.current.showMessages();
            setProducto({ ...producto });
        }
    };

    return (
        <form id="uploadForm" onSubmit={handleSubmit} >
            <input
                id="nombreP"
                className="form-control"
                type="text"
                name="nombreP"
                value={producto.nombreP}
                onChange={handleChange}
                placeholder="Nombre del Producto"
            />
            {validador.current.message('Nombre', producto.nombreP, 'required|min:3', { className: 'text-danger' })}

            <button type="submit" className="btn btn-success btn-lg btn-block">
                Agregar Producto
            </button>
        </form>
    );
}

export default FormularioIngreso;
