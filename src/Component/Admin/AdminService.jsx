import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminService = ({ token }) => {
  const [service, setService] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("Services"); // Default filter
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    icon: null, // Store file object
  });

  const [categorys,setCategorys] = useState([])

  
  
  const fetchService = async (page, reset = false) => {
    setLoading(true);
    try {
      let apiUrl =
        filter === "Services"
          ? `${import.meta.env.VITE_API_URL}admin/services/pagination`
          : `${import.meta.env.VITE_API_URL}admin/category/service`;
  
      if (filter === "Services") {
        const response = await axios.get(apiUrl, {
          params: {
            page,
            limit: 10,
            search: searchQuery,
          },
        });
  
        
  
        if (reset) {
          setService(response.data.services);
        } else {
          setService((prev) => [...prev, ...(response.data.services)]);
        }
  
        setTotalPages(response.data.totalPages);
      } else {
        const response = await axios.get(apiUrl,{
            params: {
              page,
              limit: 10,
              search: searchQuery,
            },
          });
      
        setCategorys(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchService(page, true);
  }, [page, filter, searchQuery]);
  

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "icon") {
      const file = files[0];
      if (file && file.type === "image/svg+xml") {
        setFormData((prev) => ({ ...prev, icon: file }));
      } else {
        alert("Please upload a valid SVG file.");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.serviceName || !formData.icon) {
      alert("Please fill all fields and upload a valid SVG icon.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("serviceName", formData.serviceName);
    formDataToSend.append("icon", formData.icon);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}admin/service/category`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setShowModal(false);
      fetchService(page, true);
    } catch (error) {
      console.error("Error adding service category:", error);
    }
  };

  return (
    <div className="container">
       <h1 className="mb-4 admin-title">Services</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <select className="form-select w-25 cus-drop-cat mat" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Services">Services</option>
          <option value="Service Category">Service Category</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="d-btn a-btn" onClick={() => setShowModal(true)}>Add Category</button>
      </div>

      <div className="table-responsive">
  {filter === "Services" && (
          <table className="table table-hover custom-table">
          <thead className="table-light">
            <tr>
              <th>Business Name</th>
              <th>County</th>
              <th>Location</th>
              <th>Service Category</th>
              <th>Published</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7">Loading...</td></tr>
            ) : service.length === 0 ? (
              <tr><td colSpan="7">No data found</td></tr>
            ) : (
              service.map((item, index) => (
                <tr key={index}>
                  <td>{item.business_name || item.serviceName}</td>
                  <td>{item.county || "N/A"}</td>
                  <td>{item.location_details ? (item.location_details.length > 10 ? item.location_details.slice(0, 10) + "..." : item.location_details) : "N/A"}</td>

                  <td>{item.business_type || "N/A"}</td>
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</td>
                  <td className={item.payment_status ? "text-success fw-bold" : "text-danger fw-bold"}>
                    {item.payment_status ? "Paid" : "Unpaid"}
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

  )}

  {filter !=="Services" && (
          <table className="table table-hover custom-table">
          <thead className="table-light">
            <tr>
              <th>serviceName</th>
              <th>offers</th>
           
              <th>Published</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7">Loading...</td></tr>
            ) : categorys.length === 0 ? (
              <tr><td colSpan="7">No data found</td></tr>
            ) : (
                categorys.map((item, index) => (
                <tr key={index}>
                  <td>{item.serviceName}</td>
                  <td>{item.offers || "N/A"}</td>
              
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</td>
                 
                  <td>
                 
                    <button className="btn btn-warning btn-sm me-2">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

  )}
        <div className="pagination-container mt-3">
          <button onClick={() => handlePagination(page - 1)} className="btn btn-outline-secondary btn-sm" disabled={page === 1}>
            Previous
          </button>
          <span className="mx-3">{page} / {totalPages}</span>
          <button onClick={() => handlePagination(page + 1)} className="btn btn-outline-secondary btn-sm" disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title admin-m-title">Add Service Category</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="serviceName"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Service Category Name"
                />
              </div>
              <div className="modal-body">
                <input
                  type="file"
                  name="icon"
                  onChange={handleChange}
                  className="form-control"
                  accept=".svg"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminService;
