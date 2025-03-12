import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ob from '../../../assets/ob.svg'
import pr from '../../../assets/pr.svg'
import me from '../../../assets/me.svg'

const NoticeFeatures = ()=>{
    const card = [

        {
            icon:ob,
            heading:"Long Duration",
            para:'List notice for up to 5 weeks under Family Notices section',
            button:'Read More'
        },
        {   icon:pr,
            heading:"Death Notice Link",
            para:'Permanently link Acknowledgement to death notice - view',
            button:'Read More'}
            ,
        {   icon:me,
            heading:"Verses & Gallery",
            para:'Add up to 3 photos and a verse',
            button:'Read More'
        },
        
        {
            icon:ob,
            heading:"Month’s Mind Link",
            para:'Show Month s Mind link on death notice for up to 5 wks - view',
            button:'Read More'
        },
        {   icon:pr,
            heading:"Sharing",
            para:'Share on Social Media',
            button:'Read More'}
            ,
        {   icon:me,
            heading:"Editable",
            para:'Save a draft notice & edit errors or omissions immediately',
            button:'Read More'
        }
     ]
    
    
        return(
            <div>
                <div className="container">
                <div className="row justify-content-around">
                  {card.map((card,index)=>(
                   <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                   <div className="short-cut-box-cus">
                    <img src={card.icon} alt="icon" className="short-cut-icon"/>
                    <h3 className="short-cut-card-heading">{card.heading}</h3>
                    <p className="short-cut-card-para">{card.para}</p>
                    <Link to="/notworking" className="short-cut-card-button">{`${card.button}`}
    
                        <p className="btn-para">{"->"}</p>
                    </Link>
    
                   </div>
                   </div>
                  ))}
                    </div>
                    </div>
                  
                    </div>
            
    
           
        )

}

export default  NoticeFeatures;