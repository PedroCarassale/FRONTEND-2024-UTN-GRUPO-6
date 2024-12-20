import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";

export default function NavBar() {
  // Verificar si el usuario está logueado
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img className="logo" src="/Logo-DDS-Circular.png" alt="Logo" />
        </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link nav-link-rutinas" href="/rutinas">
              Rutinas
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link nav-link-entrenamiento"
              href="/entrenamiento"
            >
              Entrenamiento
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-gimnasios" href="/gimnasios">
              Gimnasios
            </a>
          </li>
        </ul>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Buscador */}
          <form className="d-flex ms-auto buscador">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
          </form>

          {/* Mostrar botón de Iniciar sesión solo si el usuario no está logueado */}
          {!isLoggedIn && (
            <a
              className="btn btn-outline-light ms-3 iniciar-sesion"
              href="/login"
            >
              Iniciar sesión
            </a>
          )}

          {/* Dropdown del usuario logueado */}
          {/* {isLoggedIn && (
            <div className="dropdown ms-3">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Cuenta
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Configuración
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload(); // Recargar para actualizar el estado de login
                    }}
                  >
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </nav>
  );
}
