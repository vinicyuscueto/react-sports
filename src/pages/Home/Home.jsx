import React from 'react';
import AppLayout from '../../utils/AppLayout';
import { useNavigate } from 'react-router-dom';
import Deals from "../../components/Deals/Deals";
import Sales from "../../components/Sales/Sales";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <AppLayout>
      <div className="home">
        <div className="container">
          <h2>Produtos esportivos para você!</h2>
          <p>Conheça nosso estoque especial agora mesmo!</p>
          <button className="home__button" onClick={handleNavigate}>
            Ver Produtos
          </button>
        </div>
      </div>
      <Deals />
      <Sales />
    </AppLayout>
  );
};

export default Home;
