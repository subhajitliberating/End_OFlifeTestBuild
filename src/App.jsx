
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Component/Navbar/Navbar';
import Home from "./Component/Home/Home";
import Login from "./Component/RegisterandLogin/Login";
import MainPage from './Component/MainPage/MainPage';
import Footer from "./Component/UI/Footer/Footer";
import Register from "./Component/RegisterandLogin/Register";
import MultiStepForm from "./Component/MultiStepForm/MultiStepForm";
import Service from './Component/ServiceProvider/Service';
import DeathNotice from './Component/Directory/DeathNotice'; 

import NotFound from './Component/NotFound/NotFound'; 
import ServiceDashboard from "./Component/ServiceProvider/ServiceDashboard";
import ServiceFrom from "./Component/ServiceProvider/ServiceFrom";
import ServiceDirector from "./Component/ServiceDirector/ServiceDirector";
import ServiceList from "./Component/ServiceDirector/ServiceList";
import ServiceSingle from "./Component/ServiceDirector/ServiceSingle"
import FamilyNotices from "./Component/FamilyNotices/FamilyNotices";
import AdminDashboard from "./Component/Admin/AdminDashboard ";
import Directory from "./Component/Directory/Directory"
import DirectoryDashboard from "./Component/Directory/DirectoryDashboard";
import DeathNoticeForm from "./Component/Directory/DeathNoticeForm";
import User from "./Component/User/User";
import MyFamilyNotices from "./Component/User/MyFamilyNotices";
import ScrollToTop from "./Component/UI/ScrollToTop";
import NoticeView from "./Component/FamilyNotices/NoticeView";

import Admin from "./Component/Admin/Admin";
import AdminNotices from "./Component/Admin/AdminNotices";
import AdminService from "./Component/Admin/AdminService";
import PaymentSuccess from "./Component/UI/Payment/PaymentSuccess";
import DeathNoticeList from "./Component/User/DeathNoticesList";
import AdminSetting from "./Component/Admin/AdminSetting";
import AdminInvoice from "./Component/Admin/AdminInvioce";
import MyServiceList from "./Component/User/MyServiceList";
import FAQ from "./Component/Subpage/Faq";
import Donate from "./Component/Subpage/Donate";
import PracticalInformation from "./Component/Subpage/PracticalInformation";
import UnderConstruction from "./Component/Subpage/UnderConstruction";
import TermsAndConditions from "./Component/Subpage/TermsAndConditions";
import ContactUs from "./Component/Subpage/ContactUs";
import PrivacyPolicy from "./Component/Subpage/PrivacyPolicy";
import { useEffect } from "react";
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("null");

 const [isNavbarVisible, setIsNavbarVisible] = useState(true); 
 useEffect(() => {
  const start = performance.now();
  return () => console.log("Page Load Time:", performance.now() - start, "ms");
}, []);

 return (
    <BrowserRouter>
      {
        role !=='admin' && (
          <Navbar token={token} user={user} role={role} setToken={setToken} setUser={setUser} setRole={setRole} />
        )
      }
  
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="" element={<Home setToken={setToken} setUser={setUser} setRole={setRole} token={token} role={role} />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login setUser={setUser} setToken={setToken} />} />
          <Route path="forgetpassword" element={<Login/>}/>
          <Route path="register" element={<Register />} />
          <Route path="faq" element={<FAQ/>}/>
          <Route path="donate" element={<Donate/>}/>
          <Route path="info" element={<PracticalInformation/>}/>
          <Route path="notworking" element={<UnderConstruction/>}/>
          <Route path="termsandconditions" element={<TermsAndConditions/>}/>
          <Route path="contactus" element={<ContactUs/>}/>
          <Route path="policy" element={<PrivacyPolicy/>}/>
          {/* <Route path="service-directory" element={<ServiceDirector/>}/>
          <Route path="service-list" element={<ServiceList token={token} role={role}/>}/>
          <Route path="service-single" element={<ServiceSingle token={token} role={role}/>}/> */}
            <Route path="service-directory" element={<ServiceDirector />} />
        <Route path="service-list/:county?/:businessType?" element={<ServiceList token={token} role={role} />} />
        <Route path="service-single/:id/:service" element={<ServiceSingle token={token} role={role} />} />


          <Route path="familynotices" element={<FamilyNotices/>}/>
          <Route path="noticesview/:name" element={<NoticeView />} />
          <Route path="deathnotice" element={<DeathNotice/>}/>
          <Route path="deathnotice/:countydata" element={<DeathNotice/>}/>
          <Route path="/payment-success" element={<PaymentSuccess />} />


          {role === 'user' && (
   <Route path="user" element={<User />}>
  <Route path="addnotice" element={<MultiStepForm token={token}  />} />
  <Route path="myfamilynotices" element={<MyFamilyNotices token={token}/>} />
  <Route path="noticesview/:name" element={<NoticeView />} />

  
 </Route>
            
          ) }
                            
          {role === 'service provider' && (
            <Route path="service" element={<Service />}>
               <Route path="deathnotice" element={<DeathNotice/>}/>
              <Route path="servicefrom" element={<ServiceFrom token={token} />} />
              <Route path="service-directory" element={<ServiceDirector/>}/>
              <Route path="service-list" element={<ServiceList token={token}/>}/>
              <Route path="myservice" element={<MyServiceList token={token} role={role}/>} />
            </Route>
          )}

{role === 'admin' && (


<Route path="admin" element={<Admin nav={isNavbarVisible} setToken={setToken}setRole={setRole} />}>
            
            <Route path="dashboard" element={<AdminDashboard token={token} />} />
            <Route path="notices" element={<AdminNotices token={token} />} />
            <Route path="notices/family" element={<AdminNotices token={token} role={role} family={true}/>}/>
            <Route path="notices/death" element={<AdminNotices token={token} role={role} death={true}/>}/>
            <Route path="notices/types" element={<AdminNotices token={token} role={role} death={false} family={false}/>}/>
            <Route path="service-directory" element={<AdminService token={token}/>}/>
            <Route path="service-list" element={<ServiceList token={token} role={role}/>}/>
            <Route path="setting" element={<AdminSetting token={token} role={role}/>}/>
            <Route path="invoice" element={<AdminInvoice token={token} role={role}/>}/>
         
          </Route>

        
          )}

{role === 'directory' && (
            <Route path="directory" element={<Directory />}>
              <Route path="dashboard" element={<DirectoryDashboard/>} />
              <Route path="deatnotice" element={<DeathNoticeForm token={token} />} />
              <Route path="service-directory" element={<ServiceDirector/>}/>
              <Route path="service-list" element={<ServiceList token={token}/>}/>
              <Route path="mydeathnotices" element={<MyFamilyNotices token={token} role={role}/>} />
            </Route>
          )}

          
          {/* {role === 'admin' && <Route path="dashboard" element={<Dashboard />} />} */}
        </Route>

        {/* Wildcard route to catch unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
   {
    role !== 'admin' && (
      <Footer />
    )
   }
    </BrowserRouter>






  );
}

export default App;


