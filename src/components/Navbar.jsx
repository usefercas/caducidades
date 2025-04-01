import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo en el lado izquierdo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/covac.png" alt="COVAC Logo" height="80" className="me-2" />
        </Link>
        
        {/* Título en el centro */}
        <div className="position-absolute start-50 translate-middle-x">
          <Link className="navbar-brand fw-bold text-white" to="/">Cepsa Remey</Link>
        </div>

        {/* Botón de hamburguesa */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manage-product">Crear producto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;