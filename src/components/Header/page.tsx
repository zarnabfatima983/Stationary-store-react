import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
}

const Header = ({ title, subtitle, showButton = false }: HeaderProps) => {
  return (
    <header className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {showButton && (
        <Link to="/services" className="btn">
          Shop Now
        </Link>
      )}
    </header>
  );
};

export default Header;
