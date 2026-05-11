import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <nav className="flex flex-wrap justify-between items-center px-6 py-4 bg-primary dark:bg-gray-900 text-white gap-3">
      <div className="text-lg font-bold">📄 Stationery Shop</div>

      <ul className="flex flex-wrap list-none gap-4">
        <li><Link to="/" className="text-white font-bold hover:text-secondary transition-colors">Home</Link></li>
        <li><Link to="/services" className="text-white font-bold hover:text-secondary transition-colors">Products</Link></li>
        <li><Link to="/login" className="text-white font-bold hover:text-secondary transition-colors">Login</Link></li>
        <li><Link to="/signup" className="text-white font-bold hover:text-secondary transition-colors">Signup</Link></li>
        <li><Link to="/dashboard" className="text-white font-bold hover:text-secondary transition-colors">Dashboard</Link></li>
        <li><Link to="/contact" className="text-white font-bold hover:text-secondary transition-colors">Contact</Link></li>
      </ul>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyUp={handleSearch}
          className="px-3 py-1.5 rounded-lg border-none text-sm text-gray-800 focus:outline-none"
        />
        <button
          onClick={toggleTheme}
          className="bg-transparent border-2 border-white text-white px-3 py-1.5 rounded-lg text-sm cursor-pointer hover:bg-white hover:text-primary transition-colors"
        >
          🌙
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
