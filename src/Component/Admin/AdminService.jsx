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
    id:0,
    serviceName: "",
    icon: null, // Store file object
  });
  const [alertMessage, setAlertMessage] = useState(""); // State for the alert message
  const [alertType, setAlertType] = useState("");
  const [categorys,setCategorys] = useState([])
   const [DeletedModal,setDeletedMOdal]=useState(false)
    const [DeletedId,setDeletedID]=useState(0)
    const [editeMOdal,setEditeModal]=useState(false)
    const [editData,setEditData]=useState({})
  const [status, setStatus] = useState(false);
  
  
  const fetchService = async (page, reset = false) => {
    setLoading(true);
    try {
        let apiUrl =
            filter === "Services"
                ? `${import.meta.env.VITE_API_URL}admin/services/pagination`
                : `${import.meta.env.VITE_API_URL}admin/category/service`;

        const params = {
            page,
            limit: 10,
            search: searchQuery, // Pass the search query
        };

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params,
        });

        if (filter === "Services") {
            if (reset) {
                setService(response.data.services);
            } else {
                setService((prev) => [...prev, ...response.data.services]);
            }
            setTotalPages(response.data.totalPages);
        } else {
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
  }, [page, filter, searchQuery,editeMOdal,DeletedModal,showModal]);
  

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
      setAlertMessage("Please fill all fields and upload a valid SVG icon.");
      setAlertType("danger");

      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("serviceName", formData.serviceName);
    formDataToSend.append("icon", formData.icon);

    try {

      if(formData.id !== 0){
        await axios.put(`${import.meta.env.VITE_API_URL}admin/service/type/edite`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      else{
        await axios.post(`${import.meta.env.VITE_API_URL}admin/service/category`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
 


      fetchService(page, true);
      setAlertMessage( formData.id ===0 ? "Service category created successfully.." : "Service category updated successfully." );
      setAlertType("success");
      setShowModal(false)
    } catch (error) {
      console.error("Error adding service category:", error);
    }
  };
  const handelServiceCategoryEdite= (item)=>{

    setShowModal(true)
    setFormData(
      {
        id: item.id,
        serviceName : item.serviceName,
        icon : '',
      }
    )
  }

  const handleDelete = (id) => {
    setDeletedMOdal(true)
    setDeletedID(id)
   };
 
   const confirmDelete = async () => {
     try {
 
       await axios.delete(
        
         `${import.meta.env.VITE_API_URL}${filter === 'Services' ? "admin/service/deleted/admin" : "admin/service/type/deleted"}`,
         {
           data: { ids: DeletedId },
           headers: { Authorization: `Bearer ${token}` }
         }
       );
       setAlertMessage("Notice deleted successfully.");
       setAlertType("success");
       setDeletedMOdal(false)
     fetchService()
      
     } catch (err) {
      console.log(err)
       console.error("Delete error:", err);
       setAlertMessage("Failed to delete notice.");
       setAlertType("danger");
     }
   };
   const handelEdite = (data)=>{
    console.log(data.provider,"dnjahdabg")
    setEditData(data)
    setEditeModal(true)
    
      }
      const handleEditeSubmit = async () =>{
    console.log(editData,"editeData")
        try {
          const response = await axios.put(`${import.meta.env.VITE_API_URL}admin/service/status`,{status :status ,id:editData.id},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          setAlertMessage("Status updated successfully.");
          setAlertType("success");
        
          setEditeModal(false)
        }
        catch(error){
          console.log(error)
          setAlertMessage("Failed to update status.");
          setAlertType("danger");
        }
      }

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
      {alertMessage && (
        <div className={`alert alert-${alertType} mt-3`} role="alert">
          {alertMessage}
        </div>
      )}
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
              <th>Status</th>
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
                  <td
              className={
                item.status ? "text-success fw-bold" : "text-danger fw-bold"
              }
            >
              {item.status ? "Active" : "Deactivate"}
            </td>
                  <td>
                  <button className="btn btn-warning btn-sm me-2"   onClick={() => handelEdite(item)}>Edit</button>
                    <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(item.id)}>Delete</button>
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
                  {filter !=="Services" &&(
                       <button className="btn btn-warning btn-sm me-2" onClick={() => handelServiceCategoryEdite(item)}>Edit</button>
                  )}
               
                   
                    <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(item.id)}>Delete</button>
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
  <div className="custom-modal__overlay" >
    <div className="custom-modal__container">
      <div className="custom-modal__content custom-modal__content--primary" >
        <div className="custom-modal__header" >
        <i className="custom-modal__icon bi bi-file-earmark-plus"></i>
        <h3 className="custom-modal__title">Add Service Category</h3>
          <button className="custom-modal__close" onClick={() => setShowModal(false)} >  &times;</button>
        </div>
        <div className="custom-modal__body" >
        <div className="custom-modal__input-group">
        <label className="custom-modal__label">Service Name</label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Enter Service Category Name"
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ced4da' }}
          />
          </div>
          <div className="custom-modal__input-group">
          <label className="custom-modal__label">Icon</label>
          <input
            type="file"
            name="icon"
            
            onChange={handleChange}
            className="form-control"
            accept=".svg"
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ced4da' }}
          />
          </div>
        </div>
        <div className="custom-modal__footer" >
          <button
            className="custom-modal__btn custom-modal__btn--secondary"
            onClick={() => setShowModal(false)}
           
          >
            Cancel
          </button>
          <button
            className="custom-modal__btn custom-modal__btn--primary"
            onClick={handleSubmit}
           
          >
              <i className="bi bi-check2-circle me-2"></i>
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
)}
{editeMOdal && (
  <div className="custom-modal__overlay">
    <div className="custom-modal__container">
      <div className="custom-modal__content custom-modal__content--warning">
        <div className="custom-modal__header">
          <i className="custom-modal__icon bi bi-toggle-on"></i>
          <h3 className="custom-modal__title">Update Status Settings</h3>
          <button className="custom-modal__close" onClick={() => setEditeModal(false)}>
            &times;
          </button>
        </div>
        <div className="custom-modal__body">
          <div className="custom-modal__input-group">
            <label className="custom-modal__label">Current Status</label>
            <div className="custom-modal__select-wrapper">
              <select
                className="custom-modal__select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={true}>🟢 Active</option>
                <option value={false}>🔴 Archived</option>
              </select>
              <i className="custom-modal__select-arrow bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
        <div className="custom-modal__footer">
          <button className="custom-modal__btn custom-modal__btn--secondary" onClick={() => setEditeModal(false)}>
            Cancel
          </button>
          <button className="custom-modal__btn custom-modal__btn--warning" onClick={handleEditeSubmit}>
            <i className="bi bi-save2 me-2"></i>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Delete Confirmation Modal */}
{DeletedModal && (
  <div className="custom-modal__overlay">
    <div className="custom-modal__container">
      <div className="custom-modal__content custom-modal__content--danger">
        <div className="custom-modal__header">
          <i className="custom-modal__icon bi bi-exclamation-octagon"></i>
          <h3 className="custom-modal__title">Confirm Deletion</h3>
          <button className="custom-modal__close" onClick={() => setDeletedMOdal(false)}>
            &times;
          </button>
        </div>
        <div className="custom-modal__body">
          <div className="custom-modal__delete-content">
            <div className="custom-modal__delete-icon">
              <i className="bi bi-trash3"></i>
            </div>
            <p className="custom-modal__delete-text">
              You're about to permanently delete this Service and all related data.
              <br />
              <strong>This action cannot be undone!</strong>
            </p>
          </div>
        </div>
        <div className="custom-modal__footer">
          <button className="custom-modal__btn custom-modal__btn--secondary" onClick={() => setDeletedMOdal(false)}>
            <i className="bi bi-x-circle me-2"></i>
            Cancel
          </button>
          <button className="custom-modal__btn custom-modal__btn--danger" onClick={confirmDelete}>
            <i className="bi bi-trash3 me-2"></i>
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default AdminService;
