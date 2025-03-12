// src/component/Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import { FaFileInvoice } from "react-icons/fa";
import {
  FaHome,
  FaList,
  FaLayerGroup,
  FaEnvelope,

} from "react-icons/fa";
// Added FaBars for the toggle button

import { BsPersonLinesFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { Link, useLocation, } from "react-router-dom";

import { BsFillSave2Fill } from "react-icons/bs";
import { useSidebar } from "../../Contex/SidebarContext";
import { useEffect, useState } from "react";

const Sidebar = ({ setOpen }) => {
  const { isOpen } = useSidebar();
  const location = useLocation();
  const [isNoticesOpen, setIsNoticesOpen] = useState(false);

  // Close dropdown when sidebar is closed
  useEffect(() => {
    if (!isOpen) {
      setIsNoticesOpen(false);
    }
  }, [isOpen]);

  // Open dropdown if current path is under notices
  useEffect(() => {
    if (location.pathname.startsWith('/admin/notices')) {
      setIsNoticesOpen(true);
    }
  }, [location.pathname]);


  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen])


  return (
    <nav
      id="sidebar"
      className={`  text-black vh-100 fixed-left ${isOpen ? 'active' : 'deactive'}`}
    >
      <div className={`sidebar-header p-3 ${isOpen ? '' : 'd-lg-none'}`}>
        <h3 className="text-center">End Of Life</h3>
      </div>

      <Nav className="flex-column p-3">

        <Link to="/admin/dashboard" className={`admin-nav-link ${location.pathname === '/admin/dashboard' ? 'admin-nav-link-active' : ''}`} end>
          <FaHome className="me-2" />  <span className={`${isOpen ? '' : 'd-lg-none'}`}>Dashboard
          </span>
        </Link>

        <div
          className={`admin-nav-link ${location.pathname.startsWith('/admin/notices') ? 'admin-nav-link-active' : ''}`}
          onClick={() => setIsNoticesOpen(!isNoticesOpen)}
          style={{ cursor: 'pointer' }}
        >
          <BsPersonLinesFill size={22} className="me-2" />
          <span className={`${isOpen ? '' : 'd-lg-none'}`}>Notices</span>
        </div>

        {/* Dropdown Menu */}
        {isNoticesOpen && (
          <div className="sub-links">
            <Link
              to="/admin/notices/family"
              className={`admin-nav-link ${location.pathname === '/admin/notices/family' ? 'admin-nav-link-active' : ''}`}
              style={{ paddingLeft: '2rem' }}
            >
              <FaList className="me-2" />
              <span className={`${isOpen ? '' : 'd-lg-none'}`}>Family Notice</span>
            </Link>
            <Link
              to="/admin/notices/death"
              className={`admin-nav-link ${location.pathname === '/admin/notices/death' ? 'admin-nav-link-active' : ''}`}
              style={{ paddingLeft: '2rem' }}
            >
              <FaEnvelope className="me-2" />
              <span className={`${isOpen ? '' : 'd-lg-none'}`}>Death Notice</span>
            </Link>
            <Link
              to="/admin/notices/types"
              className={`admin-nav-link ${location.pathname === '/admin/notices/types' ? 'admin-nav-link-active' : ''}`}
              style={{ paddingLeft: '2rem' }}
            >
              <FaLayerGroup className="me-2" />
              <span className={`${isOpen ? '' : 'd-lg-none'}`}>Notice Types</span>
            </Link>
          </div>
        )}
        <Link to="/admin/service-directory" className={`admin-nav-link ${location.pathname === '/admin/service-directory' ? 'admin-nav-link-active' : ''}`}>
          <BsFillSave2Fill className="me-2" size={22} />
          <span className={`${isOpen ? '' : 'd-lg-none'}`}>
            Service Directory

          </span>
        </Link>

        <Link to="/admin/invoice" className={`admin-nav-link ${location.pathname === '/admin/invoice' ? 'admin-nav-link-active' : ''}`}>
          < FaFileInvoice size={22} />
          <span className={`${isOpen ? '' : 'd-lg-none'}`}>
            Invoices

          </span>
        </Link>

        <Link to="/admin/setting" className={`admin-nav-link ${location.pathname === '/admin/setting' ? 'admin-nav-link-active' : ''}`}>
          <IoSettings size={24} />

          <span className={`${isOpen ? '' : 'd-lg-none'}`}>
            Setting

          </span>
        </Link>


      </Nav>
    </nav>
  );
};

export default Sidebar;