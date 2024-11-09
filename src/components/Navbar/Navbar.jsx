import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { session, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const checkWindowSize = () => {
    if (window.innerWidth > 860) {
      setIsActive(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    window.addEventListener('resize', checkWindowSize);
    checkWindowSize();

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="navbar__content">
            <div className="nav__logo" onClick={() => { setIsActive(false); navigate("/"); }}>Sports</div>
            <form className="search" onSubmit={handleSearch}>
              <input
                className="search__input"
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={() => setIsActive(false)}
              />
              <button type="submit">
                <i className='bx bx-search'></i>
              </button>
            </form>
            <nav className="nav__links">
              {!session ? (
                <>
                  <Link to="/signin">
                    <span>Acessar</span>
                  </Link>
                  <Link to="/signup">
                    <span>Cadastre-se</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/shopping">
                    <span>Meu Carrinho</span>
                  </Link>
                  <Link to="/" onClick={logout}>
                    <span>Sair</span>
                  </Link>
                </>
              )}
            </nav>
            <div className="nav__icon" onClick={() => setIsActive(!isActive)}>
              <i className="bx bx-menu"></i>
            </div>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="nav__overlay" onClick={() => setIsActive(false)}></div>
      )}

      <aside className={`sidebar ${isActive ? "active" : ""}`}>
        <nav className="sidebar__links">
          {!session ? (
            <>
              <Link to="/signin" onClick={() => setIsActive(false)}>
                <i className='bx bx-user-circle'></i>
                <span>Acesso</span>
              </Link>
              <Link to="/signup" onClick={() => setIsActive(false)}>
                <i className='bx bx-user-plus'></i>
                <span>Cadastro</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/shopping" onClick={() => setIsActive(false)}>
                <i className='bx bx-cart'></i>
                <span>Meu Carrinho</span>
              </Link>
              <Link to="/" onClick={() => { setIsActive(false); logout(); }}>
                <i className='bx bx-log-out'></i>
                <span>Sair</span>
              </Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Navbar;