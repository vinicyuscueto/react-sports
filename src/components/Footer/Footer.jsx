import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__left">
            <span className="footer__text">Vinicyus Cueto - 2024</span>
          </div>
          <div className="footer__links">
            <a href="https://www.linkedin.com/in/vinicyuscueto/" className="footer__link">
              <i className="bx bxl-linkedin footer-icon"></i><span className="footer__link-text">LinkedIn</span>
            </a>
            <a href="https://github.com/vinicyuscueto/" className="footer__link">
              <i className="bx bxl-github footer-icon"></i><span className="footer__link-text">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer