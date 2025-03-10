import React from "react";
import { useState,useEffect } from "react";
 import { useRef } from "react";
 import Introduction from "./ServiceFormComponent/Introduction";
 import AddServiceDetails from "./ServiceFormComponent/AddServiceDetails";
 import PayAndFinalize from "./ServiceFormComponent/PayAndFinalize";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";
 import Modal from "../UI/Modal/Modal";
import './style.css'
const ServiceFrom = ({token}) => {


   const navigate =  useNavigate();
      const [MainData, setMainData] = useState({
          business_name: '',
          location_details: '',
          county: '',
          business_type: '',
          phone: '',
          website: '',
          email: '',
          logo: null,
          banner: null,
          information: "",
          payment:0
        });
  const [currentStep, setCurrentStep] = useState(1);
   const [isModel,setisModel]=useState(false)
     const [errorMessage,setErrorMessage] =useState()
     const [success, setSuccess] = useState(false);


     const requiredFields = [
      { key: 'logo', message: 'Upload the logo' },
      { key: 'business_name', message: 'Enter The Business Name' },
      { key: 'business_type', message: 'Enter the Business Type' },
      { key: 'county', message: 'Select the County' },
      { key: 'email', message: 'Enter your Email' },
      { key: 'location_details', message: 'Enter Location Details' },
      { key: 'phone', message: 'Enter the Phone Number' }
    ];



    const fetchPrice = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}service/price`, {
          headers: { Authorization: `Bearer ${token}` }
        });
   
        setMainData((prevMainData) => ({
          ...prevMainData,
          payment: response.data.price[0].price
        }));
        
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };


    useEffect(()=>{
      fetchPrice()
    },[])

  const handleNextStep = () => {
    if(currentStep === 1){
      setCurrentStep(currentStep + 1);
      return
    }

    if(currentStep === 2 && MainData.business_name && MainData.business_type && MainData.county && MainData.email && MainData.location_details &&
      MainData.phone && MainData.logo ){
   setCurrentStep(currentStep + 1)
    }
    else{
      if(!MainData.logo){
        setErrorMessage('Upload the logo')
      }
       if(!MainData.business_name){
        setErrorMessage('Enter The Business Name')
       }
       if(!MainData.business_type){
        setErrorMessage('Enter the Business Type')
       }
       if(!MainData.county){
        setErrorMessage('Select the County')
       }
       if(!MainData.email){
        setErrorMessage('Enter your Email')
       }
       if(!MainData.location_details){
        setErrorMessage('Enter Location Details')
       }
       if(!MainData.phone){
        setErrorMessage('Enter the Phone Number')
       }
       if(MainData.logo){
        setErrorMessage('Upload the logo')
       }
       setisModel(true)
    }




  };


  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const handlePayment = async (noticeId, amount, item) => {
    const parsedAmount = parseInt(amount, 10); // Convert string to integer

    if (isNaN(parsedAmount)) {
        console.error("Invalid amount:", amount);
        return;
    }

    console.log(typeof parsedAmount, parsedAmount); // Check the type (should be 'number')

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}service/create-checkout-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ noticeId, amount: parsedAmount, item }), // Send parsed amount
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Payment error:", result.error);
            return;
        }

        console.log(result.sessionUrl); // Check if sessionUrl is received
        window.location.href = result.sessionUrl; // Redirect user to Stripe Checkout
    } catch (error) {
        console.error("Payment request failed:", error);
    }
};


  const handleSubmit = async () => {

    const formData = new FormData();

   
    Object.keys(MainData).forEach((key) => {
      formData.append(key, MainData[key]);
    });

    // const token = localStorage.getItem("token"); 

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}service/add`, 
        {
          method: "POST",
          body: formData,

          headers: { Authorization: `Bearer ${token}` },
      });
      
      const result = await response.json();
      if (!response.ok) {
        // Display validation error from server

        setErrorMessage(result.error)
        setisModel(true)
    
        return;
    }
    // setSuccess(true)
    // setErrorMessage(result.message)
    // setisModel(true)


      console.log("Response:", result.service
      );

      handlePayment(result.service.id, result.service.payment, result.service.business_type);
    } catch (error) {
      alert("Request failed. Please try again.");
      console.error("Request failed");
    }
  };


  const handleNavigate = ()=>{
    navigate('/')
    setSuccess(false)
    setisModel(false)
  }
return (
  
      <div className="notice-from">
      <div className="container my-4">
      <h1 className="text-center my-5 add-famaily">Add Your Service</h1>

      <p className="text-center mb-5 death-heading-para">Join hundreds of trusted service providers across ireland</p>
     
     
     <div className="container">
     
        <div className="d-flex justify-content-evenly mb-4 line-hide">
          <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>
            <p className={`p-number ${currentStep > 0 ? 'p-number-active' : ''}`}> 
            <span className="span-number">1</span></p> <p className="mx-2 p-line"> Introduction</p>
          </div>
          <div className={`step-indicator ${currentStep > 2 ? 'active' : ''}`}>
            <p className={`p-number ${currentStep > 1 ? 'p-number-active' : ''}`}><span className="span-number">2</span></p> <p className="mx-2 p-line"> Add Details </p>
          </div>
          <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''}`}>
            <p className={`p-number ${currentStep > 2 ? 'p-number-active' : ''}`}><span className="span-number">3</span></p> <p className="mx-2 p-line"> Pay And Finalize</p>
          </div>
         
        </div>    
        </div>
        
       
       
        <div className="card">
          <div className="card-body">
     
  
     
  {currentStep === 1 && (
  <Introduction formData={MainData}/>
  )}
  
  

            {currentStep === 2 && (
        <AddServiceDetails formData={MainData} setFormData={setMainData}/>
            )}
  
       
            {currentStep === 3 && (
           <PayAndFinalize formData={MainData}  />
            )}
  
          
         
  
            <div className="mt-3 cus-btn-div-next">
              {currentStep > 1 && (
                <button className="link_btn" onClick={handlePreviousStep}>
                <span>{'<-'}</span>  Previous 
                </button>
              )}
                   {currentStep === 3 &&  (
                <button className="link_btn" onClick={handleSubmit}>
              Proceed to Payment  <span>{'->'}</span>
                </button>
              )}
              {currentStep ===2  && (


                <button className="link_btn" onClick={handleNextStep}>
                   Next  <span>{'->'}</span>
                </button>
              )}

{currentStep ===1  && (
                <button className="link_btn" onClick={handleNextStep}>
                 Get Started    <span>{'->'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {!success && (
            <Modal
            show={isModel}
            onConfirm={()=>setisModel(false)}
            onCancel={()=>{setisModel(false)}}
            message={errorMessage}
            title={"Error"}
          />
      )}
  {success && (
        <Modal
        show={isModel}
        onConfirm={handleNavigate}
        onCancel={handleNavigate}
        message={errorMessage}
        title={"Error"}
      />
  )}
      </div>
         
        
          );
        }

export default ServiceFrom;