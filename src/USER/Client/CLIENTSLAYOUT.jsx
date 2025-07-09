import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../ReuseableComponents/CommonCss/LAYOUT.css";
// ----------------------------------------------NAVBAR-------------------------------->
import Nav from "../../ReuseableComponents/Nav/SideMenu";
// ----------------------------------------------DASHBOARD----------------------------->
import Dashboard from "./Dashboard/Dashboard";
// ----------------------------------------------JOBS---------------------------------->
import Jobs from "./Jobs/Jobs";
import Unassigned from "./Jobs/JobsComponents/Unassigned";
import Jobcards from "./Jobs/JobsComponents/Jobcards";
import Add from "./Jobs/JobsComponents/Addnew";
// ----------------------------------------------JOBS OVERVIEW------------------------->
import ProfileOverview from "../Client/Jobs/JobsComponents/JobsOverview/ProfileOverview";
import OnCooverview from "../Client/Jobs/JobsComponents/JobsOverview/OnCooverview";
import Activeoverview from "../Client/Jobs/JobsComponents/JobsOverview/Activeoverview";
// ----------------------------------------------USER PROFILE------------------------->
import UserProfile from "../ReuseableComponents/Profile/Profile";
import MessagePage from "../Chat/components/MessagePage";
import Home from "../Chat/Home";
import JobLayout from "./Jobs/JobsComponents/JobsOverview/JobLayout";

export default function ClientLayout() {
  return (
    <div className="layout">
      <Nav />
      <div className="content">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />}>
            <Route index element={<Unassigned />} />
            <Route path="unassigned" element={<Unassigned />} />
            <Route path="active" element={<Jobcards />} />
            <Route path="ongoing" element={<Jobcards />} />
            <Route path="completed" element={<Jobcards />} />
            <Route path="add" element={<Add />} />
          </Route>
          {/* --------------------Profile Overview--------------------- */}
          <Route path="jobs/unassigned/:viewid" element={<ProfileOverview />} />
          <Route path="jobs/active/:viewid" element={<Activeoverview />} />
          <Route path="jobs/ongoing/:viewid" element={<JobLayout />} />
          <Route path="jobs/completed/:viewid" element={<JobLayout />} />
          <Route path="myProfile" element={<UserProfile />} />
          <Route path="chat" element={<Home />}>
            <Route path=":userId" element={<MessagePage />} />
          </Route>
          {/* <Route path="addprojects" element={<Addprojects />} /> */}
        </Routes>
      </div>
    </div>
  );
}
