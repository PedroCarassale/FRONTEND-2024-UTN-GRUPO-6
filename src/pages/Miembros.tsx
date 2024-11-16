import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { backendUrl } from "../config";
import "./Miembros.css";

function Miembros() {
  type Usuario = {
    id: number;
    dni: string;
    nombre: string;
    apellido: string;
    nombre_usuario: string;
    correo: string;
    rol_id: number;
  };

  const { id } = useParams<{ id: string }>(); // Aquí obtenemos el parámetro `id` de la URL
  const isSidebarOpen = window.location.href.includes("gimnasio");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${backendUrl}/usuarios`);
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          console.error("Error al obtener los usuarios");
        }
      } catch (error) {
        console.error("Error al hacer fetch de usuarios:", error);
      }
    };

    fetchUsuarios(); // Llama a la función para cargar los usuarios
  }, []);

  return (
    <section className="miembros">
      <div className="main">
        <h2>Lista de Miembros</h2>
        {usuarios.length > 0 ? (
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.dni}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.nombre_usuario}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.rol_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Cargando usuarios...</p>
        )}
      </div>
    </section>
  );
}

export default Miembros;
