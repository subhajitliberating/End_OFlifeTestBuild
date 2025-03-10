import React from "react";
import irelandCounty from "../../../Service/irelandCounty";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ServiceSearch = ({ }) => {




  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState('');
  const [services, setService] = useState([])



  const GetServiceCategory = async () => {

    try {
      const respons = await axios.get(`${import.meta.env.VITE_API_URL}user/service/category`)



      setService(respons.data.notices)
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    GetServiceCategory()
  }, [])



  const navigate = useNavigate();


  const handleCountyChange = (e) => {
    setSelectedCounty(e.target.value);
  };


  const handleBusinessTypeChange = (e) => {
    setSelectedBusinessType(e.target.value);
  };


  const handleSearch = async () => {
    const countyParam = selectedCounty || "all";
    const businessTypeParam = selectedBusinessType || "all";

    navigate(`/service-list/${countyParam}/${businessTypeParam}`);
  };



  return (
    <div className="container">
      <h1 className="text-center cus-service">Services Directory</h1>

      <div className="row align-items-center">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <p className="cat-search">Search For A Service</p>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <select
            className="form-control cus-drop-cat"
            name="county"
            value={selectedCounty}
            onChange={handleCountyChange}
          >
            <option value="">County</option>
            {irelandCounty.map((county, index) => (
              <option key={index} value={county.county}>
                {county.county}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <select
            className="form-control cus-drop-cat"
            name="businessType"
            value={selectedBusinessType}
            onChange={handleBusinessTypeChange}
          >
            <option value="">Select Business Type</option>
            {services.map((service, index) => (
              <option key={index} value={service.serviceName}>
                {service.serviceName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="d-flex align-items-center justify-content-between cus-search-btn-div">
            <button className="sarch-cat-btn" onClick={handleSearch}>
              <span> Search </span> <span style={{ padding: "0px", fontSize: "30px" }}>{"->"}</span>
            </button>

          </div>
        </div>
      </div>



    </div>
  )
}

export default ServiceSearch