

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchNotices.css';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
const SearchNotices = ({ search, onSearch, nothome ,insetp,para }) => {
    const [Noticesearch, setNoticesearch] = useState({
        FristName: '',
        SurName: '',
        Nee: '',
        County: '',
        Town: '',
        From: '',
        To: ''
    });
    const navigate = useNavigate()
    // Handle input change
    const HandleInputChang = (e) => {
        const { name, value } = e.target;
        setNoticesearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: Noticesearch.FristName,
            surname: Noticesearch.SurName,
            nee: Noticesearch.Nee,
            county: Noticesearch.County,
            town: Noticesearch.Town,
            createdAt: Noticesearch.From,
            updatedAt: Noticesearch.To
        };



        if (!nothome) {
            navigate('/deathnotice', { state: { data } });
        }
        else{
            onSearch(data);
        }
      



        // Pass search data to the parent component
    };

    const handleDateChange = (date, field) => {
        // Update the state based on which field was changed
        setNoticesearch((prevState) => ({
          ...prevState,
          [field]: date // Dynamically update the field (From or To)
        }));
      };

    return (
        <form className={`serachBox ${nothome ? '' : 'nothome'}`} onSubmit={handleSubmit}>
            <h1 className={insetp ?   "text-center select-type": "search-heading"}>{search}</h1>

            {para && (<p className="select-type-para text-center">{para}</p>)}
            <div className="row" style={{ marginBottom: '25px' }}>
                <div className="col-md-2 col-lg-4 col-sm-12">
                    <div className="serachinputdiv">
                        <input
                            placeholder="First Name"
                            className="fristRowinput"
                            type="text"
                            name="FristName"
                            value={Noticesearch.FristName}
                            onChange={HandleInputChang}
                        />
                    </div>
                </div>
                <div className="col-md-2 col-lg-4 col-sm-12">
                    <div className="serachinputdiv">
                        <input
                            placeholder="Surname"
                            className="fristRowinput"
                            type="text"
                            name="SurName"
                            value={Noticesearch.SurName}
                            onChange={HandleInputChang}
                        />
                    </div>
                </div>
                <div className="col-md-2 col-lg-4 col-sm-12">
                    <div className="serachinputdiv">
                        <input
                            placeholder="Nee"
                            className="fristRowinput"
                            type="text"
                            name="Nee"
                            value={Noticesearch.Nee}
                            onChange={HandleInputChang}
                        />
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginBottom: '40px' }}>
                <div className="col-lg-3 col-md-2 col-sm-12">
                    <div className="serachinputdiv">
                        <input
                            placeholder=" County"
                            className="secondRowinput"
                            type="text"
                            name="County"
                            value={Noticesearch.County}
                            onChange={HandleInputChang}
                        />
                    </div>
                </div>
                <div className="col-lg-3 col-md-2 col-sm-12">
                    <div className="serachinputdiv">
                        <input
                            placeholder="Town"
                            className="secondRowinput"
                            type="text"
                            name="Town"
                            value={Noticesearch.Town}
                            onChange={HandleInputChang}
                        />
                    </div>
                </div>
                {/* <div className="col-lg-3 col-md-2 col-sm-12">
                    <div className="serachinputdiv">
                        <input
                            placeholder="From Date"
                            className="secondRowinput"
                            type="date"
                            name="From"
                            value={Noticesearch.From}
                            onChange={HandleInputChang}
                        />
                    </div>
                </div>
                <div className="col-lg-3 col-md-2 col-sm-12">
                    <div className="serachinputdiv">
                        <input
                            placeholder="To Date:"
                            className="secondRowinput"
                            type="date"
                            name="To"
                            value={Noticesearch.To}
                            onChange={HandleInputChang}
                        />
                    </div>
                </div> */}

<div className="col-lg-3 col-md-2 col-sm-12">
    <div className="searchinputdiv">
        
        <ReactDatePicker
            placeholderText="Select From Date"
            selected={Noticesearch.From}
            onChange={(date) => handleDateChange(date, 'From')}
            className="secondRowinput"
        />
        <div className="dateicon">
        < FaCalendarAlt size={16}  style={{
            color : '#3a2f49',
            fontFamily : "Cormorant Garamond"
        }} />
        </div>
    </div>
</div>
<div className="col-lg-3 col-md-2 col-sm-12 ">
    <div className="searchinputdiv" >
        <ReactDatePicker
             value={Noticesearch.To}
            placeholderText="Select To Date"
            selected={Noticesearch.To}
            onChange={(date) => handleDateChange(date, 'To')}
            className="secondRowinput"
        />
            <div className="dateicon">
        < FaCalendarAlt size={16}
         style={{
            color : '#3a2f49',
            fontFamily : "Cormorant Garamond"
        }}
        />
        </div>
    </div>
</div>
            </div>
            <button className="short-cut-card-button " type="submit"> <span> SEARCH NOTICES </span> <span className="btn-para">{"->"}</span></button>
        </form>
    );
};

export default SearchNotices;
