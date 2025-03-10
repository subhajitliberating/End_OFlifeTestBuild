import React from "react";
import './Header.css'
import SearchNotices from "../NoticesSearch/SearchNotices";
const Header = () => {
   const search = "Search For Death Notices"
   return (
      <div className="header">

         <div className="heading-text">
            <h1 className="heading">
            Honoring Lives, Preserving Memories
            </h1>
            <p className="para-text">
               Find recent death, notice share family notices and access helpfull resources
            </p>
         </div>


         <SearchNotices search={search} nothome={false} />
      </div>
   )
}

export default Header;