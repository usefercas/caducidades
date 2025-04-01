import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [productCode, setProductCode] = useState('');  // Nuevo estado para el código del producto
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creamos un id único para el producto
    const newProduct = {
      id: Date.now(), // Usamos el timestamp como id único
      productName,
      expirationDate,
      productCode,  // Incluimos el código del producto
    };

    // Obtenemos los productos actuales del localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    
    // Agregamos el nuevo producto a la lista
    storedProducts.push(newProduct);

    // Guardamos la lista actualizada en localStorage
    localStorage.setItem('products', JSON.stringify(storedProducts));

    // Redirigimos a la página de inicio
    navigate('/');
  };

  return (
    <div className="container mt-4"> {/* Cambié la clase mt-5 por mt-4 para acercar más el formulario */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="text-center mb-4">Bienvenido al Registro de Productos</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Nombre del Producto</label>
              <input
                type="text"
                id="productName"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expirationDate" className="form-label">Fecha de Expiración</label>
              <input
                type="date"
                id="expirationDate"
                className="form-control"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productCode" className="form-label">Código del Producto</label>
              <input
                type="number"  // Puedes usar "text" si deseas permitir caracteres no solo números
                id="productCode"
                className="form-control"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Registrar Producto</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
