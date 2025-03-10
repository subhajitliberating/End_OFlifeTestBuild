import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaSort, FaSortUp, FaSortDown, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import Modal from "../UI/Modal/Modal";
import { Link } from "react-router-dom";
import "./Style.css";

const MyFamilyNotices = ({ token,role }) => {

  const [searchFlag,setSearchFlag]=useState(false)
  const [state, setState] = useState({
    data: [],
    selectedRows: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: "",
    showModal: false,
    message: "",
    deleteId: null,
    searchTerm: "",
    sortBy: "createdAt",
    sortOrder: "desc"
  });

  // const columns = [
  //   { key: "item", label: "Item" },

   
  //   { key: "county", label: "County" },
  //   { key: "name", label: "Name" },
  //   { key: "surname", label: "Surname" },
  //   {key:"status",label:"Status"},
  //    { key: "createdAt", label: "Created At" }
  // ];



  const columns = [
  // role !== "directory" && { key: "item", label: "Item" } ,
    { key: "name", label: "Name" }, // Conditionally add "Item"
    { key: "county", label: "County" },
    { key: "surname", label: "Surname" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Created At" }
  ];
  

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: "" }));

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${role === "directory" ? "directore/family-notices/user/by/get" : "user/family-notices/user/by/get"}`,
        {
          params: {
            page: state.currentPage,
            pageSize: 10,
            search: state.searchTerm,
            sortBy: state.sortBy,
            sortOrder: state.sortOrder,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setState(prev => ({
        ...prev,
        data: response.data.notices,
        totalPages: response.data.totalPages,
        loading: false,
      }));
      console.log(response)
    } catch (err) {
      console.error('Fetch error:', err);
      setState(prev => ({
        ...prev,
        error: err.response?.data?.error || 'Failed to fetch notices',
        loading: false,
      }));
    }
  }, [state.currentPage, state.sortBy, searchFlag, state.sortOrder,  token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = () => {

    setSearchFlag(!searchFlag)
    setState(prev => ({
      ...prev,
      currentPage: 1, // Reset to the first page when search term changes
    }));
    fetchData();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSort = (column) => {
    setState(prev => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column ? (prev.sortOrder === "asc" ? "desc" : "asc") : "asc"
    }));
  };

  const handleRowSelect = (id) => {
    setState(prev => ({
      ...prev,
      selectedRows: prev.selectedRows.includes(id)
        ? prev.selectedRows.filter(item => item !== id)
        : [...prev.selectedRows, id]
    }));
  };

  const handleSelectAll = () => {
    setState(prev => ({
      ...prev,
      selectedRows: prev.selectedRows.length === prev.data.length
        ? []
        : prev.data.map(item => item.id)
    }));
  };

  const handleDelete = (id = null) => {
    setState(prev => ({
      ...prev,
      deleteId: id,
      message: id 
        ? "Are you sure you want to delete this notice?" 
        : `Are you sure you want to delete ${prev.selectedRows.length} notice(s)?`,
      showModal: true
    }));
  };

  const confirmDelete = async () => {
    try {
      const idsToDelete = state.deleteId ? [state.deleteId] : state.selectedRows;
      await axios.delete(
       `${import.meta.env.VITE_API_URL}${role === "directory" ? "directore/family-notices/deleted" : "user/family-notices/deleted"}`,

        {
          data: { ids: idsToDelete },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setState(prev => ({
        ...prev,
        selectedRows: [],
        deleteId: null,
        showModal: false
      }));
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      setState(prev => ({ ...prev, showModal: false }));
    }
  };

  const getSortIcon = (column) => {
    if (state.sortBy !== column) return <FaSort className="text-muted" />;
    return state.sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  const Pagination = () => (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${state.currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setState(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
          >
            Previous
          </button>
        </li>
        {Array.from({ length: state.totalPages }, (_, i) => (
          <li
            key={i + 1}
            className={`page-item ${state.currentPage === i + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setState(prev => ({ ...prev, currentPage: i + 1 }))}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${state.currentPage === state.totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setState(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );

  if (state.loading) return <div className="text-center my-5">Loading...</div>;
  if (state.error) return <div className="alert alert-danger my-5">{state.error}</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4 cus-h1">My Notices</h1>

      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <div className="input-group">
            <span onClick={handleSearch} className="input-group-text bg-light">
              <FaSearch  />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search notices..."
              value={state.searchTerm}
              onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
              onKeyPress={handleKeyPress}  // Trigger search on Enter key press
            />
          </div>
        </div>
       
       
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button
          onClick={() => handleDelete()}
          disabled={state.selectedRows.length === 0}
          className="btn btn-danger"
        >
          Delete Selected
        </button>
      </div>

      <div className="table-responsive rounded-3 shadow-sm">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: "50px" }}>
                <input
                  type="checkbox"
                  checked={!!state.data.length && state.selectedRows.length === state.data.length}
                  onChange={handleSelectAll}
                  className="form-check-input"
                />
              </th>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  style={{ cursor: "pointer", minWidth: "120px" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    {label}
                    <span className="ms-2">{getSortIcon(key)}</span>
                  </div>
                </th>
              ))}
              <th style={{ width: "120px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
  {state.data.map(notice => (
    <tr key={notice.id}>
      <td>
        <input
          type="checkbox"
          checked={state.selectedRows.includes(notice.id)}
          onChange={() => handleRowSelect(notice.id)}
          className="form-check-input"
        />
      </td>
      {columns.map(({ key }) => (
        <td key={key}>
          {key === "createdAt" ? (
            new Date(notice[key]).toLocaleDateString()
          ) : key === "status" ? (
            <span
              className={`badge ${
                notice[key]
                  ? "bg-success text-white"
                  : "bg-danger text-white"
              } px-3 py-2 rounded`}
            >
              {notice[key] ? "Active" : "Inactive"}
            </span>
          ) : (
            notice[key]
          )}
        </td>
      ))}
      <td>
        <div className="d-flex gap-2">
          <button
            onClick={() => handleDelete(notice.id)}
            className="btn btn-sm btn-danger"
          >
            <FaTrash />
          </button>
          <Link
            className="btn btn-sm"
            to={`/noticesview/${encodeURIComponent(notice.name)}-${encodeURIComponent(notice.surname)}-${encodeURIComponent(notice.notice_number)}`}
            style={{ background: "#b1824d" }}
          
          >
            <FaEye color="white" />
          </Link>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {!state.data.length && !state.loading && (
        <div className="text-center my-5 text-muted">No notices found</div>
      )}

      <div className="d-flex justify-content-center mt-4">
        <Pagination />
      </div>

      <Modal
        show={state.showModal}
        onConfirm={confirmDelete}
        onCancel={() => setState(prev => ({ ...prev, showModal: false }))}
        message={state.message}
      />
    </div>
  );
};

export default MyFamilyNotices;
