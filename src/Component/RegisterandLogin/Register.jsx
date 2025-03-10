import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
const Register = () => {
  const location = useLocation();
  const user = location.state?.user;

  const navigate = useNavigate()
  // State to manage form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: user || "",
    termsAccepted: false, // For terms and conditions checkbox
  });


  const [success, setSuccess] = useState(false)

  const [isModel, setisModel] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const handelgooglelogin = () => {
    // Redirect to the backend for Google login
    window.location.href = 'http://localhost:5000/auth/google';
  };

  useEffect(() => {
    // Update formData if user data passed via location state is available
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        role: user
      }));
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if terms and conditions are accepted
    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions.");
      return;
    }

    // Log form data before sending

    // Send data to the backend
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}auth/register`, formData);

      setErrorMessage(user + "registered successfully")
      setSuccess(true)
      setisModel(true)


    } catch (error) {
      console.error("Error during registration:", error);

      setErrorMessage(error.response.data.message)

      setisModel(true)
    }
  };



  const handelnavigate = () => {
    navigate('/login', { state: { user: user } });
    setisModel(false)
    setSuccess(false)
  }

  return (
    <div className="register-container cus-mt-170">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-md-6 col-sm-12">
            <div className="login-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-center my-5 add-famaily">Create your account</h2>
              <form className="login-from" onSubmit={handleSubmit}>
                <div className="container">
                  <div className="row g-3">
                    <div className="col-lg12 colmd-12 col-sm-12">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your Username"
                        required
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your Password"
                        required
                      />
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">

                      <label>
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                        />
                        I accept the terms and conditions
                      </label>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
                      <button type="submit" className=" link_btn">
                        <p>  Create Account <span>{'->'}</span> </p>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* <div className="social-login">
                <p className="social-login-para">Or login in with:</p>
                <div className="social-login-btn">
                  <button onClick={handelgooglelogin} className="google-link">
                    <FcGoogle size={34} /> Log In With Google
                  </button>
                  <Link className="google-link">
                    <FaSquareFacebook size={34} /> Log In With Facebook
                  </Link>
                </div>
              </div> */}

              <div className="register-div">
                <h4>Already have an account? </h4>
                <Link className="register-link" to="/login" state={{ user: user }}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!success && (
        <Modal
          show={isModel}
          onConfirm={() => setisModel(false)}
          onCancel={() => { setisModel(false) }}
          message={errorMessage}
          title={"Error"}
        />
      )}
      {success && (
        <Modal
          show={isModel}
          onConfirm={handelnavigate}
          onCancel={() => { setisModel(false) }}
          message={errorMessage}
          title={"Error"}
        />
      )}
    </div>
  );



};

export default Register;
