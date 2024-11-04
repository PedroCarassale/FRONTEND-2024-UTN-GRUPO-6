import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./Login.css";

const Login: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    nombre_usuario: "",
    dni: "",
    correo: "",
    clave: "",
    rol_id: 1, // Asignar rol_id por defecto
  });

  const navigate = useNavigate(); // Crea una instancia de navigate

  const handleSwitchMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar los datos de login
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en la creación de la cuenta");
      }

      const data = await response.json();
      console.log("Usuario creado:", data);

      // Redirige al usuario a la página de login
      navigate("/login"); // Ajusta la ruta según tu configuración

      // Opcional: mostrar un mensaje de éxito
      // Puedes agregar un estado para manejar mensajes de éxito o notificaciones
    } catch (error) {
      console.error("Error:", error);
      // Manejo de errores (por ejemplo, mostrar un mensaje en la UI)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{isLoginMode ? "Iniciar Sesión" : "Registro de Usuario"}</h1>

        {isLoginMode ? (
          <form onSubmit={handleLoginSubmit} className="login-form">
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
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
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="nombre_usuario"
              placeholder="Nombre de usuario"
              value={formData.nombre_usuario}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={formData.dni}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="clave"
              placeholder="Contraseña"
              value={formData.clave}
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
