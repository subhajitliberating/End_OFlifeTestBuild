

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";

import { BsPersonLinesFill } from "react-icons/bs";
import { BsFillSave2Fill } from "react-icons/bs";

import { HiUserGroup } from "react-icons/hi2";
import { RiLogoutCircleLine } from "react-icons/ri";
import { jwtDecode } from "jwt-decode"

import { MdOutlineShoppingCart } from "react-icons/md";
import Modal from "../UI/Modal/Modal";
import Cookies from 'js-cookie';
const Navbar = ({ token, user, role, setToken, setUser, setRole }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation()
  const getCookie = (name) => {
    const cookies = document.cookie;


    const value = `; ${cookies}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };









  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        setToken(token)
        // Decode the token using jwt-decode
        const decodedToken = jwtDecode(token);;

        const role = decodedToken.role;
        const username = decodedToken.username;

        setRole(role);
        setUser(username)

      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }


  }, [location]);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const navigate = useNavigate();

  const handleLogout = () => {

    sessionStorage.removeItem('token');
    navigate('/home')

    window.location.reload(); // This will reload the current page
  };


  const handelNotice = () => {
    if (token && role === "user") {
      navigate('/user/addnotice')
    }
    else if (token && role === "directory") {
      navigate('/directory/deatnotice')
    }
    else if (token && role === "service provider") {
      navigate('/service/servicefrom')
    }

    else {
      openModal()
    }
  }

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const onConfirm = () => {
    navigate('/login', { state: { user: "user" } });
    setIsModalOpen(false)
  }

  return (
    <div className={`cus-navbar ${isNavbarVisible ? "visible" : "hidden"}`}>

      <div className={`navbar-min  ${isNavbarVisible ? "visible" : "hidden"}`}>
        <div className="nav-center">
          <div className="nav-row">
            <Link className="min-nav-link" to="faq">FAQ</Link>
            <Link className="min-nav-link" to="info">Practical Information</Link>
            <Link className="min-nav-link" to="donate">Donate</Link>
          </div>

          <div className="nav-row2">
            <Link className="min-nav-link" to="#">{user}</Link>
            {!token && (<Link className="min-nav-link" to="login" state={{ user: "user" }}>Login/Signup</Link>
            )}
            {token && (

              <div style={{
                maxWidth: '24px'
              }}>


                <div className="dropdown text-algin-left">
                  <button className="btn btn-default dropdown-bs-toggle cus-drop-btn" type="button" id="menu1" data-bs-toggle="dropdown" aria-expanded="false"><FaUser className="user-icon" color="#f6efe7" size={34} />
                    <span className="caret"></span></button>
                  <ul className="dropdown-menu cus-drop" role="menu" aria-labelledby="menu1">
                    {/* <li className="drop-cus-link" role="presentation">
             <span> <MdWarehouse className="drop-down-icon" size={24} color="#e2cb80"/> </span>
             <Link   className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">Member’s Homepage </Link></li> */}
                    <li className="drop-cus-link" role="presentation">
                      <span><BsPersonLinesFill className="drop-down-icon" size={24} color="#e2cb80" /></span>
                      <Link to="#" className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">

                        Personal data

                      </Link></li>
                    <li className="drop-cus-link" role="presentation">
                      <span><BsFillSave2Fill className="drop-down-icon" size={24} color="#e2cb80" /></span>
                      <Link className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">Saved Notices

                      </Link></li>
                    {/* <li className="drop-cus-link" role="presentation">
            <span>  <GoAlertFill className="drop-down-icon" size={24} color="#e2cb80"/></span>
            <Link   className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">My Email Alerts 
        </Link></li> */}
                    {role === "user" && (
                      <li className="drop-cus-link" role="presentation">
                        <span><HiUserGroup className="drop-down-icon" size={24} color="#e2cb80" /></span>
                        <Link to="user/myfamilynotices" className="nav-link" role="menuitem" tabindex="-1" href="#">My Family Notice

                        </Link></li>
                    )}
                    {role === "directory" && (
                      <li className="drop-cus-link" role="presentation">
                        <span><HiUserGroup className="drop-down-icon" size={24} color="#e2cb80" /></span>
                        <Link to="directory/mydeathnotices" className="nav-link" role="menuitem" tabindex="-1" href="#">Death Notices

                        </Link></li>
                    )}


                    {role === "service provider" && (
                      <li className="drop-cus-link" role="presentation">
                        <span><HiUserGroup className="drop-down-icon" size={24} color="#e2cb80" /></span>
                        <Link to="service/myservice" className="nav-link" role="menuitem" tabindex="-1" href="#">My Services

                        </Link></li>
                    )}




                    <li className="drop-cus-link divider" role="presentation" ></li>
                    <li className="drop-cus-link" role="presentation" onClick={handleLogout}>
                      <span><RiLogoutCircleLine size={24} color="#e2cb80" /></span>
                      <Link className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">Logout
                      </Link></li>
                  </ul>
                </div>
              </div>
            )}
            {role === "directory" ?
              <button onClick={handelNotice} className="nav_button">+ Add Death Notice</button> :
              role === "service provider" ? <button onClick={handelNotice} className="nav_button">+ Add New Service</button> : <button onClick={handelNotice} className="nav_button">+ Add Family Notice</button>
            }


          </div>
        </div>
      </div>

      <div className="navbar-main">
        <div className="nav-icon">
          <Link to="/" > <img src={logo} alt="logo" className="nav-logo" /></Link>
        </div>
        {role === "null" && (
          <div className={`nav-link-box ${isMobileMenuOpen ? "open" : ""}`}>
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
            <Link to="/deathnotice" className={`nav-link ${location.pathname === '/deathnotice' ? 'nav-link-active' : ''}`}>Death Notices</Link>
            <Link to="/familynotices" className={`nav-link ${location.pathname === '/familynotices' ? 'nav-link-active' : ''}`}>Family Notices</Link>
            <Link to="/service-directory" className={`nav-link ${location.pathname === '/service-directory' ? 'nav-link-active' : ''}`}>Services Directory</Link>
            <Link to="/#" className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`}>Resources</Link>
          </div>
        )}


        {role === "admin" && (
          <div className={`nav-link-box ${isMobileMenuOpen ? "open" : ""}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Home</Link>
            <Link to="/admin/dashboard" className={`nav-link ${location.pathname === '/admin/dashboard' ? 'nav-link-active' : ''}`}>Dashboard</Link>
            <Link to="/familynotices" className={`nav-link ${location.pathname === '/familynotices' ? 'nav-link-active' : ''}`}>Family Notices</Link>
            <Link to="/admin/service-directory" className={`nav-link ${location.pathname === '/admin/service-directory' ? 'nav-link-active' : ''}`}>Services Directory</Link>
            <Link to="/deathnotice" className={`nav-link ${location.pathname === '/deathnotice' ? 'nav-link-active' : ''}`}>Resources</Link>
          </div>
        )}

        {role === "directory" && (
          <div className={`nav-link-box ${isMobileMenuOpen ? "open" : ""}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Home</Link>
            <Link to="directory/dashboard" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Dashboard</Link>
            <Link to="/familynotices" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Family Notices</Link>
            <Link to="/directory/service-directory" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Services Directory</Link>
            <Link to="/deathnotice" className={`nav-link ${location.pathname === '/deathnotice' ? 'nav-link-active' : ''}`}>Resources</Link>
          </div>
        )}



        {role === "user" && (
          <div className={`nav-link-box ${isMobileMenuOpen ? "open" : ""}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Home</Link>
            <Link to="/deathnotice" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Death Notices</Link>
            <Link to="/familynotices" className={`nav-link ${location.pathname === '/familynotices' ? 'nav-link-active' : ''}`}>Family Notices</Link>
            <Link to="/service-directory" className={`nav-link ${location.pathname === '/service-directory' ? 'nav-link-active' : ''}`}>Services Directory</Link>
            <Link to="/deathnotice" className={`nav-link ${location.pathname === '/deathnotice' ? 'nav-link-active' : ''}`}>Resources</Link>
          </div>
        )}

        {role === "service provider" && (
          <div className={`nav-link-box ${isMobileMenuOpen ? "open" : ""}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Home</Link>
            <Link to="/service/deathnotice" className={`nav-link ${location.pathname === '/service/deathnotice' ? 'nav-link-active' : ''}`}>Death Notices</Link>
            <Link to="/familynotices" className={`nav-link ${location.pathname === '/familynotices' ? 'nav-link-active' : ''}`}>Family Notices</Link>
            <Link to="/service/service-directory" className={`nav-link ${location.pathname === '/service/service-directory' ? 'nav-link-active' : ''}`}>Services Directory</Link>
            <Link to="/deathnotice" className={`nav-link ${location.pathname === '/deathnotice' ? 'nav-link-active' : ''}`}>Resources</Link>


          </div>
        )}


        <div className="icon-box">
          {/* <MdOutlineShoppingCart style={{
            fontFamily: "Cormorant Garamond",
            fontSize: '30px'
          }} /> */}

          <div className="mobile-user" >

            {!token && (<Link className="min-nav-link" to="login" state={{ user: "user" }} style={{
              color: 'black'
            }}>Login/Signup</Link>
            )}
            {token && (

              <div style={{
                maxWidth: '40px'
              }}>


                <div className="dropdown text-algin-left">
                  <button className="btn btn-default dropdown-bs-toggle cus-drop-btn" type="button" id="menu1" data-bs-toggle="dropdown" aria-expanded="false"><FaUser className="user-icon" color="#f6efe7" size={30} />
                    <span className="caret"></span></button>
                  <ul className="dropdown-menu cus-drop" role="menu" aria-labelledby="menu1">
                    {/* <li className="drop-cus-link" role="presentation">
             <span> <MdWarehouse className="drop-down-icon" size={24} color="#e2cb80"/> </span>
             <Link   className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">Member’s Homepage </Link></li> */}
                    <li className="drop-cus-link" role="presentation">
                      <span><BsPersonLinesFill className="drop-down-icon" size={24} color="#e2cb80" /></span>
                      <Link to="#" className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">

                        Personal data

                      </Link></li>
                    <li className="drop-cus-link" role="presentation">
                      <span><BsFillSave2Fill className="drop-down-icon" size={24} color="#e2cb80" /></span>
                      <Link className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">Saved Notices

                      </Link></li>
                    {/* <li className="drop-cus-link" role="presentation">
            <span>  <GoAlertFill className="drop-down-icon" size={24} color="#e2cb80"/></span>
            <Link   className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">My Email Alerts 
        </Link></li> */}
                    {role === "user" && (
                      <li className="drop-cus-link" role="presentation">
                        <span><HiUserGroup className="drop-down-icon" size={24} color="#e2cb80" /></span>
                        <Link to="user/myfamilynotices" className="nav-link" role="menuitem" tabindex="-1" href="#">My Family Notice

                        </Link></li>
                    )}
                    {role === "directory" && (
                      <li className="drop-cus-link" role="presentation">
                        <span><HiUserGroup className="drop-down-icon" size={24} color="#e2cb80" /></span>
                        <Link to="directory/mydeathnotices" className="nav-link" role="menuitem" tabindex="-1" href="#">Death Notices

                        </Link></li>
                    )}


                    {role === "service provider" && (
                      <li className="drop-cus-link" role="presentation">
                        <span><HiUserGroup className="drop-down-icon" size={24} color="#e2cb80" /></span>
                        <Link to="service/myservice" className="nav-link" role="menuitem" tabindex="-1" href="#">My Services

                        </Link></li>
                    )}




                    <li className="drop-cus-link divider" role="presentation" ></li>
                    <li className="drop-cus-link" role="presentation" onClick={handleLogout}>
                      <span><RiLogoutCircleLine size={24} color="#e2cb80" /></span>
                      <Link className={`nav-link ${location.pathname === '/#' ? 'nav-link-active' : ''}`} role="menuitem" tabindex="-1" href="#">Logout
                      </Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>






          <button className="toggle-button" onClick={handleToggleMenu}>
            ☰
          </button>

        </div>

      </div>

      {isModalOpen && (
        <Modal
          show={isModalOpen}
          onConfirm={onConfirm}
          onCancel={closeModal}
          message={"Please login to add notice"}
        />
      )}


    </div>
  );
};

export default Navbar;