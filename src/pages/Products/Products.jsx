import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import AppLayout from '../../utils/AppLayout';
import NotFound from '../../components/NotFound/NotFound';
import './Products.css';

const Products = () => {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const getSearchTerm = () => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  };

  useEffect(() => {
    setSearchTerm(getSearchTerm());
  }, [location]);

  const normalizeString = (value) => {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const filteredProducts = products.filter(product =>
    normalizeString(product.name).includes(normalizeString(searchTerm))
  );

  const handleProduct = (product) => {
    navigate(`/product?id=${encodeURIComponent(product.id)}`);
  };

  if (filteredProducts.length === 0) {
    return (
      <NotFound />
    );
  }

  return (
    <AppLayout>
      <div className="layout">
        <div className="products">
          <div className="products__grid">
            {filteredProducts.map(product => (
              <div
                className="products__item"
                key={product.id}
                onClick={() => handleProduct(product)}
              >
                <img src={product.image} alt={product.name} />
                <div className="products__body">
                  {product.hot ? (
                    <span>Em destaque</span>
                  ) : (
                    <span>Novidade</span>
                  )}
                  <h3 className="products__name">{product.name}</h3>
                  <h4 className="products__price">R$ {product.price}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Products;
