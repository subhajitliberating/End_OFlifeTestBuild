import React from "react";
import "./style.css"
const PayAndFinalize = ({ formData }) => {
  return (
    <div className="pay-container">
      <h3 className="text-center select-type">Review and Confirm Your Listing</h3>
      <p className="select-type-para text-center">
        Provide the information families need to find your business.
      </p>
      <hr />

      {/* Business Details Section */}
      <div className="pay-text-center">
        {formData.logo && (
          <img
            src={URL.createObjectURL(formData.logo)}
            alt="Business Logo"
            className="logo-img"
          />
        )}
        <h3 className="prv-b-name">{formData.business_name}</h3>
        <p className="prv-b-address">
         <span> {formData.business_type}</span> in the county of <span> {formData.county}</span>
        </p>
        <p className="pay-location">{formData.location_details}</p>
     <div className="pay-row my-5">
     <p className="pay-location">
          <strong>+</strong> {formData.phone}
        </p>
        <p className="pay-location">
          <strong></strong> {formData.website}
        </p>
        <p className="pay-location">
          <strong></strong> {formData.email}
        </p>
     </div>
      </div>

      {/* Information Section */}
      <div className="pay-info-section">
        <h4 className="text-center info-he">Information</h4>
        <div
            className="border p-3"
            dangerouslySetInnerHTML={{ __html: formData.information }} // Display content as HTML
          />
      </div>

      {/* Pricing Details */}
      <div className="pay-pricing-section">
        <h4 className="text-center price_de my-4">Pricing Details</h4>
        <p className="py-price-para">
        <span className="btw"> Service Listing Fee:</span>  <span className="btw">  €{formData.payment} </span>
        </p>
        <p className="py-price-para">
        <span className="btw"> Taxes (No VAT Included):</span>   <span className="btw"> €0</span>
        </p>
        
        <p className=" py-price-paramy-3 ">
        <span className="btw"> Total:</span>   <span className="btw"> €{formData.payment}</span>
        </p>
      </div>

      {/* Payment Button */}
   
    </div>
  );
};

export default PayAndFinalize;
