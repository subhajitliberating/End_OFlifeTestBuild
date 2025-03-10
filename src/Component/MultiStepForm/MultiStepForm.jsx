import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Editor } from "@tinymce/tinymce-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MultiStepForm.css"
import irelandCounty from "../../Service/irelandCounty";
import SearchNotices from "../UI/NoticesSearch/SearchNotices"
import { MdOutlineClose } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import axios from "axios";
import Modal from "../UI/Modal/Modal";
import { useNavigate } from "react-router-dom";
import NoticeFeatures from "../UI/NoticeFeatures/NoticeFeatures";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Preview from "../UI/Preview/Preview";
import { CiCircleCheck } from "react-icons/ci";




function MultiStepForm({ token }) {
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();

  const [townflag, setTownflag] = useState(false)
  const [items, setItems] = useState([])

  const [selectedItems, setSelectedItems] = useState(null);

  // State for step 2
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1); // Track current page for infinite scroll
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages for pagination
  const [searchParams, setSearchParams] = useState({}); // State to hold search parameters
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("<p>This is the initial content of the editor.</p>");
  const [surname, setSurname] = useState("");
  const [nee, setnee] = useState("")
  const [counties, setCounties] = useState({ county: "", town: "" });
  const [street, setStreet] = useState("")
  const [towns, setTowns] = useState({ town: "Town 1" });
  const [anthorCounty, setAnthorCounty] = useState([{ county: "", town: "" }]);
  const [anthorflag, setanthorflag] = useState(false)
  const [deceased_flag, setDeceased_flag] = useState(false)
  const [isModel, setisModel] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [success, setSuccess] = useState(false);
  // State for step 3



  const [frist_images, setfrist_Images] = useState();
  const [sceond_images, setsecond_Images] = useState();
  const [thrid_images, setthrid_Images] = useState();
  const [mapDetails, setMapDetails] = useState({ category: "", county: "", church: "" });
  const [churchflag, setchurchflag] = useState(false)
  const [errors, setErrors] = useState({
    frist_img: "",
    sceond_img: "",
    third_img: ""
  });


  const [isChecked, setIsChecked] = useState(false); // State to track toggle status
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  // State for step 4 (dummy payment)
  const [termsAccepted, setTermsAccepted] = useState()

  const [PublishingPeriod, setPublishingPeriodh] = useState({

    From: '',
    To: ''
  });

  // Handle input change
  const handleDateChange = (date, field) => {
    // Update the state based on which field was changed
    setPublishingPeriodh((prevState) => ({
      ...prevState,
      [field]: date // Dynamically update the field (From or To)
    }));
  };


  const editorRef = useRef(null);



  useEffect(() => {
    const fetchNoticesType = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}user/service/type`

        );
        console.log(response.data)
        setItems(response.data.data)
        // Handle the response as needed
      } catch (error) {
        // Handle the error as needed
      }
    }
    fetchNoticesType()
  }, [])

  // Handle Next Step
  const handleNextStep = () => {



    if (selectedItems && currentStep === 1) {
      setCurrentStep(currentStep + 1);
      return
    }


    if (name && surname && counties.county && counties.town && currentStep === 2) {
      setCurrentStep(currentStep + 1);
      return
    }


    if (frist_images && currentStep === 3) {
      setCurrentStep(currentStep + 1);
    }

    else {
      if (!selectedItems && currentStep === 1) {
        setErrorMessage('Select Type of Notice')
      }
      if (!name && currentStep === 2) {
        setErrorMessage("Enter the Name ")
      }
      if (!surname && currentStep === 2) {
        setErrorMessage('Enter Sur name')

      }
      // if (!nee && currentStep === 2) {
      //   setErrorMessage('Enter Nee')
      // }
      if (!counties.county && currentStep === 2) {
        setErrorMessage('Select County')
      }
      if (!counties.town && currentStep === 2) {
        setErrorMessage('Select Town')
      }
      if (!frist_images && currentStep === 3) {
        setErrorMessage('Upload Images')
      }

      setisModel(true)
    }

  };

  // Handle Previous Step
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle checkbox selection in Step 1
  const handleItemChange = (item) => {
    setSelectedItems(item);  // Only keep the currently selected item
  };

  // Handle adding a new town
  const handleAddTown = () => {

    setTownflag(true)
    if (townflag) {
      if (towns.length < 2) {
        setTowns([...towns, { town: "" }]);
      }
    }

  };

  // Handle deleting a town
  const handleDeleteTown = (index) => {

    setTowns({
      town: ''
    })
    setTownflag(false)

  };

  // Handle adding a new county
  const handleAddCounty = () => {

    setanthorflag(true)
    if (anthorflag) {
      if (anthorCounty.length < 2) {
        setAnthorCounty([...anthorCounty, { county: "", town: "" }]);
      }
    }

  };

  // Handle deleting a county
  const handleDeleteCounty = (index) => {
    const updatedCounties = anthorCounty.filter((_, i) => i !== index);
    setAnthorCounty(updatedCounties);
  };

  // Handle input change for counties and towns
  const handleAnthorCountyChange = (index, field, value) => {
    const updatedCounty = [...anthorCounty];
    updatedCounty[index][field] = value; // Update county or town based on the field
    setAnthorCounty(updatedCounty);
  };

  const handleTownChange = (value) => {

    setTowns({
      town: value
    });
  };

  // Handle image upload





  const handleFilefristChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          frist_img: "file size exceeds 2MB. Please upload a smaller file.",
        }));
        return;
      }
      if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          frist_img: " file must be a PNG or JPG image.",
        }));
        return;
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        frist_img: "", // Clear the error if the file is valid
      }));
    }
    setfrist_Images(e.target.files)
  };
  const handleFilesecondChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sceond_img: " file size exceeds 2MB. Please upload a smaller file.",
        }));
        return;
      }
      if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sceond_img: " file must be a PNG or JPG image.",
        }));
        return;
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        sceond_img: "", // Clear the error if the file is valid
      }));
    }
    setsecond_Images(e.target.files)
  };
  const handleFilethirdChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          third_img: "file size exceeds 2MB. Please upload a smaller file.",
        }));
        return;
      }
      if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          third_img: " file must be a PNG or JPG image.",
        }));
        return;
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        third_img: "", // Clear the error if the file is valid
      }));
    }
    setthrid_Images(e.target.files)
  };
  const handleCountChange = (e) => {
    const { name, value } = e.target;
    setCounties({ ...counties, [name]: value });
  };

  // Handle map change in Step 3
  const handleMapChange = (e) => {
    const { name, value } = e.target;
    setMapDetails({ ...mapDetails, [name]: value });
  };

  const handlePreview = () => {
    const data = {
      name: name || "",
      nee: nee || "",
      surname: surname || "",
      item: selectedItems ? selectedItems.item : "",
      price: selectedItems ? selectedItems.price : 0,
      content,
      payment: selectedItems ? selectedItems.price : 0,
      status: false,
      town: counties.town,
      frist_another_town: anthorCounty && anthorCounty[0] ? anthorCounty[0].town : '',
      sceond_another_town: anthorCounty && anthorCounty[1] ? anthorCounty[1].town : '',
      frist_another_county: anthorCounty && anthorCounty[0] ? anthorCounty[0].county : '',
      another_town: towns ? towns.town : '',
      street,
      category: mapDetails ? mapDetails.category : '',
      county: mapDetails ? mapDetails.county : '',
      church: mapDetails ? mapDetails.church : '',
      images: frist_images // Assuming frist_images is an image or an array of images
    };

    if (name && frist_images && selectedItems && counties.county && counties.town && surname) {
      setPreviewData(data);
      setPreviewVisible(true);
    }
  };

  // Handle payment method change in Step 4







  const handleEditorChange = (content) => {
    setContent(content);
  };






  const handlePayment = async (noticeId, amount, item) => {
    const parsedAmount = parseInt(amount, 10); // Convert string to integer

    if (isNaN(parsedAmount)) {
      console.error("Invalid amount:", amount);
      return;
    }

    console.log(typeof parsedAmount, parsedAmount); // Check the type (should be 'number')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}user/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noticeId, amount: parsedAmount, item }), // Send parsed amount
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Payment error:", result.error);
        return;
      }

      console.log(result.sessionUrl); // Check if sessionUrl is received
      window.location.href = result.sessionUrl; // Redirect user to Stripe Checkout
    } catch (error) {
      console.error("Payment request failed:", error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      name: name || "",
      nee: nee || "",
      surname: surname || "",
      item: selectedItems ? selectedItems.item : "",
      price: selectedItems ? selectedItems.price : 0,
      content,
      payment: selectedItems ? selectedItems.price : 0,
      status: false,
      town: counties.town,
      county: counties.county,
      frist_another_town: anthorCounty?.[0]?.town || '',
      sceond_another_town: anthorCounty?.[1]?.town || '',
      frist_another_county: anthorCounty?.[0]?.county || '',
      another_town: towns?.town || '',
      street,
      category: mapDetails?.category || '',
      church_county: mapDetails.county,
      church: mapDetails?.church || '',
      period_from: PublishingPeriod.From,
      period_to: PublishingPeriod.To
    };

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (frist_images) formData.append('first_image', frist_images[0]);
      if (sceond_images) formData.append('second_image', sceond_images[0]);
      if (thrid_images) formData.append('third_image', thrid_images[0]);

      const response = await fetch(`${import.meta.env.VITE_API_URL}user/add`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error);
        setisModel(true);
        return;
      }

      // Redirect to payment
      handlePayment(result.familyNoticeId, result.price, result.item);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };




  const fetchNotices = async (page, reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}user/notices/pagination`, {
        params: {
          page,
          limit: 10,
          item: "", // Only send the filter if not "All Family Notices"
          ...searchParams, // Include search parameters in the request
        }
      });

      if (reset) {
        setNotices(response.data.notices); // Reset notices if reset flag is true
        setTotalPages(response.data.totalPages); // Set total pages for pagination
      } else {
        const newNotices = response.data.notices.filter(
          notice => !notices.some(existingNotice => existingNotice.id === notice.id)
        );
        setNotices(prev => [...prev, ...newNotices]); // Append only non-duplicate notices
      }

      setHasMore(response.data.notices.length > 0); // Set hasMore based on the response length
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search changes and fetch data
  const handleSearch = (searchData) => {
    setSearchParams(searchData); // Update searchParams with the new search data
  };

  // Handle row selection and log data
  const handleRowSelect = (data) => {
    setSelectedRowData(data);
    setName(data.name)
    setSurname(data.surname)
    setCounties({
      county: data.county,
      town: data.town
    })
    setDeceased_flag(false)
    console.log("Selected Row Data:", data);
  };

  // Fetch notices when searchParams change
  useEffect(() => {
    setNotices([]); // Reset the notices on search change
    setPage(1); // Reset page number
    fetchNotices(1, true); // Fetch notices with reset flag
  }, [searchParams]);

  // Fetch more notices when page changes
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchNotices(newPage);
  };

  const handleNavigate = () => {
    navigate('/')
    setSuccess(false)
    setisModel(false)
  }


  const toggleChecklist = () => {
    setIsChecked(!isChecked); // Toggle the checklist
    if (!isChecked) {
      setIsModalVisible(true); // Show modal when checked
    } else {
      setIsModalVisible(false); // Hide modal when unchecked
    }
  };

  const countytowns = irelandCounty.find(county => county.county === counties.county)?.towns || [];

  return (
    <div className="notice-from cus-mt-170">
      <div className="container mt-5">
        <h2 className="text-center my-5 add-famaily"> Add Family Notice</h2>
        <div className="d-flex justify-content-evenly mb-4 line-hide">
          <div className={`step1-indicator ${currentStep >= 1 ? 'active' : ''}`}>
            <p className={`p-number  ${currentStep >= 1 ? 'p-number-active' : ''}`}> {currentStep > 1 ? <span className="span-number">1</span>


              : <span className="span-number">1</span>}</p> <p className="mx-2 p-line" > Select Type of <br></br> Notice</p>
          </div>
          <div className={`step1-indicator ${currentStep > 2 ? 'active' : ''}`}>
            <p className={`p-number ${currentStep > 2 ? 'p-number-active' : ''}`}>{currentStep > 2 ? <span className="span-number">2</span>
              : <span className="span-number">2</span>}</p> <p className="mx-2 p-line"> Add Details of <br /> the Deceased </p>
          </div>
          <div className={`step1-indicator ${currentStep >= 3 ? 'active' : ''}`}>
            <p className={`p-number ${currentStep > 3 ? 'p-number-active' : ''}`}>{currentStep > 3 ? <span className="span-number">3</span>
              : <span className="span-number">3</span>}</p> <p className="mx-2 p-line"> Add Content </p>
          </div>
          <div className={`step1-indicator ${currentStep > 4 ? 'active' : ''}`}>
            <p className={`p-number mx-2   ${currentStep > 4 ? 'p-number-active' : ''}`}>{currentStep > 4 ? <span className="span-number">4</span> : <span className="span-number">4</span>}</p> <p className="mx-2 p-line"> Pay & Publish </p>
          </div>
        </div>





        <div className="card cus-card-shadow">
          <div className="card-body">



            {currentStep === 1 && (
              <div>
                <div className="select-heading-div my-5">
                  <h2 className="select-type text-center">Select Type of Notice</h2>

                  <p className="select-type-para text-center">Select any of the following notice types. Click the ‘Create Family Notice’ button to continue</p>

                </div>
                <div className="mb-3">
                  <div className="container">
                    <div className="row ">

                      {items.map((item, index) => (
                        <div className="col-lg-6">
                          <div className="form-check" key={item.id}>
                            <div className="frist-from-div my-3">
                              <input
                                className="form-check-input cus-check-input"
                                style={{
                                  marginRight: '10px'
                                }}
                                type="radio"
                                id={`item-${item.id}`}
                                name="noticeItem"
                                checked={item.id}
                                onChange={() => handleItemChange(item)}
                              />
                              <label className="form-check-label" htmlFor={`item-${item.id}`}>
                                {item.item} <br /> <label className="item-price">€{item.price.toFixed(2)}</label>
                              </label>

                            </div>
                            <p className="info-icon">i</p>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>

                </div>


              </div>
            )}



            {currentStep === 2 && (
              <div>
                <div className="shadow-div">
                  <div className="select-heading-div my-5">
                    <h2 className="select-type text-center">Add Details of the Deceased</h2>

                    <p className="select-type-para text-center">Select whether the deceased’s death has been listed here, then continue. Select otherwise to create a new entry </p>

                  </div>
                  <div className="deceased-div my-5">
                    <h4 className="text-center">Has the deceased's death notice been listed on endoflife.ie?</h4>
                    <div className="d-flex"> <button onClick={() => {
                      setDeceased_flag(true)
                    }} className={`d-btn py-1 px-4 mx-2 ${deceased_flag ? 'd-active' : ''}`}>Yes</button>
                      <button onClick={() => { setDeceased_flag(false) }} className={`d-btn py-1 px-4 ${!deceased_flag ? 'd-active' : ''}`}>NO</button></div>
                  </div>
                </div>




                {deceased_flag ? <div className="container">
                  <SearchNotices search="Search For Family Notices" onSearch={handleSearch} nothome={true} insetp={true} para={"Use the search box below to find the death notice you want to link this Acknowledgement to"} />

                  {loading && <p>Loading...</p>}

                  <table className="table table-hover custom-table">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Nee</th>
                        <th>Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notices.map((notice) => (
                        <tr key={notice.id} onClick={() => handleRowSelect(notice)}>
                          <td>{notice.name}</td>
                          <td>{notice.surname}</td>
                          <td>{notice.nee}</td>
                          <td>{notice.item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* {hasMore && !loading && (
                    <button onClick={() => handlePageChange(page + 1)}>Load More</button>
                  )} */}

                  <div className="pagination">
                    {/* Display pagination */}
                    <div className="pagination-container mt-3">
                      <button onClick={() => handlePageChange(page - 1)} className="btn btn-outline-secondary btn-sm" disabled={page === 1}>
                        Previous
                      </button>
                      <span className="mx-3">{page} / {totalPages}</span>
                      <button onClick={() => handlePageChange(page + 1)} className="btn btn-outline-secondary btn-sm" disabled={page === totalPages}>
                        Next
                      </button>
                    </div>


                  </div>
                </div> : (
                  <>
                    <div className="container my-5">

                      <h1 className="text-center select-type">Add Information</h1>
                      <p className="select-type-para text-center">Add information about the deceased</p>
                      <div className="row cus-form ">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-3">

                            <input
                              placeholder="Name"
                              type="text"
                              className="form-control"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-3">

                            <input
                              placeholder="Surname"
                              type="text"
                              className="form-control"
                              value={surname}
                              onChange={(e) => setSurname(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-3">

                            <input
                              placeholder="Nee"
                              type="text"
                              className="form-control"
                              value={nee}
                              onChange={(e) => setnee(e.target.value)}
                            />
                          </div>
                        </div>




                        <div className="col-lg-4">
                          <div className="mb-3" >

                            <select
                              className="form-control"
                              name="county"
                              value={counties.county}
                              onChange={handleCountChange}
                            >
                              <option value="">Select County</option>
                              {irelandCounty.map((county, index) => (
                                <option key={index} value={county.county}>
                                  {county.county}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3" >

                            <select
                              className="form-control"
                              name="town"
                              value={counties.town}
                              onChange={handleCountChange}
                              disabled={counties.county === "" ? true : false}
                            >
                              <option value="">Select Town</option>
                              {countytowns.map((town, index) => (
                                <option key={index} value={town}>
                                  {town}
                                </option>
                              ))}
                            </select>


                          </div>
                        </div>











                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-3">

                            <input
                              placeholder="Street"
                              type="text"
                              className="form-control"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                            />
                          </div>

                        </div>

                      </div>

                      <div className="row cus-row cus-form align-items-center">
                        {anthorflag && (
                          <>
                            <h4 className="county-text1">Would you like this notice to display in another county?</h4>
                            {anthorCounty.map((countyData, index) => (
                              <React.Fragment key={index}>
                                <div className="col-lg-5">
                                  <div className="mb-3">
                                    <label>County</label>
                                    <select
                                      className="form-control"
                                      name="county"
                                      value={countyData.county}
                                      onChange={(e) =>
                                        handleAnthorCountyChange(index, "county", e.target.value)
                                      }
                                    >
                                      <option value="">Select County</option>
                                      {irelandCounty.map((county, idx) => (
                                        <option key={idx} value={county.county}>
                                          {county.county}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="col-lg-5">
                                  <div className="mb-3">
                                    <label>Town</label>
                                    <select
                                      className="form-control"
                                      name="town"
                                      value={countyData.town}
                                      onChange={(e) =>
                                        handleAnthorCountyChange(index, "town", e.target.value)
                                      }
                                      disabled={!countyData.county} // Disable town if no county is selected
                                    >
                                      <option value="">Select Town</option>
                                      {irelandCounty
                                        .find((county) => county.county === countyData.county)
                                        ?.towns.map((town, idx) => (
                                          <option key={idx} value={town}>
                                            {town}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="col-lg-2">
                                  <button
                                    className="btn-icon-cus ml-2"
                                    onClick={() => handleDeleteCounty(index)}
                                  >
                                    < FaRegTrashAlt size={24} color="black" />
                                  </button>

                                </div>
                              </React.Fragment>
                            ))}

                          </>
                        )

                        }



                      </div>

                    </div>
                    <button className="btn mb-3 cus-from-butt" onClick={handleAddCounty}>
                      Add Another County <span><IoMdAdd /></span>
                    </button>


                    {townflag && (
                      <>



                        <div className="row cus-form align-items-center">
                          <div className="col-lg-10 col-md-10 col-sm-10">
                            <div className="mb-3">
                              <label>Town</label>
                              <select
                                className="form-control"
                                name="town"
                                value={towns.town}
                                onChange={(e) => handleTownChange(e.target.value)}
                                disabled={counties.county === "" ? true : false}
                              >
                                <option value="">Select Town</option>
                                {countytowns.map((town, index) => (
                                  <option key={index} value={town}>
                                    {town}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-2">
                            <button
                              className="btn-icon-cus ml-2"
                              onClick={() => handleDeleteTown()}
                            >
                              < FaRegTrashAlt size={24} color="black" />
                            </button>


                          </div>

                        </div>


                      </>
                    )}
                    <button className="btn mb-3 cus-from-butt" onClick={handleAddTown}>
                      Add Another Town <span><IoMdAdd /></span>
                    </button>

                  </>
                )}

              </div>
            )}


            {currentStep === 3 && (
              <div>
                <div className="shadow-div">
                  <div className="step-3-heading">
                    <h3 className="text-center">Add Content</h3>
                    <p className="text-center" >Add all the information here. Select templates and verses. Add Photos and Church Map. View the notice by clicking Preview Notice</p>
                  </div>
                  <div className="row conten-info-main mx-3">
                    <div className="col-lg-6 col-md-6 col-sm-6 content-info">
                      <h1>{selectedItems?.name || ""}</h1>
                      <h3>{`${name + ' ' + surname + `(${nee})`}` || ""}</h3>

                      <p>{`${counties.county + " " + counties.town}`}</p>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 check-div">

                      <div className="toggle-check" >



                        <p>Show Checklist</p>
                        <label className="switch">
                          <input onChange={toggleChecklist} type="checkbox" />
                          <span className={`slider round ${isChecked ? 'ac' : ''}`}></span>
                        </label>
                      </div>



                      <div className="btn-sample-div">
                        <button className="btn-sample" >Text Sample <span>+</span></button>
                        <button className="btn-sample">Sample Verses <span>+</span></button>
                      </div>

                    </div>
                  </div>
                  <div className="mb-3">
                    <div>
                      {isModalVisible && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                          <div className="bg-[#f8f5e4] rounded-lg shadow-lg p-6 w-[650px] border border-gray-300">
                            <h3 className="text-lg font-bold mb-4 text-[#64492b]">
                              A sincere thank you to (include those that apply from each list) and
                              simply write this as a continuous paragraph, separating each group
                              with a semi-colon (;)
                            </h3>
                            <ul className="list-none space-y-2 text-[#64492b]">
                              {[
                                "kind neighbours, relatives, friends, carers;",
                                "those who sent flowers, Mass cards, letters of sympathy, messages of condolence, memorial gifts;",
                                "the doctors, matron, nurses and staff of (name of hospital or hospice);",
                                "the management, nurses and staff of (name of nursing home or residential care centre) for their care and respect shown at all times;",
                                "those who travelled long distances, called to the house, attended the wake, rosary, removal, Mass, service, burial, cremation;",
                                "the (name any associations or charity you would like to acknowledge) for their help and support;",
                                "the (name any local clubs or groups) for their guard of honour;",
                                "all those who participated in the (Mass / service / celebration of life), including (name of celebrant, musicians / soloist);",
                                "parking marshals and those who managed the flow of traffic during the wake and funeral;",
                                "funeral directors, for their sensitive and professional handling of arrangements;",
                              ].map((item, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-[#64492b]">✔</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex justify-end mt-4">
                              <button
                                onClick={() => setIsModalVisible(false)}
                                className="px-4 py-2 bg-transparent text-[#64492b] border border-[#64492b] rounded hover:bg-[#64492b] hover:text-white"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <Editor
                        apiKey="imcj5lcwtj7zoi1bcf6gwnbkzzkgvxnkso4u0f340egont3p"
                        onInit={(_, editor) => editorRef.current = editor}
                        initialValue={content}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                          ],
                          toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onChange={(e) => handleEditorChange(e.target.getContent())}
                      />



                    </div>
                  </div>
                </div>
                <div className="photo-upload-section">



                  <h4 className="upload-title">Add up to 3 Photos</h4>
                  <div className="upload-grid">
                    {/* First Image Upload */}
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="upload-card">

                          <label className="upload-label">
                            <input
                              type="file"
                              className="d-none"
                              accept="image/*"
                              multiple
                              onChange={handleFilefristChange}
                            />
                            <div className="upload-box">

                              {frist_images && (
                                <img
                                  src={URL.createObjectURL(frist_images[0])}
                                  alt="Upload 1"
                                  className="upload-preview"
                                />
                              )}
                              {errors.frist_img && (


                                <p style={{ color: "red" }}>{errors.frist_img}</p>
                              )}

                            </div>
                            <span className="upload-caption cus-from-butt">Add Photo <IoMdAdd /></span>
                          </label>
                        </div>
                      </div>
                      {/* Second Image Upload */}
                      <div className="col-lg-4">
                        <div className="upload-card">
                          <label className="upload-label">
                            <input
                              type="file"
                              className="d-none"
                              accept="image/*"
                              multiple
                              onChange={handleFilesecondChange}
                            />
                            <div className="upload-box">

                              {sceond_images && (
                                <img
                                  src={URL.createObjectURL(sceond_images[0])}
                                  alt="Upload 2"
                                  className="upload-preview"
                                />
                              )}
                              {errors.sceond_img && (


                                <p style={{ color: "red" }}>{errors.sceond_img}</p>
                              )}
                            </div>
                            <span className="upload-caption cus-from-butt">Add Photo <IoMdAdd /></span>
                          </label>
                        </div>
                      </div>
                      {/* Third Image Upload */}
                      <div className="col-lg-4">
                        <div className="upload-card">
                          <label className="upload-label">
                            <input
                              type="file"
                              className="d-none"
                              accept="image/*"
                              multiple
                              onChange={handleFilethirdChange}
                            />
                            <div className="upload-box">

                              {thrid_images && (
                                <img
                                  src={URL.createObjectURL(thrid_images[0])}
                                  alt="Upload 3"
                                  className="upload-preview"
                                />
                              )}
                              {errors.third_img && (


                                <p style={{ color: "red" }}>{errors.third_img}</p>
                              )}
                            </div>
                            <span className="upload-caption cus-from-butt">Add Photo <IoMdAdd /></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="charch-div">

                  <h1> Church MAP </h1>
                  {churchflag && (
                    <>
                      <div className="mb-3">
                        <select
                          className="form-control"
                          name="category"
                          value={mapDetails.category}
                          onChange={handleMapChange}
                        >
                          <option value="">Select Map Category</option>
                          <option value="Mass">Mass</option>
                          <option value="Service">Service</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-control"
                          name="county"
                          value={mapDetails.county}
                          onChange={handleMapChange}
                        >
                          <option value="">Select County</option>
                          {irelandCounty.map((county, index) => (
                            <option key={index} value={county.county}>
                              {county.county}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-control"
                          name="church"
                          value={mapDetails.church}
                          onChange={handleMapChange}
                        >
                          <option value="">Select Church</option>
                          <option value="Church 1">Church 1</option>
                          <option value="Church 2">Church 2</option>
                        </select>
                      </div>

                    </>
                  )}

                  <button className="btn btn-secondary mb-3 cus-from-butt" onClick={() => {
                    setchurchflag(!churchflag)
                  }}>
                    {churchflag ? <p>Remove Church Map <span><MdOutlineClose /></span> </p> : <p> Add Church MAP <span><IoMdAdd /></span> </p>}
                  </button>
                </div>


              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div>
                <div className="shadow-div">
                  <div className="select-heading-div  my-5">
                    <h2 className="select-type text-center">Publish</h2>
                    <p className="select-type-para text-center">Choose The Publish Period and continue to the payment for finalization.</p>

                    {/* <button onClick={handleSubmit} className="btn btn-primary">Submit Payment</button> */}
                  </div>
                  <div className="container  my-5">
                    <div className="row">
                      <div className="col-lg-4 col-md-4">
                        <h4 className="select-type4">Publishing Period</h4>
                        <div className="rightboder">


                          <div className="searchinputdiv my-2">
                            <ReactDatePicker
                              value={PublishingPeriod.From}
                              placeholderText="Select From Date"
                              selected={PublishingPeriod.From}
                              onChange={(date) => handleDateChange(date, 'From')}
                              className="secondRowinput"
                            />
                          </div>


                          <div className="searchinputdiv my-2">
                            <ReactDatePicker
                              value={PublishingPeriod.To}
                              placeholderText="Select To Date"
                              selected={PublishingPeriod.To}
                              onChange={(date) => handleDateChange(date, 'To')}
                              className="secondRowinput"
                            />

                          </div>
                        </div>
                      </div>
                      <div className="com-lg-8 col-md-8">
                        <div>
                          <p className="list-para"> <span><CiCircleCheck color="black" /></span> Notices are published for up to 5 weeks in the Family Notice Section</p>
                          <p className="list-para"> <span><CiCircleCheck /></span>Where a Month's Mind notice has been added, a link to it also shows on the<br />
                            <span className="brack-span"> death notice for up to 5 weeks </span></p>
                          <p className="list-para">  <span><CiCircleCheck /></span>Acknowledgements are linked permanently to the death notice</p>
                          <p className="list-para"> <span><CiCircleCheck /></span> You can edit your Family Notices in the Member’s Area</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container  my-5">
                  <div className="select-heading-div  my-5">
                    <h4 className="summery text-center my-5">Summary</h4>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <h4 className="showname">{name + " " + surname}</h4>
                    </div>

                    <div className="col-lg-6 col-md-6 my-3">
                      <div className="sum-item-div my-2">
                        <h4>{selectedItems.item} </h4>
                        <h4> {`€ ${selectedItems.price}`}</h4>
                      </div>
                      <div className="sum-total-div my-2">
                        <h4 className="total-price">Total </h4>
                        <h4> {`€ ${selectedItems.price}`}</h4>
                      </div>
                      <label className="term">
                        <input
                          className="term-check"
                          type="checkbox"
                          name="termsAccepted"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.value)}
                        />
                        I accept the terms and conditions
                      </label>
                    </div>
                  </div>






                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-3 cus-btn-div-next">
              {currentStep > 1 && (
                <button className="link_btn" onClick={handlePreviousStep}>
                  <p><span>{'<-'}</span>  Previous </p>
                </button>
              )}

              {currentStep === 4 && (
                <button className="link_btn" onClick={handlePreview}>
                  <p>Preview<span><FaEye /></span> </p>
                </button>
              )}
              {currentStep < 4 && (
                <button className="link_btn" onClick={handleNextStep}>
                  {currentStep === 1 ? <p>Create Family Notice <span>{'->'}</span> </p> : <p>Next<span>{'->'}</span> </p>}
                </button>
              )}
              {currentStep === 4 && (
                <button className="link_btn" onClick={handleSubmit}>
                  <p>Pay & Publish <span>{'->'}</span> </p>
                </button>
              )}
            </div>
          </div>


        </div>
        {currentStep === 1 && (
          <div className="notice-feature">
            <h1 className="text-center ">Family Notice Features</h1>
            <NoticeFeatures />
          </div>


        )}
      </div>
      {!success && (
        <Modal
          show={isModel}
          onConfirm={() => setisModel(false)}
          onCancel={() => { setisModel(false) }}
          message={errorMessage}
          title={"Error"}
        />
      )}
      {success && (
        <Modal
          show={isModel}
          onConfirm={handleNavigate}
          onCancel={handleNavigate}
          message={errorMessage}
          title={"Error"}
        />
      )}
      {isPreviewVisible && previewData && (

        <Preview previewData={previewData} onClose={() => {
          setPreviewVisible(false)


        }} />
      )}
    </div>
  );
}

export default MultiStepForm;



