import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import SignupPage from "./Login/SignUpPage";
import RegChoice from "./Registerations/RegChoice";
import CompanyRegistrationPage from "./Registerations/CompanyRegistrationPage";
import FreelancerRegistrationPage from "./Registerations/FreelancerRegistrationPage";
import ClientRegistrationPage from "./Registerations/ClientRegistrationPage";
import LandingPage from "./Landing/LandingPage";
import SetupProjects from "./Setup/SetupProjects";
import SetupProfile from "./Setup/SetupProfile";
import ForgotPassword from "./Setup/ForgotPassword";
import ChangePassword from "./Setup/ChangePassword";
import Explore from "./explore/Explore";
const Landing = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/changePassword/:secret" element={<ChangePassword />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/choice" element={<RegChoice />} />
      <Route path="/register/client" element={<ClientRegistrationPage />} />
      <Route path="/register/company" element={<CompanyRegistrationPage />} />
      <Route
        path="/register/freelancer"
        element={<FreelancerRegistrationPage />}
      />
      <Route path="/setup/:id" element={<SetupProfile />} />
      <Route path="/setup/addProjects" element={<SetupProjects />} />
    </Routes>
  );
};
export default Landing;
