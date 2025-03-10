

import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";


const AdminInvoice = ({ token }) => {
    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [directors, setDirectors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDirector, setSelectedDirector] = useState({
        id:0,
        username:'',
        email : ''
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [previewData, setPreviewData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [ismail,setIsmain] =useState(false)
    const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}admin/get/directore`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setDirectors(response.data);
            } catch (err) {
                console.error("Error fetching directors:", err);
            }
        };
        fetchDirectors();
    }, [token]);

    const handlePreview = async () => {
        if (!selectedDirector || !startDate || !endDate) return;

        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}admin/get/death-notices`,
                {
                    params: { directorId: selectedDirector.id, startDate, endDate },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
     
            setPreviewData(response.data);
        } catch (err) {
            console.error("Preview error:", err);
            alert("Error generating preview");
        } finally {
            setLoading(false);
        }
    };




    const handelSendemail = ()=>{
        setIsmain(true)

        handleGenerateInvoice()
    }



    const handleGenerateInvoice = async () => {
        if (!previewData || previewData.notices.length === 0) {
            alert("No data to generate invoice");
            return;
        }
    
        const chunkSize = 9; // Number of notices per page
        const notices = previewData.notices;
        const chunks = [];
        let invoiceTotal = 0; // Running total for the entire invoice
    
        // Split notices into chunks of 9
        for (let i = 0; i < notices.length; i += chunkSize) {
            chunks.push(notices.slice(i, i + chunkSize));
        }
    
        const pdf = new jsPDF('p', 'mm', 'a4');
        let isFirstPage = true;
        
        for (const [index, chunk] of chunks.entries()) {
            const isLastPage = index === chunks.length - 1; // Check if it's the last page
    
            // Calculate chunk totals
            const chunkSubtotal = chunk.reduce((sum, notice) => sum + notice.price, 0);
            const chunkGST = chunkSubtotal;
            invoiceTotal += chunkSubtotal; // Add to the running total
    
            // Generate HTML for the chunk
            const invoiceHTML = generateInvoiceHTML(chunk, chunkSubtotal, chunkGST, invoiceTotal, isFirstPage, isLastPage);
    
            // Create and render temporary element
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.innerHTML = invoiceHTML;
            document.body.appendChild(tempDiv);
    
            // Capture HTML as image (Optimized)
            const canvas = await html2canvas(tempDiv, { scale: 1.5 }); // Scale reduced from 2 to 1.5
            const imgData = canvas.toDataURL('image/jpeg', 0.6); // Use JPEG format with compression (0.6 quality)
    
            // Calculate image dimensions (Optimized)
            const imgWidth = 210; // A4 width in mm
            const maxHeight = 297; // A4 height in mm
            const imgHeight = Math.min((canvas.height * imgWidth) / canvas.width, maxHeight); // Prevent oversized images
    
            if (!isFirstPage) pdf.addPage();
            isFirstPage = false;
    
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            document.body.removeChild(tempDiv);
        }
    // Round the total amount to remove decimals
const formattedTotalAmount = Math.round(invoiceTotal); // Example: 492.8 → 492

        // Generate compressed PDF
        const pdfBlob = pdf.output("blob", { compress: true }); // Enable PDF compression
    
        const formData = new FormData();
        formData.append("invoice", pdfBlob, `invoice-${new Date().toISOString().slice(0, 10)}.pdf`);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("username", selectedDirector.username);
        formData.append("total", formattedTotalAmount); 
        formData.append("email", selectedDirector.email);
        formData.append("directorId", selectedDirector.id);
    
        pdf.save(`invoice-${new Date().toISOString().slice(0, 10)}.pdf`);
    
        try {
            const data = {
                startDate: startDate,
                endDate: endDate,
                username: selectedDirector.username,
                total: Math.round(invoiceTotal),
                email: selectedDirector.email,
                directorId: selectedDirector.id
            };
            await axios.post(`${import.meta.env.VITE_API_URL}admin/add/invoice`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (ismail) {
                await axios.post(`${import.meta.env.VITE_API_URL}admin/send-invoice-email`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // console.log('send mail');
            }
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}admin/get/invoice`,
                    {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        params: {
                          page,
                          limit: 10,
                        
                        },
                      }
                );
                setInvoices(response.data.invoices
                );
                console.log(response.data.invoices
                )
            } catch (err) {
                console.error("Error fetching invoices:", err);
            }
        };
        fetchInvoices();
    }, [token]);
    
    
    
    
    const generateInvoiceHTML = (chunk, subtotal, gst, total, isFirstPage, isLastPage) => {
        return `
        <div class="invoice-preview">
            ${isFirstPage ? `  
            <div class="text-center mb-4">
                <h2 class="mb-0">END OF LIFE</h2>
                <p class="mb-0">77 Test Address<br/>Test Address</p>
            </div>
            <hr style="border-top: 2px solid black;"/>
            <div class="row mb-4">
                <div class="col-md-6">
                    <h5 class="mb-1">Bill To</h5>
                    <p class="mb-0">${selectedDirector.username}<br/>27, Dif City, Gupta<br/>Delhi, Delhi 40003</p>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-4">
                    <strong>Invoice Date:</strong> ${new Date().toLocaleDateString()}
                </div>
                <div class="col-md-4">
                    <strong>Invoice From</strong> ${startDate}
                </div>
                <div class="col-md-4">
                    <strong>Invoice To:</strong> ${endDate}
                </div>
            </div>
            ` : ''}
    
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th style="width: 20%">NOTICE ID</th>
                        <th style="width: 40%">DEATH NOTICE NAME</th>
                        <th style="width: 20%"> PRICE</th>
                        <th style="width: 20%">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    ${chunk.map(notice => `  
                        <tr>
                            <td>${notice.id}</td>
                            <td>${notice.name} ${notice.surname || ''}</td>
                            <td class="text-end">€${notice.price.toFixed(2)}</td>
                            <td class="text-end">€${notice.price.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                    
                    ${isLastPage ? `
                    <tr>
                        <td colspan="2" rowspan="3">
                            ${isFirstPage ? `
                            <div class="mt-4">
                                <p class="mb-1"><strong>Terms:</strong> Payment due within 15 days</p>
                                <div class="mt-3">
                                    <p class="mb-0"><strong>Bank Details:</strong></p>
                                    <p class="mb-0">Account #: 12345678</p>
                                    <p class="mb-0">Routing #: 09876543210</p>
                                </div>
                            </div>
                            ` : ''}
                        </td>
                        <td class="text-end"><strong>Subtotal</strong></td>
                        <td class="text-end">€${total.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td class="text-end"><strong> VAT </strong></td>
                        <td class="text-end">€ 0%</td>
                    </tr>
                    <tr>
                        <td class="text-end"><strong>TOTAL</strong></td>
                        <td class="text-end">€${total.toFixed(2)}</td>
                    </tr>
                    ` : ''}
                </tbody>
            </table>
        </div>
        `;
    };
    
  
  
    

    return (
        <div className="container">
            <h1 className="mb-4 admin-title">Invoice</h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* <label>Select Notice</label> */}
       
          <input
            type="text"
            placeholder="Search Invoices..."
            className="form-control w-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
           <button className="d-btn a-btn" onClick={() => setShowModal(true)}>
                  Generate Invoice
              </button>
        
        </div>
  
        <div className="table-responsive">
          <table className="table table-hover custom-table">
            <thead className="table-light">
              <tr>
                <th>ID</th>
              
               
                
             <th>Directory</th>
               <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7">Loading notices...</td></tr>
              ) : invoices.length < 0 ? (
                <tr><td colSpan="7">No notices found</td></tr>
              ) : (
                invoices.map((notice,index) => (
                  <tr key={index}>
                   
                    <td>{notice.id}</td>
                    <td>{notice.username}</td>
                    <td>{new Date(notice.invoce_from).toLocaleDateString()}</td>
                    <td>{new Date(notice.invoce_to).toLocaleDateString()}</td>
                    <td>€{notice.totalprice}</td>
                    {/* <td>{new Date(notice.createdAt).toLocaleDateString()}</td> */}
                    <td className={notice.payment_status ? "text-success fw-bold" : "text-danger fw-bold"}>
                      {notice.payment_status ? "Paid" : "Unpaid"}
                    </td>
                    {/* <td className={notice.status ? "text-success fw-bold" : "text-danger fw-bold"}>
                      {notice.status ? "Active" : "Deactivate"}
                    </td> */}
                    <td>
                  
                      <button className="btn btn-warning btn-sm me-2" onClick={()=>handelEdite(notice)}>Edit</button>
                      <button className="btn btn-danger btn-sm"onClick={()=>handleDelete(notice.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination-container mt-3">
            <button className="btn btn-outline-secondary btn-sm" disabled={page === 1}>
              Previous
            </button>
             <span className="mx-3">{page} / {totalPages}</span> 
            <button  className="btn btn-outline-secondary btn-sm" disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
       
            
        {showModal && (
  <div className="modal fade show d-block custom-modal">
    <div className="modal-dialog modal-lg modal-dialog-scrollable">
      <div className="modal-content shadow-lg">
        {/* Modal Header */}
        <div className="modal-header bg-primary text-white">
          <div className="d-flex align-items-center w-100">
            <i className="bi bi-receipt-cutoff fs-4 me-2"></i>
            <h5 className="modal-title mb-0 fw-bold">Generate Invoice</h5>
            <button 
              className="btn-close btn-close-white ms-auto" 
              onClick={() => setShowModal(false)}
            ></button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body custom-modal-scroll">
          {/* Selection Section */}
          <div className="mb-4">
            <label className="form-label fw-bold ">Select Director</label>
            <select
              className="form-select form-select-lg border-primary"
              value={selectedDirector.id}
              onChange={(e) => {
                const director = directors.find((d) => d.id === parseInt(e.target.value));
                setSelectedDirector(director || { id: 0, username: '', email: '' });
              }}
            >
              <option value="">Choose a Director...</option>
              {directors.map((director) => (
                <option key={director.id} value={director.id}>
                  {director.username}
                </option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label fw-bold ">Start Date</label>
              <input
                type="date"
                className="form-control form-control-lg border-primary"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold ">End Date</label>
              <input
                type="date"
                className="form-control form-control-lg border-primary"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Preview Button */}
          <button 
            className="btn btn-primary btn-sm w-50 mb-4" 
            onClick={handlePreview} 
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : (
              <i className="bi bi-eye me-2"></i>
            )}
            {loading ? "Generating Preview..." : "Preview Invoice"}
          </button>

          {/* Invoice Preview */}
          {previewData && (
            <div className="invoice-preview border rounded-3 p-4 bg-light">
              {/* Invoice Header */}
              <div className="text-center mb-4">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <i className="bi bi-hospital-fill fs-1  me-3"></i>
                  <h1 className="display-6 fw-bold  mb-0">END OF LIFE</h1>
                </div>
                <p className="text-muted mb-0">123 Memorial Street</p>
                <p className="text-muted mb-0">London, United Kingdom</p>
              </div>

              <hr className="border-primary opacity-100" style={{ height: '2px' }} />

              {/* Bill To Section */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="fw-bold  mb-3">Bill To:</h5>
                  <div className="card border-primary">
                    <div className="card-body">
                      <p className="mb-0 fw-bold">{selectedDirector?.username}</p>
                      <p className="mb-0 text-muted">{selectedDirector?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5 className="fw-bold  mb-3">Invoice Details:</h5>
                  <div className="card border-primary">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <p className="mb-1"><strong>Invoice Date:</strong></p>
                          <p className="mb-0">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="col-6">
                          <p className="mb-1"><strong>Period:</strong></p>
                          <p className="mb-0">{startDate} - {endDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th style={{ width: '20%' }}>Notice ID</th>
                      <th style={{ width: '40%' }}>Deceased Name</th>
                      <th style={{ width: '20%' }} className="text-end">Unit Price</th>
                      <th style={{ width: '20%' }} className="text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.notices.map((notice) => (
                      <tr key={notice.id}>
                        <td className="fw-bold">#{notice.id}</td>
                        <td>{notice.name} {notice.surname}</td>
                        <td className="text-end">€{notice.price}</td>
                        <td className="text-end">€{notice.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card border-primary">
                    <div className="card-body">
                      <h6 className="fw-bold  mb-3">Payment Details:</h6>
                      <p className="mb-1"><strong>Bank Name:</strong> State Bank</p>
                      <p className="mb-1"><strong>Account #:</strong> 12345678</p>
                      <p className="mb-0"><strong>Routing #:</strong> 09876543210</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Subtotal</td>
                        <td className="text-end">€{previewData.total}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">VAT (0%)</td>
                        <td className="text-end">€0.00</td>
                      </tr>
                      <tr className="table-active">
                        <td className="fw-bold">TOTAL DUE</td>
                        <td className="text-end fw-bold ">€{previewData.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer bg-light">
          <div className="d-flex gap-2 w-100">
            <button 
              className="btn btn-danger btn-sm flex-grow-1" 
              onClick={() => setShowModal(false)}
            >
              <i className="bi bi-x-circle me-2"></i>Cancel
            </button>
            <button 
              className="btn btn-success btn-sm flex-grow-1" 
              onClick={handleGenerateInvoice}
              disabled={!previewData || loading}
            >
              <i className="bi bi-file-earmark-pdf me-2"></i>Generate PDF
            </button>
            <button 
              className="btn btn-primary btn-sm flex-grow-1" 
              onClick={handelSendemail} 
              disabled={loading}
            >
              <i className="bi bi-envelope me-2"></i>Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
    );
};


export default AdminInvoice
