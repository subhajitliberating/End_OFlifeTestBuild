import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css"
const AdminNotices = ({token,family,death}) => {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("family"); // Default filter
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [formData,setFormData] = useState({
    item:"",
    price : 0
  })
  const [DeletedModal,setDeletedMOdal]=useState(false)
  const [DeletedId,setDeletedID]=useState(0)
  const [editeMOdal,setEditeModal]=useState(false)
  const [editData,setEditData]=useState({})
  const [alertMessage, setAlertMessage] = useState(""); // State for the alert message
  const [alertType, setAlertType] = useState("");


  const handelEdite = (data)=>{
setEditData(data)
setEditeModal(true)
  }

  const fetchNotices = async (page, reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${family ? "admin/notices/list" : death ?  "admin/death/list" : 'admin/notice/type/list'}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            limit: 10,
            search: searchQuery,
          },
        }
      );

      if (reset) {
        setNotices(response.data.notices);
      } else {
        setNotices((prev) => [...prev, ...response.data.notices]);
      }
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(page, true);
  }, [page, searchQuery, family,death]);

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const handelChang =(e)=>{
  const {name,value} = e.target
  setFormData((prev) => ({...prev, [name]: value}))


    
  }

  const handleEditeSubmit = async () =>{
    // console.log(editData,"editeData")
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}${family ? "admin/status/chang" : death ? "admin/death/chang" : ''}`,{status :status ,id:editData.id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setAlertMessage("Status updated successfully.");
      setAlertType("success");
      fetchNotices(page, true);
      setEditeModal(false)
    }
    catch(error){
      console.error(error)
      setAlertMessage("Failed to update status.");
      setAlertType("danger");
    }
  }

  const handleSubmit = async () => {
    // console.log(token)
    try {
      const response = await axios.post(
        
        `${import.meta.env.VITE_API_URL}admin/notice/type`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
      );
      setShowModal(false);
      setAlertMessage("Notice Type added successfully.");
      setAlertType("success");
      setShowModal(false)
      // Handle the response as needed
    } catch (error) {
      setAlertMessage("Failed to add notice type.");
      setAlertType("danger");
    }
  };


  
  const handleDelete = (id) => {
   setDeletedMOdal(true)
   setDeletedID(id)
  };

  const confirmDelete = async () => {
    try {

      await axios.delete(
       
        `${import.meta.env.VITE_API_URL}${family ? "admin/famaliy/delete" : death ?  "admin/death/deleted" : 'admin/notice/type/deleted'}`,
        {
          data: { ids: DeletedId },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setAlertMessage("Notice deleted successfully.");
      setAlertType("success");
      setDeletedMOdal(false)
      fetchNotices(page,true)
     
    } catch (err) {
      console.error("Delete error:", err);
      setAlertMessage("Failed to delete notice.");
      setAlertType("danger");
    }
  };


  return (
    <div className="container">
        <h1 className="mb-4 admin-title">{family ? 'Family Notices' : death ? 'Death Notices' : ' Notices Type '}</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* <label>Select Notice</label> */}
        {/* <select className="form-select w-25 cus-drop-cat mat" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="family">Family Notice</option>
          <option value="death">Death Notice</option>
        </select> */}
        <input
          type="text"
          placeholder="Search notices..."
          className="form-control w-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="d-btn a-btn" onClick={() => setShowModal(true)}>Add Notice Type</button>
      </div>

      <div className="table-responsive">
      {alertMessage && (
        <div className={`alert alert-${alertType} mt-3`} role="alert">
          {alertMessage}
        </div>
      )}
      <table className="table table-hover custom-table">
  <thead className="table-light">
    <tr>
      {!family && !death && <th>Item</th>}
      {(family || death) && <th>Name</th>}
      {(family || death) && <th>Town</th>}
      {(family || death) && <th>County</th>}
      {family && <th>Type of Notice</th>}
      {(family || death)  && ( <th>Published</th>)}
      {(family || death) && (<th>Payment</th>)}
      {(family || death) && (<th>Status</th>)}
      {(!family && !death) && (<th>Price</th>)  }
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="8">Loading notices...</td>
      </tr>
    ) : notices.length === 0 ? (
      <tr>
        <td colSpan="8">No notices found</td>
      </tr>
    ) : (
      notices.map((notice, index) => (
        <tr key={index}>
          {!family && !death && <td>{notice.item}</td>}
          {(family || death) && <td>{notice.name}</td>}
          {(family || death) && <td>{notice.town}</td>}
          {(family || death) && <td>{notice.county}</td>}
          {(!family && !death) && <td>{notice.price}</td>}
          {family && <td>{notice.item}</td>}
          {(family || death) &&  (
            <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
          )}
          {(family || death) &&  (
            <td
              className={
                notice.payment ? "text-success fw-bold" : "text-danger fw-bold"
              }
            >
              {notice.payment ? "Paid" : "Unpaid"}
            </td>
          )}
          {(family || death) &&  (
            <td
              className={
                notice.status ? "text-success fw-bold" : "text-danger fw-bold"
              }
            >
              {notice.status ? "Active" : "Deactivate"}
            </td>
          )}
          <td>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handelEdite(notice)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(notice.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

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
   {/* Add Notice Type Modal */}
{showModal && (
  <div className="custom-modal__overlay">
    <div className="custom-modal__container">
      <div className="custom-modal__content custom-modal__content--primary">
        <div className="custom-modal__header">
          <i className="custom-modal__icon bi bi-file-earmark-plus"></i>
          <h3 className="custom-modal__title">Create New Notice Type</h3>
          <button className="custom-modal__close" onClick={() => setShowModal(false)}>
            &times;
          </button>
        </div>
        <div className="custom-modal__body">
          <div className="custom-modal__input-group">
            <label className="custom-modal__label">Notice Type Name</label>
            <input
              type="text"
              name="item"
              onChange={handelChang}
              className="custom-modal__input"
              placeholder="Ex: Legal Notice"
            />
          </div>
          <div className="custom-modal__input-group">
            <label className="custom-modal__label">Pricing</label>
            <div className="custom-modal__input-prefix">
              <span className="custom-modal__currency">€</span>
              <input
                type="number"
                name="price"
                onChange={handelChang}
                className="custom-modal__input"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          </div>
        </div>
        <div className="custom-modal__footer">
          <button className="custom-modal__btn custom-modal__btn--secondary" onClick={() => setShowModal(false)}>
            Discard
          </button>
          <button className="custom-modal__btn custom-modal__btn--primary" onClick={handleSubmit}>
            <i className="bi bi-check2-circle me-2"></i>
            Create Notice Type
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Edit Status Modal */}
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
              You're about to permanently delete this notice type and all related data.
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

export default AdminNotices;


