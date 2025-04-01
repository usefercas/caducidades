import React, { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);

  // Cargar productos desde localStorage al iniciar
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  // Agregar un producto
  const handleAddProduct = (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts); // Actualiza el estado de productos

    // Guardar los productos en localStorage
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  // Eliminar un producto
  const handleDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts); // Actualiza el estado de productos

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="container mt-5">
      <h1>Productos Registrados</h1>
      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <ul className="list-group">
          {products.map((product) => (
            <li key={product.id} className="list-group-item">
              {product.productName} - Expira el {product.expirationDate}
              <button
                className="btn btn-danger btn-sm ms-3"
                onClick={() => handleDelete(product.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Agregar producto de prueba */}
      <button
        className="btn btn-success mt-3"
        onClick={() => handleAddProduct({
          id: Date.now(),
          productName: 'Producto de prueba',
          expirationDate: '2025-12-31',
        })}
      >
        Agregar Producto de Prueba
      </button>
    </div>
  );
};

export default Home;
