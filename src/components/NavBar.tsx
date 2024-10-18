import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navbar.css'

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
        <img className="logo" src="/Logo-DDS-Circular.png" alt="Logo" />
        </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Gimnasios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Eventos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Reseñas
              </a>
            </li>
          </ul>

        {/* Botón para mostrar/ocultar el menú en dispositivos móviles */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Buscador */}
          <form className="d-flex ms-auto">
            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>

          {/*Mostrar botón de login*/} 
            <a className="btn btn-outline-light ms-3" href="/login">
              Iniciar sesión
            </a>

          {/*Icono de user + dropdown según si está logueado */}
            {/*<div className="dropdown ms-3">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>
              </button>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
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
                  <a className="dropdown-item" href="#" onClick={logout}>
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>*/}
        </div>
      </div>
    </nav>
  );
}

