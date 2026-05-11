import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">📄 Stationery Shop</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Products</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-right">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyUp={handleSearch}
        />
        <button onClick={toggleTheme}>🌙</button>
      </div>
    </nav>
  );
};

export default Navbar;
