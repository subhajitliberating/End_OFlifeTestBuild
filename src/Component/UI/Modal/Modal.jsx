// Modal.js
import React from "react";
import './style.css'; // Add custom styles here

const Modal = ({ show, onConfirm, onCancel, message,setotp }) => {
  if (!show) return null;

  return (
    <div className="cus-modal-overlay">
    <div className="cus-modal glass"> {/* Add 'glass' or 'dark' class for variations */}
      <button onClick={onCancel} className="cus-modal-close-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      
      <div className="cus-modal-header">
      {!message &&   <h2 className="cus-modal-title">Enter Otp</h2>}
      </div>
      
      <div className="cus-modal-content">
        {!message ? <input type="number" maxLength={6} className="form-control" placeholder="Enter OTP"style={{ appearance: "textfield" }}
        onChange={(e)=>setotp(e.target.value)}
        /> : <p>{message}</p>}
      </div>
      
      <div className="cus-modal-actions">
        <button onClick={onCancel} className="secondary-button">Cancel</button>
        <button onClick={onConfirm} className="primary-button">Confirm</button>
      </div>
    </div>
  </div>
  );
};

export default Modal;

