

import React, { useState, useEffect, useRef } from 'react';
import './Map.css';
import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
import desktopMap from '../../../assets/desktop_map.svg';
import tabletMap from '../../../assets/tablet_map.svg';
import mobileMap from '../../../assets/mobile_map.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Map = () => {
  const [mapSrc, setMapSrc] = useState(desktopMap);
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const [data, setData] = useState({ DeathNotices: [] });
  const [ServiceData,setServiceData]= useState([])

  useEffect(() => {
    const updateMapSrc = () => {
      const width = window.innerWidth;
      if (width <= 768) setMapSrc(mobileMap);
      else if (width <= 1024) setMapSrc(tabletMap);
      else setMapSrc(desktopMap);
    };

    updateMapSrc();
    window.addEventListener('resize', updateMapSrc);
    return () => window.removeEventListener('resize', updateMapSrc);
  }, []);

  const handleClick = (e) => {
    const county = e.target.getAttribute('id')?.split('-')[0] || '';
    navigate(`/deathnotice/${county}`, { state: { countyName: county } });
  };

  const fetchCountyData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}directore/notices/week`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching county data:', error);
      setData({ DeathNotices: [] });
    }
  };
  const fetchCountyServiceData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}service/county`);
      setServiceData(response.data.
        services
        );
     
    } catch (error) {
      console.error('Error fetching county data:', error);
      setServiceData( [] );
    }
  };

  useEffect(() => {
    fetchCountyData();
    fetchCountyServiceData()
  }, [setData]);

  return (
    <div className="map-container" ref={mapContainerRef}>
      <ReactSVG
        src={mapSrc}
        beforeInjection={(svg) => {
          const paths = svg.querySelectorAll('path');
          paths.forEach((path) => {
            path.addEventListener('click', handleClick);
            const county = path.getAttribute('id')?.split('-')[0] || '';
            path.setAttribute('data-tooltip-id', 'county-tooltip');
            path.setAttribute('data-county', county);
          });
        }}
      />

      <Tooltip
        id="county-tooltip"
        place="top"
        style={{
          backgroundColor: '#e8e8e7',
          color: '#000',
          borderRadius: '15px',
          padding: '13px',
          width: '285px',
          boxShadow: 'inset 0 0 3.5px rgba(255, 255, 255, 0.93)',
          backgroundImage: 'linear-gradient(0deg, #d8d8d6 0%, #fffeff 100%)',
          border: '1px solid #155c78',
          zIndex: 1000
        }}
        render={({ activeAnchor }) => {
          const county = activeAnchor?.getAttribute('data-county');
          const noticesCount = data.DeathNotices.filter(
            notice => notice.county === county
          ).length;
          const serviceCount = ServiceData.filter(
            notice => notice.county === county
          ).length

          return (
            <div>
              <p className='map-countyName'>{county}</p>
              <p className='map-notices'>
                <b>{noticesCount}</b> Notices This Week
              </p>
                   <p className='map-services'>
                <b>{serviceCount}</b> Services Director
          </p>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Map;