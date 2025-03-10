import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Style.css';

const AdminSettings = ({ token }) => {

const [price,setPrice]=useState()
const [id,setID]=useState()
const [ServicePrice,setServicePrice]=useState()
const [ServiceID,setServiceID]=useState()
  const [settings, setSettings] = useState({
    deathNoticePrice: 0,
    publicationDurations: [],
    paymentMethods: [],
    notificationSettings: {},
    newPrice: '',
    newDuration: '',
    editingPrice: null,
    showPriceModal: false,
    showDurationModal: false
  });

  useEffect(() => {
    fetchPrice();
    fetchServicePrice()
  }, []);

  const fetchPrice = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}admin/price`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    //   setSettings(prev => ({
    //     ...prev,
    //     ...response.data,
    //     publicationDurations: response.data.publicationDurations || [],
    //     paymentMethods: response.data.paymentMethods || []
    //   }));


    console.log(response.data.price)
    setPrice(response.data.price[0].price)
    setID(response.data.price[0].id)
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchServicePrice = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}admin/service/price`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    //   setSettings(prev => ({
    //     ...prev,
    //     ...response.data,
    //     publicationDurations: response.data.publicationDurations || [],
    //     paymentMethods: response.data.paymentMethods || []
    //   }));


    console.log(response.data.price)
    setServicePrice(response.data.price[0].price)
    setServiceID(response.data.price[0].id)
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handlePriceUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}admin/update/price`, 
        { price: price,id:id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Price updated successfully');
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };
  const handleServicePriceUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}admin/service/update/price`, 
        { price: ServicePrice,id:ServiceID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Price updated successfully');
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  const handleAddDuration = async () => {
    if (!settings.newDuration) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}admin/settings/durations`, 
        { duration: settings.newDuration },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSettings(prev => ({
        ...prev,
        publicationDurations: [...prev.publicationDurations, settings.newDuration],
        newDuration: ''
      }));
    } catch (error) {
      console.error('Error adding duration:', error);
    }
  };

  const handleDeleteDuration = async (duration) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}admin/settings/durations`, {
        data: { duration },
        headers: { Authorization: `Bearer ${token}` }
      });
      setSettings(prev => ({
        ...prev,
        publicationDurations: prev.publicationDurations.filter(d => d !== duration)
      }));
    } catch (error) {
      console.error('Error deleting duration:', error);
    }
  };

  return (
    <div className="admin-settings-container">
      {/* Death Notice Pricing Section */}
      <div className="settings-section">
        <h2 className="section-title">Death Notice Pricing</h2>
        <form onSubmit={handlePriceUpdate} className="price-form">
          <div className="form-group">
            <label>Current Price (€)</label>
            <input
              type="number"
              value={price}
            //   onChange={(e) => setSettings(prev => ({
            //     ...prev,
            //     deathNoticePrice: parseFloat(e.target.value)
            //   }))}

            onChange={(e)=>{
                setPrice(e.target.value)
            }}
              className="prime-input"
              min="0"
              step="0.01"
            />
          </div>
          <button type="submit" onClick={handlePriceUpdate} className="prime-btn primary">
            Update Price
          </button>
        </form>
      </div>
      <div className="settings-section">
        <h2 className="section-title">Service Pricing</h2>
        <form onSubmit={handlePriceUpdate} className="price-form">
          <div className="form-group">
            <label>Current Price (€)</label>
            <input
              type="number"
              value={ServicePrice}
            //   onChange={(e) => setSettings(prev => ({
            //     ...prev,
            //     deathNoticePrice: parseFloat(e.target.value)
            //   }))}

            onChange={(e)=>{
                setServicePrice(e.target.value)
            }}
              className="prime-input"
              min="0"
              step="0.01"
            />
          </div>
          <button type="submit" onClick={handleServicePriceUpdate} className="prime-btn primary">
            Update Service Price
          </button>
        </form>
      </div>
      {/* Publication Durations Section */}
      <div className="settings-section">
        <h2 className="section-title">Home Page Setting</h2>
        {/* <div className="duration-controls">
          <input
            type="number"
            value={settings.newDuration}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              newDuration: e.target.value
            }))}
            className="prime-input"
            placeholder="Add new duration (days)"
          />
          <button 
            onClick={handleAddDuration}
            className="prime-btn success"
          >
            Add Duration
          </button>
        </div>
        
        <div className="duration-list">
          {settings.publicationDurations.map((duration, index) => (
            <div key={index} className="duration-item">
              <span>{duration} days</span>
              <button
                onClick={() => handleDeleteDuration(duration)}
                className="prime-btn danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div> */}
      </div>

      {/* Payment Methods Section */}
      {/* <div className="settings-section">
        <h2 className="section-title">Payment Methods</h2>
        <div className="payment-methods">
          {settings.paymentMethods.map((method, index) => (
            <div key={index} className="method-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={method.enabled}
                  onChange={async (e) => {
                    try {
                      await axios.post(
                        `${import.meta.env.VITE_API_URL}admin/settings/payment-methods`,
                        { method: method.name, enabled: e.target.checked },
                        { headers: { Authorization: `Bearer ${token}` } }
                      );
                      const updatedMethods = [...settings.paymentMethods];
                      updatedMethods[index].enabled = e.target.checked;
                      setSettings(prev => ({ ...prev, paymentMethods: updatedMethods }));
                    } catch (error) {
                      console.error('Error updating payment method:', error);
                    }
                  }}
                />
                <span className="slider"></span>
              </label>
              <span className="method-name">{method.name}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Notification Settings Section */}
      {/* <div className="settings-section">
        <h2 className="section-title">Notification Settings</h2>
        <div className="notification-settings">
          <div className="setting-item">
            <label>Email Notifications</label>
            <select
              value={settings.notificationSettings.emailFrequency || ''}
              onChange={async (e) => {
                try {
                  await axios.post(
                    `${import.meta.env.VITE_API_URL}admin/settings/notifications`,
                    { emailFrequency: e.target.value },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  setSettings(prev => ({
                    ...prev,
                    notificationSettings: {
                      ...prev.notificationSettings,
                      emailFrequency: e.target.value
                    }
                  }));
                } catch (error) {
                  console.error('Error updating notification settings:', error);
                }
              }}
              className="prime-select"
            >
              <option value="instant">Instant</option>
              <option value="daily">Daily Summary</option>
              <option value="weekly">Weekly Summary</option>
            </select>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AdminSettings;