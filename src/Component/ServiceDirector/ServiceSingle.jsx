import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import '../../assets/css/business_details.css';
import { IoLocationSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoEarth } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import dummybanar from '../../assets/dummybanar.png';
const ServiceSingle = ({token,role}) => {

  const navigate = useNavigate();

  
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const { id } = useParams();
  const [service, setService] = useState(null);

  
  useEffect(() => {
    // Fetch service data from API
    const fetchService = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}service/service/${id}`);
        setService(response.data);
      } catch (err) {
        

        setError("Failed to load service details");
        navigate('*')
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);


  const handelnavigate = () => {
    if(role !== "service provider"){
      navigate('/login', { state: { user: "service provider" } });
    }
    if(role === "service provider"){
    
      navigate('/service/servicefrom');
    }   
  }

  // Show loading, error, or the actual data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cus-mt-170">
      {service && (
        <section className="business_details ">
          <div className="container">
            <div className="heading_page text-center">
              <h1>{service.business_name}</h1>
            </div>
            <div className="business_details_box">
              <div className="business_box_header">
                <div className="row">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="business_logo_section">
                          <img className="logo-service"
                            src={`${import.meta.env.VITE_API_URL}${service.logo.slice(7).replace(/\\/g, '/')}`}
                            alt={service.business_name}
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="business_deatils">
                          <span>{service.business_type}</span>
                          <p>{service.business_name}</p>
                          <ul>
                            <li className="cus-li-loction"> <IoLocationSharp size={20} style={{
                              margin:'2px'
                            }}/><div>{service.location_details}</div></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="contact_info">
                      <ul>
                        <li>
                          <a href={service.website} target="_blank">
                          <IoCall size={20} style={{
                                marginRight:'10px',
                            }} className="fa-solid fa-globe"/>
                           {service.website}
                          </a>
                        </li>
                        <li>
                          <a href={`mailto:${service.email}`}>
                            <CiMail  size={20} style={{
                              marginRight:'10px',
                            }} className="fa-solid fa-envelope"/>{service.email}
                          </a>
                        </li>
                        <li>
                          <a href={`tel:${service.phone}`}>
                            <IoEarth  size={20} style={{
                              marginRight:'10px',
                            
                            }} className="fa-solid fa-phone"/> {service.phone}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="business_content_box">
                <div className="image_business">
               
                  <img
                  className="banner-service"
                  src={ `${import.meta.env.VITE_API_URL}${service.banner ? service.banner?.slice(7).replace(/\\/g, '/') : dummybanar}`} alt={service.business_name} />
                </div>
                <div className="content_business">
                <div
            className="border p-3"
            dangerouslySetInnerHTML={{ __html: service.information }} // Display content as HTML
          />
                </div>
              </div>
            </div>
            <div className="add_service">
              <h3>Add Your Service Listing</h3>
              <p>Create a listing in minutes! Highlight your expertise, choose your location, and let customers find you effortlessly.</p>
             
           <button onClick={handelnavigate} className="link_btn"> Proceed<span>{`->`}</span></button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceSingle;
