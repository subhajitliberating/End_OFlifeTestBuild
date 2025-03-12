import React from 'react';

const UnderConstruction = () => {
  return (
    <div className="under-construction-page d-flex align-items-center justify-content-center vh-100 text-center">
      <div className="container">
        <div className="construction-icon mb-4">
          {/* <img
            src="https://img.icons8.com/ios-filled/100/000000/construction.png"
            alt="Under Construction"
            className="img-fluid"
          /> */}
        </div>
        <h1 className="display-4 fw-bold mb-3 " style={{
          fontFamily:'"Cormorant Garamond"'
        }}>Under Construction</h1>
        <p className="lead mb-4">
          We're currently working on this page. Please check back soon!
        </p>
        <div className="social-links">
          <a
            href="#"
            className="text-dark me-3"
            title="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="text-dark me-3"
            title="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-dark me-3"
            title="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="text-dark"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;