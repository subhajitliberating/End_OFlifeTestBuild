import React from "react";
import Header from "../UI/Header/Header";
import ShortCute from "../UI/ShortCute/ShortCute";
import RecentDeadNoticed from "../UI/RecentDeadNoticed/RecentDeadNoticed";
import Services from "../UI/Services/Services";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const Home = ({ setRole, role }) => {
  const location = useLocation()

  const headding = " Honoring Lives, Preserving Memories"
  const para = " Find recent deth, notice share family notices and access helpfull resources"
  const getCookie = (name) => {
    const cookies = document.cookie;


    const value = `; ${cookies}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };





  const token = sessionStorage.getItem('token');


  useEffect(() => {
   
    // Get the token from cookies
    const token =sessionStorage.getItem('token');
   
    if (token) {
      try {
        // Decode the token using jwt-decode
        const decodedToken = jwtDecode(token);;

        const role = decodedToken.role;
        setRole(role);

      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

  }, [location]);
  return (

    <div className="cus-mt-0"

    >
      <Header />
      <ShortCute />
      <RecentDeadNoticed token={token} />

      <Services token={token} role={role} />
    </div>

  )
}
export default Home