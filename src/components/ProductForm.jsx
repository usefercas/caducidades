import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [productCode, setProductCode] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      productName,
      expirationDate,
      productCode,
    };

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(storedProducts));

    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      navigate('/');
    }, 3000); // Duración del confeti antes de redirigir
  };

  return (
    <div className="container mt-4">
      {showConfetti && <Confetti origin={{ x: window.innerWidth / 2, y: window.innerHeight - 50 }} />} {/* Confeti desde abajo */}
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
                type="number"
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
