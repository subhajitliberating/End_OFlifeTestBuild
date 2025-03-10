

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BsFillGridFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import SearchNotices from '../UI/NoticesSearch/SearchNotices';
import "./Style.css";

const FamilyNotices = () => {
  // State management
  const [noticeCategories, setNoticeCategories] = useState([]);
  const [notices, setNotices] = useState([]);
  const [currentTab, setCurrentTab] = useState("All Family Notices");
  const [viewMode, setViewMode] = useState("grid");
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    hasMore: true
  });
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [flag, setFlag] = useState(true)
  const location = useLocation();
  const initialSearch = location.state?.data || {};
  const initialTab = location.state?.Tab || '';

  // Fetch notice categories on mount
  useEffect(() => {
    if (initialTab) {
      setCurrentTab(initialTab)
    }
    const fetchNoticeCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}user/service/type`
        );
        setNoticeCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching notice categories:", error);
      }
    };
    fetchNoticeCategories();
  }, []);

  // Fetch notices with memoized function
  const fetchNotices = useCallback(async (page = 1, reset = false) => {
    setLoading(true);

    try {
      const params = {
        page,
        limit: 10,
        item: currentTab === "All Family Notices" && flag ? initialTab : currentTab === 'All Family Notices' ? '' : currentTab,
        ...searchParams
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}user/notices/pagination`,
        { params }
      );

      setPagination({
        totalPages: response.data.totalPages,
        hasMore: response.data.notices.length > 0,
        page
      });

      setNotices(prev => reset ?
        response.data.notices :
        [...prev, ...response.data.notices.filter(n =>
          !prev.some(p => p.id === n.id)
        )]
      );
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  }, [currentTab, searchParams]);

  // Fetch notices when dependencies change
  useEffect(() => {
    setNotices([]);
    fetchNotices(1, true);
  }, [fetchNotices]);

  // Infinite scroll handler
  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (viewMode !== "grid" || loading || !pagination.hasMore) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    // Trigger pagination if the user has scrolled 85% of the page
    if (scrollPosition >= pageHeight * 0.55) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [viewMode, loading, pagination.hasMore]);

  // Attach and detach event listener
  useEffect(() => {
    if (viewMode === "grid") {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode, handleScroll]);

  // Fetch notices when page changes
  useEffect(() => {
    if (pagination.page > 1) {
      fetchNotices(pagination.page);
    }
  }, [pagination.page, fetchNotices]);


  // Scroll event listener management
  useEffect(() => {
    if (viewMode === "grid") {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode, handleScroll]);

  // Handle page changes for list view
  useEffect(() => {
    if (viewMode === "list" && pagination.page > 1) {
      fetchNotices(pagination.page);
    }
  }, [pagination.page, viewMode, fetchNotices]);

  // Group notices by date
  const groupedNotices = notices.reduce((groups, notice) => {
    const date = new Date(notice.period_from);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
    weekStart.setHours(0, 0, 0, 0);

    const existingGroup = groups.find(g =>
      g.startDate.getTime() === weekStart.getTime()
    );

    if (existingGroup) {
      existingGroup.notices.push(notice);
    } else {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      groups.push({
        startDate: weekStart,
        endDate: weekEnd,
        notices: [notice]
      });
    }

    return groups;
  }, []).sort((a, b) => b.startDate - a.startDate);

  return (
    <div className='container cus-mt-170'>
      <div className="row my-2">
        <SearchNotices
          search="Search For Family Notices"
          onSearch={(params) => {
            setSearchParams(params);
            setCurrentTab("All Family Notices");
          }}
          nothome={true}
        />
      </div>

      <div className="tab-row">
        <button
          onClick={() => {
            setCurrentTab("All Family Notices"),
            setFlag(false)
          }}
          className={`btn-tab ${currentTab === "All Family Notices" ? "btn-tab-active" : ""}`}
        >
          All Family Notices
        </button>
        {noticeCategories.map((tab) => (
          <button
            key={tab.item}
            onClick={() => setCurrentTab(tab.item)}
            className={`btn-tab ${currentTab === tab.item ? "btn-tab-active" : ""}`}
          >
            {tab.item}
          </button>
        ))}
      </div>
    

      <div className='tab-heading-row'>
      {/* <h2>{currentTab}</h2> */}
        <p>Viwe As</p>
        <div className='list-icon'>
          <BsFillGridFill
            onClick={() => setViewMode("grid")}
            size={24}  className='bs-icon'
          />
          <FaList
            onClick={() => setViewMode("list")}
           size={24}  className='bs-icon'
          />
        </div>
      </div>

      <div className="container notice-container">
        {viewMode === "grid" ? (
          <div className="row g-4">
            {groupedNotices.map((group, index) => (
              <div key={index} className="col-12">
                <div className="group-header p-3 mb-4 bg-light rounded">
                  <h5 className="mb-0 text-secondary">
                    Notices published from {group.startDate.toLocaleDateString()} to {group.endDate.toLocaleDateString()}
                  </h5>
                </div>
                <div className="row g-4">
                  {group.notices.map(notice => (
                    <div key={notice.id} className="col-lg-3 col-md-6">
                      <Link to={`/noticesview/${encodeURIComponent(notice.name)}-${encodeURIComponent(notice.surname)}-${encodeURIComponent(notice.notice_number)}`} state={{ data: notice }}>
                        <div className="card shadow-sm h-100 transition-all">
                          <div className="card-header bg-dark text-white p-3">
                            <h5 className="card-title mb-0 text-center">{notice.item}</h5>
                          </div>
                          <div className="card-img-container">
                            <img
                              src={`${import.meta.env.VITE_API_URL}${notice.frist_image.slice(7).replace(/\\/g, '/')}`}
                              className="card-img-top object-fit-cover"
                              alt={notice.item}
                              style={{ height: '200px' }}
                            />
                          </div>
                          <div className="card-body">
                            <div className="d-flex flex-column gap-2">
                              <p className="mb-0 my-2 fw-medium text-center">
                                {`${notice.name} ${notice.surname} ${notice.nee}`}
                              </p>
                              <p className="text-muted my-2 text-center">{notice.county}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Name</th>
                    <th>Town</th>
                    <th>County</th>
                    <th>Type</th>
                    <th className="pe-4">Published</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map(notice => (
                    <tr key={notice.id} className="transition-all">
                      <td className="ps-4 fw-medium">{notice.name}</td>
                      <td>{notice.town}</td>
                      <td>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary">
                          {notice.county}
                        </span>
                      </td>
                      <td className="text-primary">{notice.item}</td>
                      <td className="pe-4 text-muted">
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3 my-5">
              <button
                className="btn btn-outline-primary px-4 py-2 d-flex align-items-center gap-2"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
              >
                <BsChevronLeft /> Previous
              </button>
              <span className="mx-3 text-muted">
                Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong>
              </span>
              <button
                className="btn btn-outline-primary px-4 py-2 d-flex align-items-center gap-2"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
              >
                Next <BsChevronRight />
              </button>
            </div>
          </>
        )}

        {loading && (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!pagination.hasMore && (
          <div className="text-center my-5 text-muted">
            <div className="alert alert-warning d-flex align-items-center justify-content-center py-4 shadow-sm rounded">
              <i className="bi bi-info-circle me-3 fs-2 text-warning"></i>
              <span className="fw-medium">No more notices to load</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyNotices;
