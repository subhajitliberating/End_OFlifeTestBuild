import React from "react";
import { Outlet } from "react-router-dom";  // Import Outlet for child route rendering

function MainPage() {
  return (
  
<div >
 
<Outlet />
</div>
 

  );
}

export default MainPage;
