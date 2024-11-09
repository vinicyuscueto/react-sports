import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';
import './Sales.css';

const Sales = () => {
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => product.hot === false);

  const handleProduct = (product) => {
    navigate(`/product?id=${encodeURIComponent(product.id)}`);
  };

  return (
    <div className="layout">
      <div className="sales__content">
        <h2 className="sales__title">Produtos em destaque</h2>
        <div className="sales__grid">
          {filteredProducts.map(product => (
            <div className="sales__item" key={product.id} onClick={() => handleProduct(product)}>
              <img className="sales__item-image" src={product.image} alt={product.name} />
              <div className="sales__item-body">
                <span>Em destaque</span>
                <h3 className="sales__item-name">{product.name}</h3>
                <h4 className="sales__item-price">R$ {product.price}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sales;
