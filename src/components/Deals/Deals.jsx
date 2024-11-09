import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import './Deals.css';

const Deals = () => {
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => product.hot === true);

  const handleProduct = (product) => {
    navigate(`/product?id=${encodeURIComponent(product.id)}`);
  };

  return (
    <div className="layout">
      <div className="deals__content">
        <h2 className="deals__title">Produtos em destaque</h2>
        <div className="deals__grid">
          {filteredProducts.map(product => (
            <div className="deals__item" key={product.id} onClick={() => handleProduct(product)}>
              <img className="deals__item-image" src={product.image} alt={product.name} />
              <div className="deals__item-body">
                <span>Em destaque</span>
                <h3 className="deals__item-name">{product.name}</h3>
                <h4 className="deals__item-price">R$ {product.price}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
