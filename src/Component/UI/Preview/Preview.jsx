import React from "react";
import { FaEye } from "react-icons/fa";
import './Preview.css'
const Preview = ({ previewData, onClose }) => {
  const { name, surname, item, price, content, images ,county } = previewData;

  return (
    <div className="preview-modal">
      <div className="modal-content-privew">
       
        <section className="acknowledgement a-privew">
        <button onClick={onClose}className="cus-modal-close-btn cus-close-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    
      <div className="container">
        <div className="box">
          <div className="top-panel">
            <h3 className="acknowledgement-title">{item}</h3>
            <div className="user-img">
             
            
            <div className="photo">

            {images && images.length > 0 ? (
      
            <img className="perimg" src={URL.createObjectURL(images[0])} alt="preview" /> 
        
        ) : (
          <div>No image available</div>
        )}
            
            </div>
         
         </div>
          </div>
          <div className="middle-panel">
            <h3 className="acknowledgement-title">{name}</h3>
            <p>{county}</p>
          </div>
          <div className="bottom-panel"  dangerouslySetInnerHTML={{ __html: content }}>
            {/* <p>{data.memoryTitle || 'Memories are a gift to treasure'}</p>
            <p>{data.memoryDescription || 'Ours of you will last forever'}</p>
            <p>{data.description}</p> */}
          </div>
        </div>
      </div>
    </section>

     

        {/* Add any other details you want to display */}
      </div>
    </div>
  );
};

export default Preview;
