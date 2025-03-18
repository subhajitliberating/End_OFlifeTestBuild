
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Style.css';

import axios from "axios"; 
import Modal from '../UI/Modal/Modal'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const user = location.state?.user;  
  const forget =  location.state?.forget

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: user,
    confirm:""

  });

  const [isModel, setisModel] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [otpModal,setOtpmodal]=useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [otp,setotp]=useState()
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {

    }
   
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        role: user
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {
      setIsLoading(true);
      let response
      if (user  && forget) {


        response = await axios.post(`${import.meta.env.VITE_API_URL}auth/forgot`,
          formData,
          { withCredentials: true }
        )
        // console.log(response)
        // setErrorMessage("Otp send successfully to your email")

        // setisModel(true)
        localStorage.setItem('otpToken' , response.data.otpToken)
        setOtpmodal(true)

      }
       

      if (user === "admin" && !forget) {


        response = await axios.post(`${import.meta.env.VITE_API_URL}admin/login`,
          formData,
          { withCredentials: true }
        )

      }
    if (user !=='admin'  && !forget) {

      response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/login`,
        formData,
        { withCredentials: true }  // Make sure to include cookies (if necessary)
      );

    }



 
      if (response.data.message === 'Logged in successfully') {

        if (user === 'admin') {

 sessionStorage.setItem('token', response.data.token);
          navigate('/admin/dashboard')
         
        } else {
          console.log(response)
       

          sessionStorage.setItem('token', response.data.token);
          window.location.href = `${import.meta.env.VITE_API_FRURL}`;

        }

      }
    } catch (error) {
      console.error("Error during login:", error);
console.log(error)
      setErrorMessage("invalid email ")

      setisModel(true)

    
  } finally {
    setIsLoading(false); // Stop loading
  }
  };

  const handelgooglelogin = () => {
    // Redirect to the backend for Google login
    window.location.href = 'http://localhost:5000/auth/google';
  };

  
  const handelveryfiyotp = async (e) => {

    e.preventDefault();
  
    try {
      setIsLoading(true);
  
      const otpToken = localStorage.getItem("otpToken"); // Retrieve stored OTP token
  
      // Ensure OTP is entered
      // if (!formData.otp) {
      //   setErrorMessage("Please enter the OTP");
      //   setIsLoading(false);
      //   return;
      // }
  
      // Add OTP and OTP token to formData
      const updatedFormData = {
        ...formData,
        otp,
        otpToken,
      };
  
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}auth/verify-otp`,
        updatedFormData,
        { withCredentials: true }
      );
  

      setErrorMessage("Paasword Change successfully!");
        setOtpmodal(false);
        setisModel(true)
        console.log(otpModal)
        // Proceed with password reset or next step
    
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="login cus-mt-170">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-md-6 col-sm-12">
            <div className="login-content" onClick={(e) => e.stopPropagation()}>
              {(user === "user" && !forget) && (
                <h2 className="text-center my-5 add-famaily">Login to Your Account</h2>
              )}
              {(user === "service provider" && !forget) && (
                <h2 className="text-center my-3 add-famaily">List A Service</h2>
              )}
              {(user === "service provider" && !forget) && (
                <h2 className="text-center my-5 login-para">Log in to access your account and add your service to our trusted directory.</h2>
              )}


              {
               ( user === "admin"  && !forget)&& (
                  <h2 className="text-center my-5 add-famaily">Login to Admin Account</h2>
                )
              }
              {(user === "directory" && !forget) && (
                <h2 className="text-center my-3 add-famaily">Funeral Director Login</h2>
              )}

              {(user === "directory" && !forget) && (
                <h2 className="text-center my-5 login-para">Access your dashboard to manage and publish death notices.</h2>
              )}
              { forget && (
                <h2 className="text-center my-5 add-famaily">Forgot Password</h2>
              )}


              <form className="login-from" onSubmit={handleSubmit}>
                <div className="container">
                  <div className="row g-3 justify-content-center">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <input
                        type="email"
                        name="email"  // Add name attribute
                        placeholder="Enter your email"
                        required
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <input
                        type="password"
                        name="password"  // Add name attribute
                        placeholder={forget ? "Enter your new password" : "Enter your password"}
                        required
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                      />
                    </div>
                    {forget && (
                        <div className="col-lg-12 col-md-12 col-sm-12">
                        <input
                          type="password"
                          name="confirm"  // Add name attribute
                          placeholder="Confirm your password"
                          required
                          className="form-control"
                          value={formData.confirm}
                          onChange={handleChange}
       
                        />
                      </div>
                    )}
                    <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
                    <button type="submit" className="link_btn justify-content-center" disabled={isLoading}>
                        { isLoading ? (
                     <div className="spinner-border text-warning text-center" role="status">
                     <span className="visually-hidden">Loading...</span>
                   </div>
                        ) : (
                          forget ? <p>Confirm<span>{'->'}</span></p> : <p>Login <span>{'->'}</span></p>
                        )}
                      </button>

                    </div>
                  </div>
                </div>
              </form>
              {user === "user" && (
                <div className="register-div">
                  <h4>Don't have an account yet?  </h4>

                  <Link className="register-link" to="/register" state={{ user: user }}>
                    Sign Up here


                  </Link>


                </div>
              )}


              {user === "service provider" && (
                <div className="register-div">
                  <h4>Don't have an account yet? </h4>
                  <Link className="register-link" to="/register" state={{ user: user }}>
                    Register
                  </Link>
                </div>
              )}

              

              <p  onClick={()=>    navigate('/forgetpassword', { state: { user: user,forget:true } })} className="support-link">
               Forgot Password
              </p>
              <Link to="#" className="support-link">
                Need help? Contact Support for assistance.
              </Link>

            </div>
          </div>
        </div>
      </div>
      <Modal
        show={isModel}
        onConfirm={() => setisModel(false)}
        onCancel={() => { setisModel(false) }}
        message={errorMessage}
        title={"Error"}
      />
 
      <Modal
      show={otpModal}
      onConfirm={(e) => handelveryfiyotp(e)}
      onCancel={() => { setOtpmodal(false) }}
      message={false}
      title={"Error"}
      setotp={setotp}
    />
   
    </div>

  );
};

export default Login;
