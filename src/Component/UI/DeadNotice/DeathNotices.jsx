import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DeathNotices.css";

const DeathNotices = () => {
  const [deathNotices, setDeathNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeathNotices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}directore/notices/recent`);
        setDeathNotices(response.data.recentDeathNotices);
      } catch (err) {
        setError("Failed to fetch death notices.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeathNotices();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="death-notices">
      <h2 className="death-header">Featured Death Notices</h2>
      <div className="death-notices-container">
        <div className="notices-scroll">
          {deathNotices.map((notice, index) => (
            <Link
              key={index}
              to={`/noticesview/${encodeURIComponent(notice.name)}-${encodeURIComponent(notice.surname)}-${encodeURIComponent(notice.notice_number)}`}
             
            >
              <div className="notice-card">
                <img
                  className="notice-image"
                  src={`${import.meta.env.VITE_API_URL}${notice.frist_image.slice(7).replace(/\\/g, '/')}`}
                  alt={notice.name}
                />
                <div className="notice-details">
                  <h4>{notice.name}</h4>
                  <p>{notice.county}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeathNotices;
