import React from "react";

import { Outlet } from "react-router-dom"; 
const User = () => {
    return (
  
        <div className="App" style={{
            marginTop :'165px'
        }}>
         
        <Outlet />
        </div>
         
        
          );
        }

export default User;