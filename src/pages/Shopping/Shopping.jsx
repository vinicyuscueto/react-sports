import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ShoppingContext } from '../../contexts/ShoppingContext';
import { ProductContext } from '../../contexts/ProductContext';
import AppLayout from '../../utils/AppLayout';
import Popup from '../../components/Popup/Popup';
import './Shopping.css';

const Shopping = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const { session } = useContext(AuthContext);
    const { cart, removeCart, clearCart } = useContext(ShoppingContext);
    const { products } = useContext(ProductContext);

    const userCart = cart.find(item => item.email === session?.email);

    const handleProduct = (productId) => {
        navigate(`/product?id=${encodeURIComponent(productId)}`);
    };

    const handleRemoveItem = (productId) => {
        removeCart({ email: session.email, products: productId });
    };

    const handleClearCart = () => {
        setShowPopup(true);
        clearCart({ email: session.email });
    };

    return (
        <AppLayout>
            <div className="shopping">
                <div className="container">
                    <Popup show={showPopup} redirect={() => navigate("/")} type="purchase" />
                    <h2 className="shopping__title">Meu carrinho</h2>
                    {userCart && Object.keys(userCart.products).length > 0 ? (
                        <>
                            <div className="shopping__list">
                                {Object.keys(userCart.products).map((productId) => {
                                    const cartData = userCart.products[productId];
                                    const product = products.find(p => p.id === productId);
                                    return product ? (
                                        <div className="shopping__item" key={product.id} onClick={() => handleProduct(product.id)}>
                                            <button
                                                className="shopping__remove-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveItem(product.id);
                                                }}
                                            >
                                                <i className='bx bx-x'></i>
                                            </button>
                                            <img
                                                className="shopping__item-image"
                                                src={product.image}
                                                alt={product.name}
                                            />
                                            <div className="shopping__item-body">
                                                <span className="shopping__item-quantity">Quantidade: {cartData.quantity}</span>
                                                <h3 className="shopping__item-name">{product.name}</h3>
                                                <h4 className="shopping__item-price">R$ {product.price}</h4>
                                            </div>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                            <button className="shopping__button" onClick={handleClearCart}>Finalizar Compra</button>
                        </>
                    ) : (
                        <p>Seu carrinho está vazio.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Shopping;
