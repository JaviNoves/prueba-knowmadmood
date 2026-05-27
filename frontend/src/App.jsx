import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <>
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<ProductListPage />} />
        </Routes>
      </main>
    </>
  );
}
