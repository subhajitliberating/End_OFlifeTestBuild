import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; // Create a custom CSS file for additional styles
import logo from '../../../assets/footerlogo.svg'
import { Link } from "react-router-dom";
import liberatingLOgo from '../../../assets/liberatinglogo.webp'
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="container">
      <div className="text-center">
            <img
         
              src={logo}
              alt="End of Life Logo"
              className="custom-footer-logo"
            />
              <Link className="min-nav-link" to="login" state={{ user: "admin" }}>Admin Login </Link>
              <Link className="min-nav-link" to="login" state={{ user: "service provider" }}>Service  Login/Signup</Link>
            <Link className="min-nav-link" to="login" state={{ user: "directory" }}>Funeral Directory Login</Link>
          </div>
        <div className="custom-row">
         
          <div className="quick-links-div">
            <h5 className="mb-3 footer-links-heading">Quick Links</h5>
            <ul className="quick-list-ul" >
              <li><Link className="footer-link" to="/" >Home</Link></li>
              <li><Link className="footer-link" to="/deathnotice" >Death Notices</Link></li>
              <li><Link className="footer-link" to="/familynotices" >Family Notices</Link></li>
              <li><Link className="footer-link" to="/" >Resources</Link></li>
              <li><Link className="footer-link" to="/" >About Us</Link></li>
              <li><Link className="footer-link" to="/service-list" >Services</Link></li>
              <li><Link className="footer-link" to="/" >FAQ</Link></li>
              <li><Link className="footer-link" to="/" >Contact Us</Link></li>
            </ul>
          </div>
         <div className="service-link-div">
            <h5 className="mb-3 footer-links-heading">Services</h5>
            <div className="custom-row left">
             <div className="frist-service-div">
             <ul className="list-unstyled"> 
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Auctioneers & Valuers" }}>
  Auctioneers & Valuers
</Link>
</li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Bereavement Counselling" }}>Bereavement Counselling</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Caterers" }}>Caterers</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Cemeteries and Memorial Parks" }} >Cemeteries and Memorial Parks</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Charities" }}>Charities</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Civil & Humanist Funerals" }}>Civil & Humanist Funerals</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Florists" }}>Florists</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Funeral Director" }}>Funeral Director</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Funeral Plans" }}>Funeral Plans</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Funeral Video & Streaming" }}>Funeral Video & Streaming</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Grave Maintenance" }}>Grave Maintenance</Link></li>
  <li><Link className="footer-link" to="/service-directory" state={{ category: "Grave Markers, Plaques & Ornaments" }}>Grave Markers, Plaques & Ornaments</Link></li>

</ul>

             </div>
             <div className="sceond-service-div">
             <ul className="list-unstyled">
             <li><Link className="footer-link" to="/headstones-monuments">Headstones & Monuments</Link></li>
  <li><Link className="footer-link" to="/homecare-support">Homecare & Support</Link></li>
  <li><Link className="footer-link" to="/hotels-restaurants-venues">Hotels, Restaurants & Venues</Link></li>
  <li><Link className="footer-link" to="/house-clearance-renovations">House Clearance & Renovations</Link></li>
  <li><Link className="footer-link" to="/memorial-cards-keyrings">Memorial Cards & Keyrings</Link></li>
  <li><Link className="footer-link" to="/repatriation">Repatriation</Link></li>
  <li><Link className="footer-link" to="/singers-musicians">Singers and Musicians</Link></li>
  <li><Link className="footer-link" to="/suit-hire-funeral-attire">Suit Hire - Funeral Attire</Link></li>
  <li><Link className="footer-link" to="/sympathy-cards-memorial-gifts">Sympathy Cards & Memorial Gifts</Link></li>
  <li><Link className="footer-link" to="/trace-your-ancestors">Trace Your Ancestors</Link></li>
  <li><Link className="footer-link" to="/urns-keepsakes">Urns & Keepsakes</Link></li>
            </ul>
             </div>
            </div>
        
          </div>
     
          <div className="death-links">
            <h5 className="mb-3 footer-links-heading">Family Notices</h5>
            <ul className="list-unstyled">
              <li><Link className="footer-link" to="/familynotices"  >View All</Link></li>
              <li><Link className="footer-link" to="/familynotices" state={{Tab : "Acknowledgement"}} >Acknowledgement</Link></li>
              <li><Link className="footer-link" to="/familynotices" state={{Tab : "Anniversary"}} >Anniversary</Link></li>
              <li><Link className="footer-link" to="/familynotices" state={{Tab : "Month's Mind"}} >Month's Mind</Link></li>
              <li><Link className="footer-link" to="/familynotices" state={{Tab : "Birthday Memorial"}} >Birthday Memorial</Link></li>
              <li><Link className="footer-link" to="/familynotices" state={{Tab : "Memorial Mass"}} >Memorial Mass</Link></li>
              <li><Link className="footer-link" to="/familynotices" state={{Tab : "Memorial Services"}} >Memorial Services</Link></li>
            </ul>
          </div>
       
          <div className="county-links">
            <h5 className="mb-3 footer-links-heading">By County</h5>
            <ul className="list-unstyled">
              <li><Link className="footer-link" to="/deathnotice" >View All</Link></li>
              <li><Link className="footer-link" to={`/deathnotice/${'Antrim'}`} >Antrim</Link></li>
              <li><Link className="footer-link" to={`/deathnotice/${'Armagh'}`}>Armagh</Link></li>
              <li><Link className="footer-link" to={`/deathnotice/${'Carlow'}`} >Carlow</Link></li>
              <li><Link className="footer-link" to={`/deathnotice/${'Cavan'}`} >Cavan</Link></li>
              <li><Link className="footer-link" to={`/deathnotice/${'Clare'}`} >Clare</Link></li>
              <li><Link className="footer-link" to={`/deathnotice/${'Cork'}`} >Cork</Link></li>
              <li><Link className="footer-link" to={`/deathnotice/${'Derry'}`} >Derry</Link></li>
            </ul>
          </div> 
        </div>
        <div className="text-center mt-4 footerbottom ">
          <div className="mb-0 d-flex justify-content-center my-5 "> <Link className="footer-link mx-3" to="#" >Terms & Conditions </Link>  <Link className="footer-link mx-3" to="#" > Privacy Policy </Link> <Link className="footer-link mx-3" to="#" > Contact </Link> <Link className="footer-link mx-3" to="#" >Donate </Link> </div>
         <div className="liberating_logo_div my-3">
          <img  src={liberatingLOgo} />
         </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
