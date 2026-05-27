import { PRICE_LOCALE, DEFAULT_CURRENCY } from '../constants';

/**
 * Formatea un precio en la moneda indicada. Si no hay, devuelve "—".
 */
export function formatPrice(price, currency = DEFAULT_CURRENCY) {
  if (price === null || price === undefined || price === '') return '—';
  const amount = Number(price);
  if (Number.isNaN(amount)) return String(price);
  return new Intl.NumberFormat(PRICE_LOCALE, {
    style: 'currency',
    currency,
  }).format(amount);
}
