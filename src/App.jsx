import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import GetInvolved from "./pages/GetInvolved";
import MeetTheTeam from "./pages/MeetTheTeam";
import SupportUs from "./pages/SupportUs";
import Login from "./pages/Login"

// TODO: Add Register and Dashboard + their Supabase Auth Wrapper
// TODO: Add Helmet for Page-Specific Metadata

const App = () => {
  const location = useLocation();

  const noHeaderFooterRoutes = [];
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/team" element={<MeetTheTeam />} />
        <Route path="/support-us" element={<SupportUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default App;
