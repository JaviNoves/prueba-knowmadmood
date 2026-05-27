import { createContext, useContext, useEffect, useState } from 'react';
import { addToCart as addToCartApi } from '../api/productApi';
import { CART_COUNT_KEY } from '../constants';

const CartContext = createContext(null);

/**
 * Lee el contador del carrito desde localStorage.
 */
function readPersistedCount() {
  const stored = Number(localStorage.getItem(CART_COUNT_KEY));
  return Number.isFinite(stored) && stored > 0 ? stored : 0;
}

export function CartProvider({ children }) {
  const [count, setCount] = useState(readPersistedCount);

  useEffect(() => {
    localStorage.setItem(CART_COUNT_KEY, String(count));
  }, [count]);

  // Suma al contador la cantidad que devuelve el servidor en el POST.
  const addItem = async ({ id, colorCode, storageCode }) => {
    const response = await addToCartApi({ id, colorCode, storageCode });
    if (response && typeof response.count === 'number') {
      setCount((prev) => prev + response.count);
    }
    return response;
  };

  return (
    <CartContext.Provider value={{ count, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

// Para en vez de usar useContext(CartContext) -> useCart()
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart se debe de usar dentro de un CartProvider');
  }
  return context;
}
