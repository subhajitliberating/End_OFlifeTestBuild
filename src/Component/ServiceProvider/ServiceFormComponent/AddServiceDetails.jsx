import React from "react";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import irelandCounty from "../../../Service/irelandCounty";
import { IoMdAdd } from "react-icons/io";
const AddServiceDetails = ({ formData, setFormData }) => {

  const editorRef = useRef(null);

  const [information, setinformation] = useState("<p>This is the initial information of the editor.</p>");
  const [errors, setErrors] = useState({
    logo: "",
    banner: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase(); // Get file extension (e.g., "jpg", "png")

      // Validate file size and type
      if (name === "logo") {
        // Check if the file size exceeds 2MB
        if (file.size > 2 * 1024 * 1024) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            logo: "Logo file size exceeds 2MB. Please upload a smaller file.",
          }));
          return;
        }

        // Check if the file type is PNG or JPG
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            logo: "Logo file must be a PNG or JPG image.",
          }));
          return;
        }

        setErrors((prevErrors) => ({
          ...prevErrors,
          logo: "", // Clear the error if the file is valid
        }));
      }

      if (name === "banner") {
        // Check if the file size exceeds 5MB
        if (file.size > 5 * 1024 * 1024) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            banner: "Banner file size exceeds 5MB. Please upload a smaller file.",
          }));
          return;
        }

        // Check if the file type is PNG or JPG
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            banner: "Banner file must be a PNG or JPG image.",
          }));
          return;
        }

        setErrors((prevErrors) => ({
          ...prevErrors,
          banner: "", // Clear the error if the file is valid
        }));
      }

      // Update the formData with the valid file
      setFormData({ ...formData, [name]: file });
    }
  };

  const handleEditorChange = (information) => {
    setinformation(information);
    console.log(information)
    setFormData({
      ...formData,
      information: information
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      information: information
    });
    //   setMainData(formData);
    // setMainData(formData);
    console.log('Form Data:', formData);
    // Here you can send the formData to your server for processing
  };
  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="form-group my-2 s-inpit-div">
              <label>Business Name</label>
              <input
                required
                type="text"
                name="business_name"
                className="form-s-control"
                placeholder="Enter Your business name"
                value={formData.business_name}
                onChange={handleChange}
              />

            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="form-group my-2 s-inpit-div">
              <label>Location Details</label>
              <input
                type="text"
                name="location_details"
                className="form-s-control"
                placeholder="Enter Your location details "
                value={formData.location_details}
                onChange={handleChange}
              />

            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group my-2 s-inpit-div">
              <label>County</label>
              <select
                name="county"
                value={formData.county}
                onChange={handleChange}
                className="form-s-control"
              >
                <option value="">Select County</option>
                {/* Add your county options here */}
                {irelandCounty.map((county, index) => {
                  return (
                    <option key={index} value={county.county}>
                      {county.county}
                    </option>
                  )
                })}
                {/* ... more options ... */}
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group my-2 s-inpit-div">
              <label>Business Type</label>
              <select
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                className="form-s-control"
              >
                <option value="">Select Business Type</option>

                <option value="Auctioneers & Valuers">Auctioneers & Valuers</option>
                <option value="Bereavement Counselling">Bereavement Counselling</option>
                <option value="Caterers">Caterers</option>
                <option value="Cemeteries & Memorial Parks">Cemeteries & Memorial Parks</option>
                <option value="Charities">Charities</option>
                <option value="Civil & Humanist Funerals">Civil & Humanist Funerals</option>
                <option value="Florists">Florists</option>
                <option value="Funeral Directors">Funeral Directors</option>

              </select>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group my-2 s-inpit-div">
              <label>Phone</label>
              <input
                type="number"
                name="phone"
                className="form-s-control"
                placeholder="Enter Your Phone Number "
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group my-2 s-inpit-div">
              <label>Website</label>
              <input
                type="text"
                name="website"
                className="form-s-control"
                placeholder="Enter Your Webside url "
                value={formData.website}
                onChange={handleChange}
              />

            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="form-group my-2 s-inpit-div">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-s-control"
                placeholder="Enter Your Email "
                value={formData.email}
                onChange={handleChange}
              />

            </div>
          </div>





          <div className="photo-upload-section">



            {/* <h4 className="upload-title">Add up to 3 Photos</h4> */}
            <div className="upload-grid">
              {/* First Image Upload */}
              <div className="row">
                <div className="col-lg-2 col-md-21 d-flex flex-column">
                  <h4 className="img-head">Add Logo</h4>
                  <p className="img-para">File requirements: JPG, <br />
                    PNG, 2MB max size.</p>
                  {errors.logo && <p style={{ color: "red" }}>{errors.logo}</p>}
                </div>
                <div className="col-lg-4 col-md-5 ">
                  <div className="upload-card">
                    <label className="upload-label">
                      <input
                        type="file"
                        name="logo"
                        className="d-none"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                      />
                      <div className="upload-box">

                        {formData?.logo && (
                          <img type="file"
                            name="banner"
                            src={URL.createObjectURL(formData.logo)}
                            alt="Upload 1"
                            className="upload-preview"
                          />
                        )}
                      </div>
                      <span className="upload-caption cus-from-butt">Add Photo <IoMdAdd /></span>
                    </label>
                  </div>
                </div>
                {/* Second Image Upload */}
                <div className="col-lg-2 col-md-11 d-flex flex-column">
                  <h4 className="img-head">Add Banner (Optional)</h4>
                  <p className="img-para">File requirements: JPG, <br />
                    PNG, 5MB max size.</p>
                  {errors.banner && <p style={{ color: "red" }}>{errors.banner}</p>}
                </div>
                <div className="col-lg-4 col-md-5">
                  <div className="upload-card">
                    <label className="upload-label">
                      <input
                        type="file"
                        name="banner"
                        className="d-none"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                      />
                      <div className="upload-box">

                        {formData?.banner && (
                          <img
                            src={URL.createObjectURL(formData?.banner)}
                            alt="Upload 2"
                            className="upload-preview"
                          />
                        )}
                      </div>
                      <span className="upload-caption cus-from-butt">Add Photo <IoMdAdd /></span>
                    </label>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Editor
              apiKey="imcj5lcwtj7zoi1bcf6gwnbkzzkgvxnkso4u0f340egont3p"
              onInit={(_, editor) => editorRef.current = editor}
              initialValue={information}
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
                information_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
              onChange={(e) => handleEditorChange(e.target.getContent())}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddServiceDetails