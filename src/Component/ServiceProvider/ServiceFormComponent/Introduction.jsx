import React from "react";


const Introduction =({formData})=>{
return(
    <div className="intro-div">
    <p className="text-justfiy into-para">
    End of Life is Ireland's trusted platform for connecting families with essential services during life's most challenging moments. By adding your business to our directory, you'll gain visibility among those actively seeking the expertise and care you provide.
    </p>
  <ul> <span> Why List Your Service? </span>
      <li>Reach a targeted audience actively seeking your services</li>
      <li>Gain visibility and credibility through our trusted platform</li>
      <li>Enhance your online presence and drive more leads</li>
  
  </ul>
  <ul> <span>  One-Time Fee </span> 
  <li>
  {`For only €${formData.payment} your business will be featured in our directory under the category and location of your choice.`}</li>
  </ul>
  <ul> <span> One-Time Fee </span> 
      <li>Dedicated service listing with detailed information.</li>
      <li>High-quality profile picture and logo upload.</li>
      <li>Direct contact information and map integration.</li>
       <li>Ability to add contact details, website, and custom content.</li>
       <li>Accessible to families across Ireland 24/7.</li>
  </ul>
  
  
  </div>
)



}


export default Introduction;