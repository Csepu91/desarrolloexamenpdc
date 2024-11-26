// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBT_jvWA_WWF1bX-mIy77kahK0vzGsNtTY",
    authDomain: "pruebafirebasecris-62c5a.firebaseapp.com",
    projectId: "pruebafirebasecris-62c5a",
    storageBucket: "pruebafirebasecris-62c5a.firebasestorage.app",
    messagingSenderId: "654989355553",
    appId: "1:654989355553:web:79f7fcbf46a47593be1160"
};


let app;
try {
    app = initializeApp(firebaseConfig);
} catch (error) {
    console.error("Error al inicializar firebase:", error);
}

export const auth = getAuth(app); // Autenticación
export const storage = getStorage(app); // Almacenamiento
export const firestore = getFirestore(app); // Base de datos Firestore