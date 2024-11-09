import React, { createContext, useEffect, useState } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/react-sports/products.json');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, error }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductProvider, ProductContext };
