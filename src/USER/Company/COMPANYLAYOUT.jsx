import React from "react";
import { Route, Routes } from "react-router-dom";
import "./COMPANYLAYOUT.css";
// ----------------------------------------------NAVBAR-------------------------------->
import Nav from "../ReuseableComponents/Navbar/Navbar";
// ----------------------------------------------HOME----------------------------->
import Home from "./Home/Home";
import Bid from "./Home/HomeComponents/Biddingpage.jsx";
// // ----------------------------------------------JOBS---------------------------------->
import Jobs from "./Jobs/Jobs";
import Jobcards from "./Jobs/JobsComponents/Jobcards.jsx";
import Jobview from "./Jobs/JobsComponents/JobsOverview/Jobsview.jsx";
import Onco from "./Jobs/JobsComponents/JobsOverview/OnCooverview.jsx";
import Profile from "../ReuseableComponents/Profile/Profile.jsx";

export default function ClientLayout() {
  return (
    <div className="company-layout">
      <Nav />
      <div className="company-content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="/home/:jobid" element={<Bid />} />

          <Route path="jobs" element={<Jobs />}>
            <Route index element={<Jobcards />} />
            <Route path="bidded" element={<Jobcards />} />
            <Route path="ongoing" element={<Jobcards />} />
            <Route path="completed" element={<Jobcards />} />
          </Route>
          {/* ------------------------------Over View-------------------------- */}
          <Route path="jobs/bidded/:jbid" element={<Jobview />} />
          <Route path="jobs/ongoing/:jbid" element={<Onco />} />
          <Route path="jobs/completed/:jbid" element={<Onco />} />
          <Route path="myProfile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
