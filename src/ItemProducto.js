import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebaseConfig';

function ItemProducto({ producto, onDelete }) {
    const [fileUpload, setFileUpload] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const uploadFile = (productoId) => {
        if (!fileUpload) {
            alert("Por favor selecciona una imagen");
            return;
        }

        setIsUploading(true);
        const fileRef = ref(storage, `files/${productoId}-${fileUpload.name}`);
        const uploadTask = uploadBytesResumable(fileRef, fileUpload);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`La carga lleva ${progress}%`);
            },
            (error) => {
                alert("Error durante la carga: " + error.message);
                setIsUploading(false);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    alert(`Archivo cargado correctamente. URL: ${downloadURL}`);
                    setFileUpload(null);
                } catch (error) {
                    alert("Error al obtener la URL del archivo: " + error.message);
                } finally {
                    setIsUploading(false);
                }
            }
        );
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <h6 className="mb-0">{producto.nombreP}</h6>
            <div className="d-flex align-items-center gap-2">
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFileUpload(e.target.files[0])}
                />
                <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => uploadFile(producto.id)}
                    disabled={isUploading}
                >
                    {isUploading ? "Subiendo..." : "Cargar"}
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(producto.id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
}

export default ItemProducto;
