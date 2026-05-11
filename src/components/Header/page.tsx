import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
}

const Header = ({ title, subtitle, showButton = false }: HeaderProps) => {
  return (
    <header className="text-center py-16 px-5 bg-gradient-to-br from-primary to-secondary text-white">
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-lg mb-4">{subtitle}</p>
      {showButton && (
        <Link
          to="/services"
          className="inline-block px-6 py-3 rounded-xl font-bold text-white bg-white/20 hover:bg-white/30 shadow-md hover:scale-105 hover:shadow-xl transition-transform text-sm"
        >
          Shop Now
        </Link>
      )}
    </header>
  );
};

export default Header;
