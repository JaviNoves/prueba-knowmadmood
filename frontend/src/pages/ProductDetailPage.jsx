import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import { useAsync } from '../hooks/useAsync';
import ProductImage from '../components/ProductImage';
import ProductDescription from '../components/ProductDescription';
import ProductActions from '../components/ProductActions';
import { Loader, ErrorMessage } from '../components/Status';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, loading, error } = useAsync(getProductById, [id]);

  return (
    <div className="pdp">
      <Link to="/" className="pdp__back">
        ← Back to products
      </Link>

      {loading && <Loader label="Cargando producto..." />}
      {error && <ErrorMessage message="No se pudo cargar el producto." />}

      {!loading && !error && product && (
        <div className="pdp__content">
          <div className="pdp__image-col">
            <ProductImage product={product} />
          </div>
          <div className="pdp__info-col">
            <ProductDescription product={product} />
            <ProductActions product={product} />
          </div>
        </div>
      )}
    </div>
  );
}
