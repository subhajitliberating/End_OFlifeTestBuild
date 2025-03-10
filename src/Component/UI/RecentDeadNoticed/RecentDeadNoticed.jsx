
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";  // Import Axios
import "./RecentDeadNoticed.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
function RecentDeadNoticed({ata}) {
  const [deathNotices, setDeathNotices] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    margin:10,
    arrows: false,
   
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Fetch data using Axios
  useEffect(() => {
    const fetchDeathNotices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}directore/notices/recent`);  // Call the backend endpoint
        setDeathNotices(response.data.recentDeathNotices); 
       
        
        // Set the fetched data
      } catch (err) {
        setError("Failed to fetch death notices.");
        console.error(err);
      } finally {
        setLoading(false);  // Set loading to false after the request is completed
      }
    };

    fetchDeathNotices();  // Call the function to fetch data
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if there's any issue
  }

  return (
    <div className="recent-death-notice" style={ ata ? {paddingBottom : '20px'}:{paddingBottom:'350px'}}>
      <div className="container custom-center-all">
        <h1 className="recent-death-notice-heading">Recent Death Notices</h1>
        <div className="slider-container">
          <Slider {...settings}>
            {deathNotices.map((notice,index) => (
              <div key={index} className="card-custom">
                  <Link   to={`/noticesview/${encodeURIComponent(notice.name)}-${encodeURIComponent(notice.surname)}-${encodeURIComponent(notice.notice_number)}`}>
                <div className="img-div">
                  <img
                     src={`${import.meta.env.VITE_API_URL}${notice.frist_image.slice(7).replace(/\\/g, '/')}`} // Fallback to default if no image
                    alt={notice.name}
                    className="card-img"
                  />
                </div>
                <div className="card-text">
                  <h3 className="card-name">{notice.name}</h3>
                  <p className="card-text">{notice.town + " "+ notice.county}</p>
                </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default RecentDeadNoticed;
