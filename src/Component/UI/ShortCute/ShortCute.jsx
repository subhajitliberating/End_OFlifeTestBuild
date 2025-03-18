import React from "react";
// import bg from '../../../assets/bg.webp'
import './ShortCute.css'
import ob from '../../../assets/ob.svg'
import pr from '../../../assets/pr.svg'
import me from '../../../assets/me.svg'
import Map from "../Map/Map";
import DeathNotices from "../DeadNotice/DeathNotices";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ShortCute = ()=>{

   
 const card = [

    {
        icon:ob,
        heading:"Obituaries Archive",
        para:'Access past obituaries by year or name. Useful for those looking for older notices or conducting genealogical research.',
        button:'View Obituaries',
        link : '/notworking',
    
    },
    {   icon:pr,
        heading:"Practical Information",
        para:'A dedicated page listing upcoming funerals with dates, times, and locations. Provides convenience for people planning to attend services.',
        button:'Read More',
        link:'/info',
    
    }
        ,
    {   icon:me,
        heading:"Memorial Pages",
        para:'A section allowing families to create permanent digital memorials.Includes photos, stories, and tributes from loved ones.',
        button:'Create Memorial'
        ,
        link:'/notworking',
    }
 ]


    return(
        <div className="short-cute">
            <div className="container">
            <div className="row justify-content-around">
              {card.map((card,index)=>(
               <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
               <div className="short-cut-box">
                <img src={card.icon} alt="icon" className="short-cut-icon"/>
                <h2 className="short-cut-card-heading">{card.heading}</h2>
                <p className="short-cut-card-para">{card.para}</p>
                <Link to={card.link} className="short-cut-card-button">{`${card.button}`}

                    <p className="btn-para">{"->"}</p>
                </Link>

               </div>
               </div>
              ))}
                </div>
                </div>
                <div className="map-death-notice">
                  <div className="container">
                 <div className="row d-flex justify-content-between">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                    <Map/>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                    <DeathNotices/>
                    </div>
                    </div>
              </div>



                </div>
                </div>
        

       
    )
}

export default ShortCute;