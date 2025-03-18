import React, { useEffect, useState,useMemo } from 'react';
import axios from 'axios';
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import SearchNotices from '../UI/NoticesSearch/SearchNotices';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "./Style.css";

const DeathNotice = () => {
  const [notices, setNotices] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [page, setPage] = useState(1); // Track current page for infinite scroll
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages for pagination
  const [searchParams, setSearchParams] = useState({}); // State to hold search parameters
  const location = useLocation();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const searchdata = location.state?.data; // Search data from the state
  // const countydata = location.state?.countyName;

  // const { countydata } = useParams();
  const navigate = useNavigate();
  
  const countydata = location.state?.countyName;
  useEffect(() => {
    if (!countydata && !searchdata) {
      navigate(`/deathnotice/${countydata}`); // Redirect if countydata is not different
    }
  }, [countydata, navigate]);
  useEffect(() => {
    if (searchdata) {
      // If searchdata is present, fetch notices using searchdata
      setNotices([]); // Reset notices when new search is done
      setPage(1); // Start from the first page for search
      fetchNotices(1, true, searchdata);


    } else if (countydata) {
      const data = {
        county: countydata,
        name: '',
        surname: '',
        nee: '',

        town: '',
        createdAt: '',
        updatedAt: ''
      }
      setNotices([]);
      setPage(1);
      fetchNotices(1, true, data);
    }


    else if (Object.keys(searchParams).length === 0) {

      setNotices([]);
      setPage(1);
      fetchNotices(1, true, {});
    }

  }, [searchdata, countydata]);

  useEffect(() => {
    if (!searchdata && Object.keys(searchParams).length > 0) {

      setNotices([]);
      setPage(1);
      fetchNotices(1, true, searchParams);
    }
  }, [searchParams]);

  const fetchNotices = async (page, reset = false, params) => {
    setLoading(true);
    console.log(params)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}directore/notices/pagination`, {
        params: {
          page,
          limit: 10,
          ...params,
        },
      });

      if (reset) {
      console.log(response.data.notices)
        setNotices(response.data.notices); // Reset notices if reset flag is true
        setTotalPages(response.data.totalPages); // Set total pages for pagination
      } else {
        // Filter out duplicates based on the id
        const newNotices = response.data.notices.filter(
          (notice) => !notices.some((existingNotice) => existingNotice.id === notice.id)
        );
        setNotices((prev) => [...prev, ...newNotices]); // Append only non-duplicate notices
      }
     
      setHasMore(response.data.notices.length > 9); // Set hasMore based on the response length
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchNotices(page, false, searchdata || searchParams); // Fetch notices when the page changes
    }
  }, [page, searchdata, searchParams]); // Depend on both searchParams and searchdata

  // Handle infinite scroll
  const handleScroll = () => {
    if (viewMode === "list") return; // Do nothing if in list view (disable infinite scroll)

    const scrollTop = document.documentElement.scrollTop; // The distance from the top of the page
    const documentHeight = document.documentElement.scrollHeight; // The total height of the document
    const windowHeight = window.innerHeight; // The height of the window (visible area)

    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

    if (scrollPercentage >= 55 && !loading && hasMore) {
      setPage((prev) => prev + 1); // Trigger load if 60% of the page is scrolled
    }
  };

  useEffect(() => {
    if (viewMode === "grid") {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll); // Clean up the event listener
  }, [loading, hasMore, viewMode]);

  // Handle pagination
  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Ensure the page number is within bounds
    setPage(newPage);
  };

  // Handle search submission
  const handleSearch = (searchData) => {
    setSearchParams(searchData);
    setNotices([]); // Reset notices when new search is done
    setPage(1); // Start from the first page for search
    fetchNotices(1, true, searchData);

    // Update searchParams state with the new search criteria
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedNotices = useMemo(() => {
    if (!sortConfig.key) return notices;

    return [...notices].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (valueA < valueB) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [notices, sortConfig]);

  // Group notices by date range (7 days)
  const groupNoticesByDateRange = (notices) => {
    // Sort notices in descending order by creation date (newest first)
    const sortedNotices = [...notices].sort(
      (a, b) => new Date(b.period_from) - new Date(a.period_from)
    );

    const groupedNotices = [];
    let currentGroup = null;

    sortedNotices.forEach((notice) => {
      const noticeDate = new Date(notice.period_from);

      // Calculate the start of the week (Monday)
      const startOfWeek = new Date(noticeDate);
      startOfWeek.setDate(noticeDate.getDate() - noticeDate.getDay() + (noticeDate.getDay() === 0 ? -6 : 1));
      startOfWeek.setHours(0, 0, 0, 0);

      // Calculate the end of the week (Sunday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      // Check if the notice belongs to the current group
      if (!currentGroup || startOfWeek.getTime() !== currentGroup.startDate.getTime()) {
        // Create a new group
        currentGroup = {
          startDate: startOfWeek,
          endDate: endOfWeek,
          notices: [],
        };
        groupedNotices.push(currentGroup);
      }

      // Add the notice to the current group
      currentGroup.notices.push(notice);
    });

    return groupedNotices;
  };

  const groupedNotices = groupNoticesByDateRange(notices);
  return (
    <div className='container  cus-mt-170'>
      <div className="row my-2">
        <SearchNotices search="Search For Death Notices" onSearch={handleSearch} nothome={true} />
      </div>

      <div className='tab-heading-row'>
      <p>Viwe As</p>
        <div className='list-icon'>
        
          <BsFillGridFill size={24}  className='bs-icon' onClick={() => setViewMode("grid")} />
          <FaList size={24} className='bs-icon'  onClick={() => setViewMode("list")} />
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
                    <div key={notice.id} className="col-lg-3 col-md-6 ">
                     <div key={index} className="card-custom">
                                      <Link   to={`/noticesview/${encodeURIComponent(notice.name)}-${encodeURIComponent(notice.surname)}-${encodeURIComponent(notice.notice_number)}`}>
                                    <div className="img-div">
                                      <img
                                         src={`${import.meta.env.VITE_API_URL}${notice.frist_image.slice(7).replace(/\\/g, '/')}`} // Fallback to default if no image
                                        alt={notice.name}
                                        className="card-img"
                                      />
                                    </div>
                                    <div className="card-text">
                                      <h3 className="card-name">{notice.name}</h3>
                                      <p className="card-text">{notice.town + " "+ notice.county}</p>
                                    </div>
                                    </Link>
                                  </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
            <thead className="table-light">
                <tr>
                  <th className="ps-4" onClick={() => handleSort("name")}>
                    Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("town")}>
                    Town {sortConfig.key === "town" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("county")}>
                    County {sortConfig.key === "county" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="pe-4" onClick={() => handleSort("createdAt")}>
                    Published {sortConfig.key === "createdAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedNotices.map((notice) => (
                  <tr key={notice.id} className="transition-all">
                    <td className="ps-4 fw-medium">{notice.name}</td>
                    <td>{notice.town}</td>
                    <td>
                      <span className="badge bg-secondary bg-opacity-10 text-secondary">
                        {notice.county}
                      </span>
                    </td>
                    <td className="pe-4 text-muted">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {viewMode !== "grid" && (
          <div className="d-flex justify-content-center align-items-center gap-3 my-5">
            <button
              className="btn btn-outline-primary px-4 py-2 d-flex align-items-center gap-2"
              onClick={() => handlePagination(page - 1)}
              disabled={page === 1}
            >
              <i className="bi bi-chevron-left"></i>
              Previous
            </button>
            <span className="mx-3 text-muted">
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              className="btn btn-outline-primary px-4 py-2 d-flex align-items-center gap-2"
              onClick={() => handlePagination(page + 1)}
              disabled={page === totalPages}
            >
              Next
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}

        {loading && (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!hasMore && (
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

export default DeathNotice;