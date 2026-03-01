import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../ReuseableComponents/CommonCss/LAYOUT.css";
// ----------------------------------------------NAVBAR-------------------------------->
import Nav from "../../ReuseableComponents/Nav/SideMenu.jsx";
// ----------------------------------------------HOME----------------------------->
import Home from "./Home/Home";
import Bid from "./Home/HomeComponents/Biddingpage.jsx";
// // ----------------------------------------------JOBS---------------------------------->
import Jobs from "./Jobs/Jobs";
import Jobcards from "./Jobs/JobsComponents/Jobcards.jsx";
import Jobview from "./Jobs/JobsComponents/JobsOverview/Jobsview.jsx";
import Onco from "./Jobs/JobsComponents/JobsOverview/OnCooverview.jsx";
import Profile from "../ReuseableComponents/Profile/Profile.jsx";
import Homepg from "../Chat/Home.jsx";
import MessagePage from "../Chat/components/MessagePage.jsx";
import Addprojects from "../../Landing/Setup/SetupProjects.jsx";

export default function ClientLayout() {
  return (
    <div className="layout">
      <Nav />
      <div className="content">
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
          <Route path="myProfile/addprojects" element={<Addprojects />} />
          <Route path="chat" element={<Homepg />}>
            <Route path=":userId" element={<MessagePage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
