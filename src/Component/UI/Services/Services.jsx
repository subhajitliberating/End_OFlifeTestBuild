import React from 'react';
import './Services.css'



import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect,useState } from 'react';



const Services = ({token,role}) => {

  const [services,SetService] = useState([])
  
  const navigate = useNavigate(); 
 

  const FetchServices = async () =>{
    try {
   const response =  await axios.get(`${import.meta.env.VITE_API_URL}user/recent/category`)
 

   SetService(response.data.data)
    }
    catch(err){
console.log(err)
    }
  }

useEffect(()=>{
  FetchServices()
},[])

  const fetchFilteredServices = async (businessType) => {
  
  
    try {
      // Make the API request with the provided filters
      const response = await axios.post(`${import.meta.env.VITE_API_URL}service/list`, {
        county: "",
        business_type: businessType ,
      });
  
      // Assuming the API response contains the filtered services data
      const filteredServices = response.data.service;
      // const filteredServices = response.data.services.map(service => ({
      //   ...service, // Spread the properties of each service
      //   county: county, // Add county to each service
      //   business_type: businessType // Add business_type to each service
      // }));
       console.log(filteredServices)
      // Navigate to the new page, passing the filtered services data as state
      navigate("/service-list", {
        state: { services: filteredServices }, // Pass the services as state
      }); 
    } catch (error) {
      console.error("Error fetching filtered services:", error);
    }
  };




  const handleServiceClick = (serviceName) => {

    fetchFilteredServices(serviceName);
     // Fetch filtered services by business type
  };

  const handelnavigate = () => {

    console.log("clicking......")
    if(role !== 'user'){
      navigate('/login', { state: { user: "user" } });
    }
    if(role === 'user'){
      navigate('/user/addnotice')
    }
   
  }

  return (
    <div className="noticebord">
    <div className="container notice-bord-container" >
        <div className="noticeboard-body">
        <h1 className='noticeboard-title'>
        Celebrate a Life,
        Share a Memory
        </h1>
        <p className='noticeboard-para'>
        Create a heartfelt notice to honor your loved one. Share their story, cherish their memory, and keep their legacy alive with family and friends.
        </p>
        <button onClick={handelnavigate} className='noticeboard-btn'>Create A Family Notice</button>

        {/* <Link to="addnotice" className='noticeboard-btn'> Create A Family Notice</Link> */}
        </div>
       
    </div>


    <div className="service-list">
      <div className="container custom-center-all">
        <h1 className="service-our-text">Our Services</h1>
        <div className="row cus-block">
        {services.map((service) => (
        
            <div key={service.id} className="col-lg-3 col-md-4 col-sm-6"  onClick={() => handleServiceClick(service.serviceName)}>
              <div className="service-card ">
                <div className='main-service-card'>
                    <div className='service-card-body'>
                    
                <img src={`${import.meta.env.VITE_API_URL}${service.icon.slice(7).replace(/\\/g, '/')}`} alt={service.serviceName} className="card-img-top" />
                <div className="service-card-body">
                  <h5 className="srevice-card-title">{service.serviceName}</h5>
                   <p className='service-offer'>  {service.offers} Offers</p>
                  <button className="service-card-btn">{service.viewMoreText}
                    <p className='service-btn-para'>{"->"}</p>
                  </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
            
          ))}
        </div>
        <Link to="/service-directory" style={{
          margin:'20px'
        }} className='short-cut-card-button'>View All Services
        <p className="btn-para">{"->"}</p>
        </Link>
      </div>
    </div>
    </div>

  );
};




export default Services;