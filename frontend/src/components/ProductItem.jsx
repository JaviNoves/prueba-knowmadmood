import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import './ProductItem.css';

export default function ProductItem({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-item">
      <div className="product-item__image">
        <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} loading="lazy" />
      </div>
      <div className="product-item__info">
        <span className="product-item__brand">{product.brand}</span>
        <span className="product-item__model">{product.model}</span>
        <span className="product-item__price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
