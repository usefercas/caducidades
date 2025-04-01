import React from 'react';

const Products = ({ products }) => {
  return (
    <div className="container mt-5">
      <h1>Productos Registrados</h1>
      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <ul className="list-group">
          {products.map((product, index) => (
            <li key={index} className="list-group-item">
              {product.productName} - Expira el {product.expirationDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
