import './App.css';
import ListaProductos from "./ListaProductos";
import FormularioIngreso from "./FormularioIngreso";
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Usuario registrado!");
        setUser(userCredential.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Usuario loggeado!");
        setUser(userCredential.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">SELECCIÓN DE PRODUCTOS</h2>
      {user ? (
        <div className="mt-4">
          <h3>Bienvenido a tu CARRITO DE PRODUCTOS, {user.email}</h3>
          <br></br>
          <div>
            <FormularioIngreso />
            <br></br>
            <ListaProductos />
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h3>Registro / Login</h3>
          <form >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Dirección de correo</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese Correo"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />

            </div>
            <button type="button" className="btn btn-primary" onClick={register}>
              Register
            </button>
            <button type="button" className="btn btn-secondary" onClick={login}>
              Login
            </button>
          </form>
        </div>
      )}

    </div>

  );
}

export default App;
