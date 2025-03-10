
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Style.css';

import axios from "axios"; // Don't forget to import axios
import Modal from '../UI/Modal/Modal'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const user = location.state?.user;  // Get user data passed via Link

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: user   // Set the user from location or default to empty string
  });

  const [isModel, setisModel] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {

    }
    // Update formData if user data passed via location state is available
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
      let response
      if (user === "admin") {


        response = await axios.post(`${import.meta.env.VITE_API_URL}admin/login`,
          formData,
          { withCredentials: true }
        )

      }
      else {

        response = await axios.post(
          `${import.meta.env.VITE_API_URL}auth/login`,
          formData,
          { withCredentials: true }  // Make sure to include cookies (if necessary)
        );

      }



      // If login is successful, redirect to the frontend
      if (response.data.message === 'Logged in successfully') {

        if (user === 'admin') {

 sessionStorage.setItem('token', response.data.token);
          navigate('/admin/dashboard')
          // window.location.href= import.meta.env.VITE_API_FRURL+"/admin/dashboard"
        } else {
          console.log(response)
          // Redirect the user to the desired page after successful login

          sessionStorage.setItem('token', response.data.token);
          window.location.href = `${import.meta.env.VITE_API_FRURL}`;

        }

      }
    } catch (error) {
      console.error("Error during login:", error);

      setErrorMessage("invalid email or password")

      setisModel(true)

    }
  };

  const handelgooglelogin = () => {
    // Redirect to the backend for Google login
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="login cus-mt-170">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-md-6 col-sm-12">
            <div className="login-content" onClick={(e) => e.stopPropagation()}>
              {user === "user" && (
                <h2 className="text-center my-5 add-famaily">Login to Your Account</h2>
              )}
              {user === "service provider" && (
                <h2 className="text-center my-3 add-famaily">List A Service</h2>
              )}
              {user === "service provider" && (
                <h2 className="text-center my-5 login-para">Log in to access your account and add your service to our trusted directory.</h2>
              )}


              {
                user === "admin" && (
                  <h2 className="text-center my-5 add-famaily">Login to Admin Account</h2>
                )
              }
              {user === "directory" && (
                <h2 className="text-center my-3 add-famaily">Funeral Director Login</h2>
              )}

              {user === "directory" && (
                <h2 className="text-center my-5 login-para">Access your dashboard to manage and publish death notices.</h2>
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
                        placeholder="Enter your password"
                        required
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
                      <button type="submit" className="link_btn">
                        <p>Login <span>{'->'}</span> </p>
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
    </div>

  );
};

export default Login;
