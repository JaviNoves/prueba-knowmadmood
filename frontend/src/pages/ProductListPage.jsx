import { useMemo, useState } from 'react';
import { getProducts } from '../api/productApi';
import { useAsync } from '../hooks/useAsync';
import SearchBar from '../components/SearchBar';
import ProductItem from '../components/ProductItem';
import { Loader, ErrorMessage, EmptyState } from '../components/Status';
import './ProductListPage.css';

/**
 * Decide si un producto coincide con lo que el usuario ha escrito en el buscador.
 */
function matches(product, query) {
  const term = query.trim().toLowerCase();
  if (!term) return true;
  return (
    product.brand?.toLowerCase().includes(term) ||
    product.model?.toLowerCase().includes(term)
  );
}

export default function ProductListPage() {
  // Texto buscador
  const [query, setQuery] = useState('');

  const { data: products, loading, error } = useAsync(getProducts, []);

  const productosFiltrados = useMemo(
    () => (products ?? []).filter((product) => matches(product, query)),
    [products, query],
  );

  return (
    <div className="plp">
      <div className="plp__toolbar">
        <h1 className="plp__heading">Products</h1>
        <SearchBar value={query} onChange={setQuery} resultCount={productosFiltrados.length} />
      </div>

      {loading && <Loader label="Cargando productos..." />}
      {error && <ErrorMessage message="No se pudieron cargar los productos." />}

      {!loading && !error && productosFiltrados.length === 0 && (
        <EmptyState message="Ningún producto coincide con tu busqueda." />
      )}

      {!loading && !error && productosFiltrados.length > 0 && (
        <ul className="plp__grid">
          {productosFiltrados.map((product) => (
            <li key={product.id}>
              <ProductItem product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
