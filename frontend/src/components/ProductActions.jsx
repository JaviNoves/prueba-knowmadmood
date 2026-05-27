import { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductActions.css';


function OptionSelector({ legend, options, selectedCode, onSelect }) {
  if (!options || options.length === 0) return null;
  return (
    <fieldset className="actions__group">
      <legend>{legend}</legend>
      <div className="actions__options">
        {options.map((option) => (
          <button
            type="button"
            key={option.code}
            className={`actions__option ${
              option.code === selectedCode ? 'actions__option--selected' : ''
            }`}
            aria-pressed={option.code === selectedCode}
            onClick={() => onSelect(option.code)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function ProductActions({ product }) {
  const { addItem } = useCart();
  const colors = useMemo(() => product.options?.colors ?? [], [product]);
  const storages = useMemo(() => product.options?.storages ?? [], [product]);

  // Por defecto, selecciona el primer color y almacenamiento disponible.
  const [colorCode, setColorCode] = useState(colors[0]?.code ?? null);
  const [storageCode, setStorageCode] = useState(storages[0]?.code ?? null);
  const [status, setStatus] = useState('idle'); // idle | adding | added | error

  const handleAdd = async () => {
    setStatus('adding');
    try {
      await addItem({ id: product.id, colorCode, storageCode });
      setStatus('added');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="actions" aria-label="Product actions">
      <OptionSelector
        legend="Storage"
        options={storages}
        selectedCode={storageCode}
        onSelect={setStorageCode}
      />
      <OptionSelector
        legend="Color"
        options={colors}
        selectedCode={colorCode}
        onSelect={setColorCode}
      />

      <button
        type="button"
        className="actions__add"
        onClick={handleAdd}
        disabled={status === 'adding'}
      >
        {status === 'adding' ? 'Añadiendo...' : 'Añadir al carrito'}
      </button>

      {status === 'added' && (
        <span className="actions__feedback" role="status">
          Añadido al carrito.
        </span>
      )}
      {status === 'error' && (
        <span className="actions__feedback actions__feedback--error" role="alert">
          No se pudo añadir al carrito.
        </span>
      )}
    </section>
  );
}
