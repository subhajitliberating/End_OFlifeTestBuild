


import React, { useState, useEffect } from "react";
import './ServiceDirector.css';

import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import ServiceSearch from "../UI/ServiceSearch/ServiceSearch";

const ServiceDirector = () => {

  const [selectedBusinessType, setSelectedBusinessType] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const category = location.state?.category;


  useEffect(()=>{
   
if(category){

  fetchFilteredServices('',category)
}
  },[category])
  useEffect(() => {
    fetchService(page, true);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const fetchService = async (page, reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}user/services/pagination`, {
        params: {
          page,
          limit: 10,
        },
      });

      

      if (reset) {
        
        setServices(response.data.data);
      } else {
        setServices((prev) => [...prev, ...response.data.data]);
      }

      setHasMore(response.data.data.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

    if (scrollPercentage >= 55 && !loading && hasMore) {
      setPage((prev) => {
        const nextPage = prev + 1;
        fetchService(nextPage);
        return nextPage;
      });
    }
  };

  const handleServiceClick = (serviceName) => {
    setSelectedBusinessType(serviceName);
    fetchFilteredServices('all', serviceName);
  };

  const fetchFilteredServices = async (county, businessType) => {

    const countyParam = county || "all";
    const businessTypeParam = businessType || "all";

      
      navigate(`/service-list/${countyParam}/${businessTypeParam}` );
   
  };

  return (
    <div className="cus-mt-170">
      <ServiceSearch services={services} />
      <div className="container">
        <div className="row my-5">
          {services.map((service) => (
            <div key={service.id} className="col-lg-3 col-md-4 col-sm-12">
              <div className="service-card">
                <div className="main-service-card">
                  <div className="service-card-body" onClick={() => handleServiceClick(service.serviceName)}>
                    <img src={`${import.meta.env.VITE_API_URL}${service.icon.slice(7).replace(/\\/g, '/')}`} alt={service.serviceName} className="card-img-top" />
                    <div className="service-card-body">
                      <h5 className="srevice-card-title">{service.serviceName}</h5>
                      <p className="service-offer"> {service.offers} Offers</p>
                      <button className="service-card-btn">
                        {service.viewMoreText}
                        <p className="service-btn-para">{"->"}</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ServiceDirector;
