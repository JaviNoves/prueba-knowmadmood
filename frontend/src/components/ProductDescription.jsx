import { formatPrice } from '../utils/format';
import './ProductDescription.css';

// Lo que devuelve el API
const SPECS = [
  { key: 'brand', label: 'Brand' },
  { key: 'model', label: 'Model' },
  { key: 'price', label: 'Price', format: formatPrice },
  { key: 'cpu', label: 'CPU' },
  { key: 'ram', label: 'RAM' },
  { key: 'os', label: 'Operating system' },
  { key: 'displayResolution', label: 'Screen resolution' },
  { key: 'battery', label: 'Battery' },
  { key: 'primaryCamera', label: 'Cameras' },
  { key: 'dimentions', label: 'Dimensions' },
  { key: 'weight', label: 'Weight', format: (value) => (value ? `${value} g` : value) },
];

/**
 * Decide como se muestra cada valor
 */
function renderValue(value, format) {
  const normalized = Array.isArray(value) ? value.join(', ') : value;
  if (normalized === null || normalized === undefined || normalized === '') return '—';
  return format ? format(normalized) : normalized;
}

export default function ProductDescription({ product }) {
  return (
    <section className="description" aria-label="Product description">
      <h1 className="description__title">
        {product.brand} {product.model}
      </h1>
      <dl className="description__list">
        {SPECS.map(({ key, label, format }) => (
          <div className="description__row" key={key}>
            <dt>{label}</dt>
            <dd>{renderValue(product[key], format)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
