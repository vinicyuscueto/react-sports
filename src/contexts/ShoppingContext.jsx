import React, { createContext, useReducer } from "react";

const ShoppingContext = createContext();

const initialState = {
    cart: JSON.parse(localStorage.getItem("sports-cart")) || [],
};

const actionTypes = {
    UPDATE_CART: 'UPDATE_CART',
    REMOVE_CART: 'REMOVE_CART',
    CLEAR_CART: 'CLEAR_CART',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CART:
            localStorage.setItem("sports-cart", JSON.stringify(action.payload));
            return { ...state, cart: action.payload };

        case actionTypes.REMOVE_CART:
            const { email, products } = action.payload;
            const updatedCart = state.cart.map(item => {
                if (item.email === email) {
                    if (item.products[products]) {
                        item.products[products].quantity -= 1;
                        if (item.products[products].quantity === 0) {
                            delete item.products[products];
                        }
                    }
                    return { ...item, products: { ...item.products } };
                }
                return item;
            }).filter(item => Object.keys(item.products).length > 0);
            localStorage.setItem("sports-cart", JSON.stringify(updatedCart));
            return { ...state, cart: updatedCart };

        case actionTypes.CLEAR_CART:
            const filteredCart = state.cart.filter(item => item.email !== action.payload.email);
            localStorage.setItem("sports-cart", JSON.stringify(filteredCart));
            return { ...state, cart: filteredCart };

        default:
            return state;
    }
};

const ShoppingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addCart = (products, email) => {
        const existingUser = state.cart.find(item => item.email === email);
        let updatedCart;

        if (existingUser) {
            if (existingUser.products[products]) {
                existingUser.products[products].quantity += 1;
            } else {
                existingUser.products[products] = { id: products, quantity: 1 };
            }
            updatedCart = [...state.cart];
        } else {
            const newCartItem = { email, products: { [products]: { id: products, quantity: 1 } } };
            updatedCart = [...state.cart, newCartItem];
        }

        dispatch({ type: actionTypes.UPDATE_CART, payload: updatedCart });
        return true;
    };

    const removeCart = (payload) => {
        dispatch({ type: actionTypes.REMOVE_CART, payload });
    };

    const clearCart = (payload) => {
        dispatch({ type: actionTypes.CLEAR_CART, payload });
    };

    return (
        <ShoppingContext.Provider
            value={{
                addCart,
                removeCart,
                clearCart,
                cart: state.cart,
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
};

export { ShoppingProvider, ShoppingContext };
