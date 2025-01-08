import "./Inbox.css";
import Insidemenu from "./InboxCOMPO/InSideMenu";

import { Outlet } from "react-router-dom";

export default function Inbox() {
  return (
    <>
      <main className="inboxmain">
        <Insidemenu />
        <Outlet />
      </main>
    </>
  );
}
