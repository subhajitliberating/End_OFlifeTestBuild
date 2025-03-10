


import React from "react";
import { Link } from 'react-router-dom';

import '../../assets/css/single_services.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RecentDeadNoticed from "../UI/RecentDeadNoticed/RecentDeadNoticed";
import ServiceSearch from "../UI/ServiceSearch/ServiceSearch";
import { IoLocationSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";
const ServiceList = ({ token, role }) => {
  const { county, businessType } = useParams();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const removeHTMLTagsAndTruncate = (htmlString) => {
    // Remove HTML tags using regular expression
    const textContent = htmlString.replace(/<[^>]+>/g, '');

    // Split the content into lines and take the first 4 lines
    const lines = textContent.split('\n');
    return lines.slice(0, 1).join('\n');  // Join back the first 4 lines
  };

  const handelnavigate = () => {
    if (role !== "service provider") {
      navigate('/login', { state: { user: "service provider" } });
    }
    if (role === "service provider") {

      navigate('/servics/servicefrom');
    }
  }





  const fetchFilteredServices = async (county, businessType) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}service/list`, {
        county,
        business_type: businessType,
      });

      setServices(response.data.service);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };


  useEffect(() => {
    fetchFilteredServices(county !== "all" ? county : "", businessType !== "all" ? businessType : "");
  }, [county, businessType]);


  // Handle infinite scroll with 60% page scroll trigger (Only in grid view)


  return (


    <div className="service-all-list cus-mt-170">
      <ServiceSearch />
      <section className="serv_inner">
        <div className="container">
          <div className="all_services">
            <div className="row">
              {/* Iterate through services and display each one */}
              {services.length > 0 ? (
                services.map((service, index) => (
                  <div className="col-md-6 my-3" key={index}>
                    <div className="serv_card">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="img_serv">


                            <img
                              src={`${import.meta.env.VITE_API_URL}${service.logo.slice(7).replace(/\\/g, '/')}`}
                              alt={service.business_name}
                            />





                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="serv_text">
                            <span>{service.business_type}</span> {/* Business Type */}
                            <h2>{service.business_name}</h2> {/* Business Name */}
                            <ul>
                              <li><IoLocationSharp size={20} style={{
                                margin: '2px'
                              }} />{service.location_details}</li> {/* Location Details */}
                            </ul>
                          </div>
                          <div className="serv_details">
                            <ul>
                              <li>{removeHTMLTagsAndTruncate(service.information)}</li> {/* Additional info */}
                            </ul>
                            <Link to={`/service-single/${service.service_number}/${service.business_name}`}>read more <span>{`->`}</span></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center my-5 text-muted">
                  <div className="alert alert-warning d-flex align-items-center justify-content-center py-4 shadow-sm rounded">
                    <i className="bi bi-info-circle me-3 fs-2 text-warning"></i>
                    <span className="fw-medium">No services found.</span>
                  </div>
                </div>




              )}
            </div>

          </div>

          <div className="add_service">
            <h3>Add Your Service Listing</h3>
            <p>Create a listing in minutes! Highlight your expertise, choose your location, and let customers find you effortlessly</p>

            {token && <Link to="/service/servicefrom" className="link_btn"> Proceed<span>{`->`}</span></Link>}
            {!token && <button onClick={handelnavigate} className="link_btn"> Login<span>{`->`}</span></button>}
          </div>
          <RecentDeadNoticed ata={true} />
        </div>
      </section>
    </div>
  );
};

export default ServiceList;
