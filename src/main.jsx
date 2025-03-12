import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/css/single_services.css'
import './assets/css/business_details.css'
import './Component/Admin/Style.css'
import './Component/Directory/Style.css'
import './Component/FamilyNotices/Style.css'
import './Component/MultiStepForm/MultiStepForm.css'
import './Component/Navbar/Navbar.css'
import './Component/RegisterandLogin/Style.css'
import  './Component/ServiceDirector/ServiceDirector.css'
import './Component/ServiceProvider/style.css'
import './Component/ServiceProvider/ServiceFormComponent/style.css'
import './Component/UI/DeadNotice/DeathNotices.css'
import './Component/UI/Footer/Footer.css'
import './Component/UI/Header/Header.css'
import './Component/UI/Map/Map.css'
import './Component/UI/Modal/style.css'
import './Component/UI/NoticesSearch/SearchNotices.css'
import './Component/UI/Payment/Payment.css'
import './Component/UI/Preview/Preview.css'
import './Component/UI/RecentDeadNoticed/RecentDeadNoticed.css'
import './Component/UI/Services/Services.css'
import './Component/UI/ShortCute/ShortCute.css'
import './Component/User/Style.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
