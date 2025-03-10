import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController
);
import "./Style.css"
const AdminDashboard = ({token}) => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [familyNotices, setFamilyNotices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddDirectory, setShowAddDirectory] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [directoryForm, setDirectoryForm] = useState({
    name: '',
    username: '',
    role: 'directory',
    email: '',
    password: ''
  });
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });


  const handleAddDirectory = async (e) => {
    e.preventDefault();
 
    setShowAddDirectory(false);

    try {
      
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,  
            },
        };

        // Send the POST request with the token in the headers
        const response = await axios.post(`${import.meta.env.VITE_API_URL}admin/register/users`, directoryForm, config);
        alert("Registration successful!");
   
    } catch (error) {
        console.error("Error during registration:", error);
        alert("There was an error during registration. Please try again.");
    }

    // Reset form after submission
    setDirectoryForm({ name: '', username: '', role: 'directory', email: '', password: '' });
};


  const handleAddCategory = (e) => {
    e.preventDefault();
  
    setShowAddCategory(false);
    setCategoryForm({ name: '', description: '' });
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from localStorage (or sessionStorage, adjust as needed)
     


        // Set the Authorization header with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch data with the token in the Authorization header
        const [noticesRes, servicesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}admin/notices`, config),
          axios.get(`${import.meta.env.VITE_API_URL}admin/services`, config),
        ]);

     
        setFamilyNotices(noticesRes.data.familyNotices);
        setServices(servicesRes.data.services);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    
    fetchData();
  }, []);

  // Calculate totals
  const calculateTotals = (data) => {
    const now = new Date();
    const filterDate = new Date(now);
    
    switch(timeFilter) {
      case 'today':
        filterDate.setHours(0,0,0,0);
        break;
      case 'week':
        filterDate.setDate(filterDate.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(filterDate.getMonth() - 1);
        break;
      case 'year':
        filterDate.setFullYear(filterDate.getFullYear() - 1);
        break;
      default: // all time
        filterDate.setFullYear(2000);
    }

    return data.filter(item => new Date(item.createdAt) >= filterDate);
  };

  // Filtered data
  const filteredNotices = calculateTotals(familyNotices);
  const filteredServices = calculateTotals(services);

  // Payment calculations
  const totalNotices = filteredNotices.length;
  const totalServicesCount = filteredServices.length;
  const totalNoticePayments = filteredNotices.reduce((sum, notice) => sum + (notice.payment || 0), 0);
  const totalServicePayments = filteredServices.reduce((sum, service) => sum + (service.payment || 0), 0);

  // Chart data configuration
  const getChartData = (data) => {
    const now = new Date();
    const groupBy = timeFilter === 'week' ? 'day' : 'month';
    const labels = [];
    const values = [];

    if (groupBy === 'day') {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString());
        values.push(data.filter(item => 
          new Date(item.createdAt).toDateString() === date.toDateString()
        ).reduce((sum, item) => sum + (item.payment || 0), 0));
      }
    } else {
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        labels.push(date.toLocaleString('default', { month: 'short' }));
        values.push(data.filter(item => 
          new Date(item.createdAt).getMonth() === date.getMonth() &&
          new Date(item.createdAt).getFullYear() === date.getFullYear()
        ).reduce((sum, item) => sum + (item.payment || 0), 0));
      }
    }

    return { labels, values };
  };

  // Chart datasets
  const noticesChartData = getChartData(familyNotices);
  const servicesChartData = getChartData(services);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Payment Trends' }
    },
    scales: { y: { beginAtZero: true } }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-fluid ">
      <h1 className="mb-4 admin-title">Admin Dashboard</h1>

      {/* Time Filter */}
      <div className="row mb-3">
        <div className="col-md-12">
          <select 
            className="form-control"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        {[
          { 
            title: 'Family Notices', 
            value: totalNotices,
            payment: totalNoticePayments.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
            color: 'primary' 
          },
          { 
            title: 'Services', 
            value: totalServicesCount,
            payment: totalServicePayments.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }),
            color: 'success' 
          },
        ].map((stat, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className={`card bg-${stat.color} text-white p-3`}>
              <h5>{stat.title}</h5>
              <div className="d-flex justify-content-between">
                <div>
                  <h2>{stat.value}</h2>
                  <small>Total Count</small>
                </div>
                <div>
                  <h2>{stat.payment}</h2>
                  <small>Total Payments</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <div className="card p-3 h-100">
            <h4>Family Notices Payments</h4>
            <div className="chart-container">
              <Line 
                data={{
                  labels: noticesChartData.labels,
                  datasets: [{
                    label: 'Payments',
                    data: noticesChartData.values,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4
                  }]
                }}
                options={chartOptions}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3 h-100">
            <h4>Services Payments</h4>
            <div className="chart-container">
              <Bar 
                data={{
                  labels: servicesChartData.labels,
                  datasets: [{
                    label: 'Payments',
                    data: servicesChartData.values,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                  }]
                }}
                options={chartOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your management sections... */}
   


      {/* Management Section */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Funeral Director</h4>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddDirectory(!showAddDirectory)}
              >
                {showAddDirectory ? 'Cancel' : 'Add Director'}
              </button>
            </div>

            {showAddDirectory && (
              <form onSubmit={handleAddDirectory}>
                {['name', 'username',  'email', 'password'].map((field) => (
                  <div key={field} className="mb-3">
                    <input
                      type={field === 'email' ? 'email' : field === "password" ? 'password' : 'text'}
                      className="form-control"
                      placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      value={directoryForm[field]}
                      onChange={(e) => setDirectoryForm({...directoryForm, [field]: e.target.value})}
                      required
                    />
                  </div>
                ))}
                <button type="submit" className="btn btn-success">Add Director</button>
              </form>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Service Categories</h4>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddCategory(!showAddCategory)}
              >
                {showAddCategory ? 'Cancel' : 'Add Category'}
              </button>
            </div>

            {showAddCategory && (
              <form onSubmit={handleAddCategory}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">Add Category</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;