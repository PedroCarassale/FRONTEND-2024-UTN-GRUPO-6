import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para el mensaje de error
  const [registerFormData, setRegisterFormData] = useState({
    nombre: "",
    apellido: "",
    nombre_usuario: "",
    dni: "",
    correo: "",
    clave: "",
    rol_id: 1,
  });
  const [loginFormData, setLoginFormData] = useState({
    correo: "",
    clave: "",
  });

  const navigate = useNavigate();

  const handleSwitchMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setErrorMessage(""); // Reinicia el mensaje de error al cambiar de modo
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas. Intenta de nuevo.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Usuario creado:", data);

      navigate("/");
    } catch (error: unknown) {
      console.error("Error:", error);

      if (error instanceof Error) {
        setErrorMessage(error.message); // Accede al mensaje del error de forma segura
      } else {
        setErrorMessage("Ocurrió un error inesperado");
      }
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
      });

      if (!response.ok) {
        throw new Error("Error en la creación de la cuenta");
      }

      const data = await response.json();
      console.log("Usuario creado:", data);

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Ocurrió un error al registrar el usuario.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isLoginMode) {
      setLoginFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setRegisterFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{isLoginMode ? "Iniciar Sesión" : "Registro de Usuario"}</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {isLoginMode ? (
          <form onSubmit={handleLoginSubmit} className="login-form">
            <input
              type="email"
              name="correo"
              value={loginFormData.correo}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              required
            />
            <input
              type="password"
              name="clave"
              value={loginFormData.clave}
              placeholder="Contraseña"
              onChange={handleInputChange}
              required
            />
            <button type="submit">Ingresar</button>
            <p>
              ¿Nuevo en la plataforma?{" "}
              <span onClick={handleSwitchMode} className="switch-mode-link">
                Regístrate aquí
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="register-form">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={registerFormData.nombre}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={registerFormData.apellido}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="nombre_usuario"
              placeholder="Nombre de usuario"
              value={registerFormData.nombre_usuario}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={registerFormData.dni}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={registerFormData.correo}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="clave"
              placeholder="Contraseña"
              value={registerFormData.clave}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Crear Cuenta</button>
            <p>
              ¿Ya tienes cuenta?{" "}
              <span onClick={handleSwitchMode} className="switch-mode-link">
                Inicia sesión aquí
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
