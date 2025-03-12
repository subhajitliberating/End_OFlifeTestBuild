// src/component/Navbar.js
import React from "react";
import { Container, Navbar, Dropdown } from "react-bootstrap";
import { FaUser, FaBars } from "react-icons/fa";
import { useSidebar } from "../../Contex/SidebarContext";
// import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";

const CustomNavbar = ({setToken,setRole}) => {
  const { toggleSidebar } = useSidebar();
 const nav = useNavigate()
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
      <Container fluid>
        <Navbar.Brand  className="d-flex align-items-center">
       
         {/* <img src={logo}/> */}
          <FaBars 
            
            onClick={toggleSidebar}
            style={{ cursor: 'pointer',marginLeft:'20px' }}
          />
         
        </Navbar.Brand>
       
        <div className="ms-auto d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              <FaUser className="me-2" /> Admin
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item  onClick={()=>{
                sessionStorage.removeItem('token'),
                setToken('')
                nav('/')
                setRole('null')
              }}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;