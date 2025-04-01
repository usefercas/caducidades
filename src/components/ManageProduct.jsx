import React, { useState } from "react";
import ProductForm from "../components/ProductForm";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="container mt-5">
      <h1>Registrar Producto</h1>
      <ProductForm onSubmit={handleAddProduct} />
      <h2 className="mt-5">Productos Registrados</h2>
      <ul className="list-group">
        {products.map((product, index) => (
          <li key={index} className="list-group-item">
            {product.productName} - Expira el {product.expirationDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProduct;
