# Mobile Shop

Pequeña SPA de e-commerce para ver y comprar móviles.
Tiene dos vistas: el listado de productos (PLP) y el detalle de un producto (PDP).

## Stack

React 18 con React Router 6 para el enrutado. El bundler y el dev server son Vite,
los tests van con Vitest y Testing Library, y el lint con ESLint. Todo en JavaScript (ES6).

## Cómo arrancarlo

```bash
npm install
npm start
```

Se abre en http://localhost:3000. La API apunta a `https://itx-frontend-test.onrender.com`;

## Scripts

- `npm start`: modo desarrollo en el puerto 3000.
- `npm run build`: build en `dist/`.
- `npm run preview`: sirve el build ya generado.
- `npm test`: lanza los tests una vez. `npm run test:watch` los deja en modo observador.
- `npm run lint`: pasa ESLint a los `.js` y `.jsx`.

## Qué hace

En el listado se ven los móviles y se pueden filtrar en tiempo real por marca o
modelo. Al entrar en un producto se ve la imagen, la ficha técnica (marca, modelo, precio, CPU,
RAM, sistema operativo, resolución, batería, cámaras, dimensiones y peso) y los selectores de
color y almacenamiento, con la primera opción marcada por defecto, más el botón de añadir al
carrito.

La cabecera está en todas las vistas: el logo lleva al inicio, y tiene un carrito con un contador 
que viene de la respuesta de `POST /api/cart` y se guarda en localStorage.

Las respuestas GET de la API se cachean en localStorage durante una hora (`src/api/cache.js`).
Cuando una entrada caduca, la siguiente petición vuelve a pedir los datos.

## Organización del código

- `api/`: peticiones a la API y la caché.
- `context/`: estado del carrito.
- `hooks/`: carga asíncrona.
- `components/`: componentes de presentación, cada uno con su CSS.
- `pages/`: las dos vistas.
- `constants.js`: configuración y claves centralizadas (URL de la API, prefijos de caché, etc.).

