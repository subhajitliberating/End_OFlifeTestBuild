import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

const NoticeView = () => {
  const { name: fullParam } = useParams(); // Get the full param (name-surname-noticeNumber)

  // State to store extracted values
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [noticeNumber, setNoticeNumber] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract name, surname, and noticeNumber from the param
  useEffect(() => {
    if (fullParam) {
      const parts = fullParam.split('-'); // Split by hyphen

      if (parts.length === 3) {
        setName(parts[0]); // First part is name
        setSurname(parts[1]); // Second part is surname
        setNoticeNumber(parts[2]); // Third part is noticeNumber
      }
    }
  }, [fullParam]);

  // Fetch data after extracting values
  useEffect(() => {
    if (name && surname && noticeNumber) {
      const fetchNotice = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}user/noticeview/${name}/${surname}/${noticeNumber}`);

          setData(response.data.notice
          );
        } catch (err) {
          setError('Failed to load notice data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchNotice();
    }
  }, [name, surname, noticeNumber]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No notice data available</div>;

  return (
    <section className="acknowledgement cus-mt-180">
      <div className="container">
        <div className="box">
          <div className="top-panel">
            <h3 className="acknowledgement-title">{data.item || "Death Notice"}</h3>
            <div className="user-img">
              <div className="photo">
                <img
                  src={`${import.meta.env.VITE_API_URL}${data.frist_image?.slice(7).replace(/\\/g, '/')}`}
                  alt="User"
                />
              </div>
            </div>
          </div>
          <div className="middle-panel">
            <h3 className="acknowledgement-title">{data.name} {data.surname}</h3>
            <p>{data.county}</p>

          </div>
          <div className="bottom-panel" dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
      </div>
    </section>
  );
};

export default NoticeView;
