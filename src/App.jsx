import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { ShoppingProvider } from './contexts/ShoppingContext';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import Shopping from './pages/Shopping/Shopping';
import PublicRoutes from './utils/PublicRoutes';
import PrivateRoutes from './utils/PrivateRoutes';
import TopScroll from './utils/TopScroll';

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <ShoppingProvider>
          <Router>
            <TopScroll/>
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              <Route element={<PrivateRoutes />}>
                <Route path="/shopping" element={<Shopping />} />
              </Route>

              <Route path="/product" element={<Product />} />
              <Route path="/products" element={<Products />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
              
            </Routes>
          </Router>
        </ShoppingProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
