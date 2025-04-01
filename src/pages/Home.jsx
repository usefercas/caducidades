import React, { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Cargar los productos desde localStorage al iniciar
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);

    // Generar las notificaciones para los productos que están por caducar
    generateNotifications(storedProducts);
  }, []);

  // Función para eliminar un producto usando su id único
  const handleDelete = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);  // Actualizamos el estado de productos
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Regeneramos las notificaciones después de eliminar un producto
    generateNotifications(updatedProducts);
  };

  // Función para calcular los días restantes hasta la caducidad
  const calculateDaysToExpire = (expirationDate) => {
    const currentDate = new Date();
    const expiryDate = new Date(expirationDate);
    const timeDifference = expiryDate - currentDate;
    return Math.ceil(timeDifference / (1000 * 3600 * 24)); // Devuelve los días restantes
  };

  // Función para generar notificaciones
  const generateNotifications = (storedProducts) => {
    const currentDate = new Date();
    const newNotifications = storedProducts.filter(product => {
      const daysToExpire = calculateDaysToExpire(product.expirationDate);
      const isExpiringTomorrow = daysToExpire === 1; // Producto expira mañana

      return isExpiringTomorrow;
    }).map(product => ({
      id: product.id,
      message: `El producto ${product.productName} está a punto de caducar mañana. Fecha de caducidad: ${product.expirationDate}.`,
    }));

    // Actualizamos las notificaciones en el estado y en localStorage
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
                <div className="d-flex flex-column flex-sm-row w-100">
                  <span className="flex-grow-1">{product.productName} - Expira el {product.expirationDate} - Código: {product.productCode}</span>
                  <button
                    className="btn btn-danger btn-sm ms-2 mt-2 mt-sm-0"
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

      {/* Mostrar las notificaciones */}
      <h2 className="text-center">Notificaciones</h2>
      {notifications.length === 0 ? (
        <p className="text-center">No hay productos por caducar pronto.</p>
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
