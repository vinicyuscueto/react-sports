import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import { ShoppingContext } from '../../contexts/ShoppingContext';
import { AuthContext } from '../../contexts/AuthContext';
import Deals from '../../components/Deals/Deals';
import Popup from '../../components/Popup/Popup';
import NotFound from '../../components/NotFound/NotFound';
import AppLayout from '../../utils/AppLayout';
import './Product.css';

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const { products } = useContext(ProductContext);
  const { session } = useContext(AuthContext);
  const { addCart } = useContext(ShoppingContext);

  const getProductId = () => {
    const params = new URLSearchParams(location.search);
    return params.get('id');
  };

  const productId = getProductId();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <NotFound />
    );
  }

  const handlePurchase = (e) => {
    e.preventDefault();
    if (session) {
      const res = addCart(productId, session?.email);

      if (res) {
        setShowPopup(true);
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <AppLayout>
      <div className="product">
        <div className="container">
          <Popup show={showPopup} redirect={() => navigate("/shopping")} type="cart" />
          <div className="product__grid">
            <img src={product.image} alt={product.name} className="product__grid-img" />
            <div className="product__info">
              <h2 className="product__info-title">{product.name}</h2>
              <h3 className="product__info-price">R$ {product.price}</h3>
              <p className="product__info-status">Em estoque</p>
              <button className="product__info-button" onClick={handlePurchase}>
                <i className='bx bx-cart product__info-button-icon' /> Adicionar no carrinho
              </button>
            </div>
          </div>
          <div className="product__description">
            <h2 className="product__description-title">Descrição</h2>
            <label className="product__description-text">{product.description}</label>
          </div>
        </div>
      </div>
      <Deals />
    </AppLayout>
  );
};

export default Product;
