import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

function useBreadcrumbs() {
  const location = useLocation();
  const crumbs = [{ label: 'Products', to: '/' }];

  if (location.pathname.startsWith('/product/')) {
    crumbs.push({ label: 'Detail', to: location.pathname });
  }
  return crumbs;
}

export default function Header() {
  const { count } = useCart();
  const crumbs = useBreadcrumbs();

  return (
    <header className="header">
      <Link to="/" className="header__brand" aria-label="Go to product list">
        Mobile<span>Shop</span>
      </Link>

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {crumbs.map((crumb, index) => (
          <span key={crumb.to} className="breadcrumbs__item">
            {index > 0 && <span className="breadcrumbs__sep">/</span>}
            {index === crumbs.length - 1 ? (
              <span aria-current="page">{crumb.label}</span>
            ) : (
              <Link to={crumb.to}>{crumb.label}</Link>
            )}
          </span>
        ))}
      </nav>

      <div className="header__cart" aria-label={`Items in cart: ${count}`}>
        <span className="header__cart-icon" aria-hidden="true">🛒</span>
        <span className="header__cart-count">{count}</span>
      </div>
    </header>
  );
}
