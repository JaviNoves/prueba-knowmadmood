import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Se ejecuta en los tests. Limipia componentes renderizados y datos guardados en cadas test.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
