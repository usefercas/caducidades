import React, { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    generateNotifications(storedProducts);
  }, []);

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    generateNotifications(updatedProducts);
  };

  const calculateDaysToExpire = (expirationDate) => {
    const currentDate = new Date();
    const expiryDate = new Date(expirationDate);
    currentDate.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);
    const timeDifference = expiryDate - currentDate;
    return Math.floor(timeDifference / (1000 * 3600 * 24));
  };

  const generateNotifications = (storedProducts) => {
    const newNotifications = storedProducts.filter(product => {
      const daysToExpire = calculateDaysToExpire(product.expirationDate);
      return daysToExpire <= 1; 
    }).map(product => {
      const daysToExpire = calculateDaysToExpire(product.expirationDate);
      let message;
      if (daysToExpire === 0) {
        message = `⚠️ El producto ${product.productName} caduca hoy (${product.expirationDate}).`;
      } else if (daysToExpire === 1) {
        message = `⚠️ El producto ${product.productName} caduca mañana (${product.expirationDate}).`;
      } else {
        message = `⚠️ El producto ${product.productName} ya ha caducado (Caducó el ${product.expirationDate}).`;
      }
      return {
        id: product.id,
        message,
      };
    });

    setNotifications(newNotifications);
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center">Productos Registrados</h1>
      {products.length === 0 ? (
        <p className="text-center">No hay productos registrados.</p>
      ) : (
        <ul className="list-group">
          {products.map((product) => {
            const daysToExpire = calculateDaysToExpire(product.expirationDate);
            const isExpiringSoon = daysToExpire <= 30;
            const productClass = isExpiringSoon ? 'list-group-item-danger' : '';
            return (
              <li
                key={product.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${productClass}`}
              >
                <div className="d-flex flex-column flex-md-row w-100">
                  <span className="flex-grow-1">{product.productName} - Expira el {product.expirationDate} - Código: {product.productCode}</span>
                  <button
                    className="btn btn-danger btn-sm ms-2 mt-2 mt-md-0"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <hr />

      <h2 className="text-center">Notificaciones</h2>
      {notifications.length === 0 ? (
        <p className="text-center">✅ No hay productos caducados o por caducar hoy o mañana.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="list-group-item list-group-item-warning"
            >
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
