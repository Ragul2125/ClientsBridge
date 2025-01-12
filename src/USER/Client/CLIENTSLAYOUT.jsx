import React from "react";
import { Route, Routes } from "react-router-dom";
import "./CLIENTSLAYOUT.css";
// ----------------------------------------------NAVBAR-------------------------------->
import Nav from "../ReuseableComponents/Navbar/Navbar";
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

export default function ClientLayout() {
  return (
    <div className="client-layout">
      <Nav />
      <div className="client-content">
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
          <Route path="jobs/ongoing/:viewid" element={<OnCooverview />} />
          <Route path="jobs/completed/:viewid" element={<OnCooverview />} />
          <Route path="myProfile" element={<UserProfile />} />
          <Route path="chat" element={<Home />}>
            <Route path=":id" element={<MessagePage />} />
          </Route>
          {/* <Route path="addprojects" element={<Addprojects />} /> */}
        </Routes>
      </div>
    </div>
  );
}
