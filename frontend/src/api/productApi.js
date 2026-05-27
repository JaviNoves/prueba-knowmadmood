import { cache } from './cache';
import { BASE_URL } from '../constants';

async function request(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  return response.json();
}

/**
 * GET /api/product
 */
export async function getProducts() {
  const key = 'products';
  const elementoCacheado = cache.get(key);
  if (elementoCacheado) return elementoCacheado;

  // Si no está en el cache, se llama a la API y se guarda en el cache.
  const products = await request('/api/product');
  cache.set(key, products);
  return products;
}

/**
 * GET /api/product/:id
 */
export async function getProductById(id) {
  const key = `product:${id}`;
  const elementoCacheado = cache.get(key);
  if (elementoCacheado) return elementoCacheado;

  // Si no está en el cache, se llama a la API y se guarda en el cache.
  const product = await request(`/api/product/${id}`);
  cache.set(key, product);
  return product;
}

/**
 * POST /api/cart
 */
export async function addToCart({ id, colorCode, storageCode }) {
  return request('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode }),
  });
}
