import React from 'react';
import ProductForm from '../components/ProductForm';

const ManageProduct = ({ onAddProduct }) => {
  return (
    <div className="container mt-5">
      <h1>Registrar Producto</h1>
      <ProductForm onSubmit={onAddProduct} />
    </div>
  );
};

export default ManageProduct;
