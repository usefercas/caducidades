import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Asegúrate de importar el Navbar
import Home from './pages/Home'; // Asegúrate de importar Home
import ProductForm from './components/ProductForm'; // Asegúrate de importar el Formulario

function App() {
  // Cargar productos desde localStorage al inicio
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  // Guardar productos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Función para agregar productos
  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
  };

  return (
    <div>
      {/* Colocamos el Navbar en todas las vistas */}
      <Navbar />
      <Routes>
        {/* Pasamos los productos como prop a Home */}
        <Route path="/" element={<Home products={products} />} />
        <Route path="/manage-product" element={<ProductForm onSubmit={handleAddProduct} />} />
      </Routes>
    </div>
  );
}

export default App;
