
import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import CustomNavbar from "../Navbar/CustomNavbar";
import Sidebar from "../Navbar/Sidebar";
import { SidebarProvider } from "../../Contex/SidebarContext";
import { useState,useEffect } from "react";


const Admin = ({setToken,setRole}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <SidebarProvider>
      <div className="d-flex">
        <Sidebar setOpen={setOpen}/>
        
        <div id="content" className={`w-100 ${isOpen ? 'content-m-250' : 'content-m-100'}`}>
          <CustomNavbar setToken={setToken} setRole={setRole}/>
          
          <Container fluid className="p-4">
            <div className="main-content">
              <Outlet />
            </div>
          </Container>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;