



import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Editor } from "@tinymce/tinymce-react";
import { MdOutlineClose } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import irelandCounty from "../../Service/irelandCounty";
import Modal from "../UI/Modal/Modal";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { useEffect } from "react";
import axios from "axios";
import { CiCircleCheck } from "react-icons/ci";
import { format } from "date-fns";
import { FaRegTrashAlt } from "react-icons/fa";


function DeathNoticeForm({ token }) {
 const navigate = useNavigate();
 const [currentStep, setCurrentStep] = useState(1);
 const [townflag, setTownflag] = useState(false)
 const [price, setPrice] = useState()

    // State for step 2

    const [name, setName] = useState("");
    const [content, setContent] = useState("<p>This is the initial content of the editor.</p>");
    const [surname, setSurname] = useState("");
    const [nee, setnee] = useState("")
    const [counties, setCounties] = useState({ county: "", town: "" });
    const [street, setStreet] = useState("")
    const [towns, setTowns] = useState({ town: "Town 1" });
    const [anthorCounty, setAnthorCounty] = useState([{ county: "", town: "" }]);
    const [anthorflag, setanthorflag] = useState(false)
    const [isModel, setisModel] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [success, setSuccess] = useState(false);
    // State for step 3

    const [PublishingPeriod, setPublishingPeriodh] = useState({

        From: '',
        To: ''
    });

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
    // State for step 4 (dummy payment)
  

    const editorRef = useRef(null);




    const fetchPrice = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}directore/price`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPrice(response.data.price[0].price)
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };


    useEffect(() => {
        fetchPrice()
    }, [])



    const handleDateChange = (date, field) => {
        if (date) {
            const utcDate = new Date(Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            ));

            setPublishingPeriodh((prevState) => ({
                ...prevState,
                [field]: utcDate // Save in UTC to prevent timezone issues
            }));
        }
    };


    // Handle Next Step
    const handleNextStep = () => {


        if (currentStep === 1) {
            setCurrentStep(currentStep + 1);
            return
        }


        if (name && surname && counties.county && counties.town && frist_images && currentStep === 2) {
            setCurrentStep(currentStep + 1);
            return
        }



        else {

            if (!name && currentStep === 2) {
                setErrorMessage("Enter the Name ")
            }
            if (!surname && currentStep === 2) {
                setErrorMessage('Enter Surname')

            }

            if (!counties.county && currentStep === 2) {
                setErrorMessage('Select County')
            }
            if (!counties.town && currentStep === 2) {
                setErrorMessage('Select Town')
            }
            if (!frist_images && currentStep === 2) {
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



    // Handle payment method change in Step 4
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePreview = () => {
        setPreview(true); // Show preview
    };

    // Function to handle save


    // Function to handle content change in the editor
    const handleEditorChange = (content) => {
        setContent(content);
    };
    

    const handleSubmit = async () => {
        if (!price) {
            setErrorMessage("Someting is Worng to Add Notice")
            setisModel(true)
            return
        }
        const data = {
            name: name || "",
            nee: nee || "",
            surname: surname || "",

            price: price,
            content,

            status: true,
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

            const response = await fetch(`${import.meta.env.VITE_API_URL}directore/add`, {
                method: "POST",
                body: formData,

                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();

            if (!response.ok) {

                setErrorMessage(result.error)
                setisModel(true)
                return;
            }
            setSuccess(true)
            setisModel(true)
            setErrorMessage("Death notice added successfully!")


            // Reset form or navigate
        } catch (error) {
            console.log(error)
        }
    };
    const handleNavigate = () => {
        navigate('/')
        setSuccess(false)
        setisModel(false)
    }
    const formattedFromDate = PublishingPeriod.From
        ? format(new Date(PublishingPeriod.From), "MMMM dd, yyyy")
        : "Select From Date";
    const countytowns = irelandCounty.find(county => county.county === counties.county)?.towns || [];

    return (
        <div className="notice-from cus-mt-170">

            <div className="container mt-5">
                <h2 className="text-center my-5 add-famaily"> Add Death Notice</h2>

                <p className="text-center mb-5 death-heading-para"> Follow the steps to create a respectful and detailed notice.</p>
                <div className="d-flex justify-content-evenly mb-4 .line-hide">
                    <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>
                        <p className={`p-number ${currentStep >= 1 ? 'p-number-active' : ''}`}> {currentStep > 1 ? <span className="span-number">1</span>


                            : <span className="span-number">1</span>}</p> <p className="mx-2 p-line" > Introduction</p>
                    </div>
                    <div className={`step-indicator ${currentStep > 2 ? 'active' : ''}`}>
                        <p className={`p-number ${currentStep > 2 ? 'p-number-active' : ''}`}>{currentStep > 2 ? <span className="span-number">2</span>
                            : <span className="span-number">2</span>}</p> <p className="mx-2 p-line">Add Details </p>
                    </div>
                    <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''}`}>
                        <p className={`p-number ${currentStep > 3 ? 'p-number-active' : ''}`}>{currentStep > 3 ? <span className="span-number">3</span>
                            : <span className="span-number">3</span>}</p> <p className="mx-2 p-line"> Pay and Finalize </p>
                    </div>

                </div>





                <div className="card">
                    <div className="card-body">



                        {currentStep === 1 && (
                            <div className=" intro-div">
                                <p className="text-justfiy into-para">
                                    As a Funeral Director, your role in publishing a death notice is critical in informing communities and loved ones respectfully and efficiently. This platform is designed to streamline the process for you, allowing notices to be shared with precision and professionalism.
                                </p>
                                <ul> <span>  What You’ll Need to Provide?</span>

                                    <li> <b> Deceased’s Full Name:</b> Ensure the spelling and order are correct.</li>
                                    <li> <b>Location: Provide</b> the area associated with the deceased or their family.</li>
                                    <li> <b>County and Town:</b> Select from our dropdown menus to ensure proper categorization.</li>
                                    <li> <b>Publishing Date:</b> Choose the date on which the notice will go live.</li>
                                    <li><b>Optional Details:</b> You may also add a short message if necessary (e.g., ceremony details or family preferences).</li>


                                </ul>

                                <ul> <span>Why Use Our Platform?</span>
                                    <li> <b>Efficient Workflow:</b> Save time with our intuitive interface.</li>
                                    <li><b> Wide Reach:</b> Notices are displayed on an interactive map, ensuring visibility for the relevant region.</li>
                                    <li> <b>Respect and Professionalism:</b> Our system is tailored for the solemn nature of these announcements.</li>

                                </ul>


                            </div>
                        )}

                        {currentStep === 2 && (
                            <div>
                                <div className="select-heading-div my-5">
                                    <h2 className="select-type text-center">Add Information</h2>
                                    <p className="select-type-para text-center">Add information about the deceased: </p>
                                </div>

                                <>
                                    <div className="container">
                                        <div className="row cus-form">
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
                                                                <div>

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
                                                                <div>

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
                                                                    className="btn-icon-cus"
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
                                                    <div>

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
                                    <button className="btn  mb-3 cus-from-butt" onClick={handleAddTown}>
                                        Add Another Town <span><IoMdAdd /></span>
                                    </button>

                                </>
                                <div>

                                    <div className="mb-3">
                                        <div>

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


                                    <div className="photo-upload-section">
                                        <h4 className="upload-title text-center">Add up to 3 Photos</h4>
                                        <div className="upload-grid">
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


                            </div>
                        )}




                        {/* Step 4: Payment */}
                        {currentStep === 3 && (
                            <div>
                                <div className="shadow-div">
                                    <div className="select-heading-div  my-5">
                                        <h2 className="select-type text-center">Publish</h2>
                                        <p className="select-type-para text-center">Choose The Publish Period and continue to the payment for finalization.</p>

                                        {/* <button onClick={handleSubmit} className="btn btn-primary">Submit Payment</button> */}
                                    </div>
                                    <div className="container mx-5 my-5">
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

                                    <div>

                                        <h4 className="text-center sum-heading py-4">{name + " " + surname}</h4>

                                        <p className="text-center p-town-color">{counties?.town}</p>
                                        <p className="text-center p-town-county-date">{counties?.town + ", " + counties.county}</p>
                                        <p className="text-center p-town-county-date">Publish Date: {formattedFromDate}</p>


                                    </div>

                                    <div className="my-5">

                                        <div
                                            className="border p-3"
                                            dangerouslySetInnerHTML={{ __html: content }} // Display content as HTML
                                        />
                                    </div>


                                    <div className="ny-5 text-center mx-5" >

                                        <p className="p-last">
                                            Once you click "Publish Notice", your announcement will be live and visible to those who may need to view it. The notice will remain active for the selected duration, and you will be able to make any necessary updates or modifications through your dashboard. We aim to make this process as seamless as possible while ensuring every detail is handled with respect and care.
                                        </p>
                                    </div>




                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-3 cus-btn-div-next">
                            {currentStep > 1 && (
                                <button className="link_btn " onClick={handlePreviousStep}>
                                    <p> Previous<span>{'<-'}</span> </p>
                                </button>
                            )}
                            {currentStep < 3 && (
                                <button className="link_btn" onClick={handleNextStep}>
                                    {currentStep === 1 ? <p>Create Death Notice <span>{'->'}</span> </p> : <p>Next<span>{'->'}</span> </p>}
                                </button>
                            )}
                            {currentStep === 3 && (
                                <button className="link_btn" onClick={handleSubmit}>
                                    {<p>Publish <span>{'->'}</span> </p>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
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
        </div>
    );
}

export default DeathNoticeForm;
