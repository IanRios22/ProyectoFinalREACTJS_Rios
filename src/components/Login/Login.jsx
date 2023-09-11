import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    //correo y contraseña definidos
    if (email === "felpudo@mail.com" && password === "16-12-2000") {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Iniciar sesion</h2>
        <input
          type="email"
          placeholder="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />
        <div className="mt-4">
          <p className="text-sm text-gray-600 font-bold">
            Correo definido: felpudo@mail.com
          </p>
          <p className="text-sm text-gray-600 font-bold">
            Contraseña definida: 16-12-2000
          </p>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Iniciar sesión
        </button>
        <button className="w-full bg-gray-500 text-white py-2 mt-2 rounded hover:bg-green-600">
          <Link to="/">Ir al Inicio</Link>
        </button>
        {isLoggedIn && (
          <Link to="/checkout">
            <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600">
              Ir al Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Login;
