import { Link, useLocation } from 'react-router-dom';

export default function Header({ collectionCount }) {
  const location = useLocation();

  return (
    <header className="header">
      <h1>🔥 Pokemon Collection App</h1>
      <p>Discover, collect, and organize your favorite Pokemon!</p>
      <nav>
        <Link className={`nav-button ${location.pathname === '/' ? 'active' : ''}`} to="/">🔍 Discover Pokemon</Link>
        <Link className={`nav-button ${location.pathname === '/collection' ? 'active' : ''}`} to="/collection">
          🌟 My Collection ({collectionCount})
        </Link>
      </nav>
    </header>
  );
}