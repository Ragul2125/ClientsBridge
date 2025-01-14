import AdminPanel from "./admin/AdminPanel";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Landing/Landing";
import Callback from "./Dummy/Callback";
import Chat from "./admin/testChat/Chat";
import ClientLayout from "./USER/Client/CLIENTSLAYOUT";
import CompanyLayout from "./USER/Company/COMPANYLAYOUT";
import Sec from "../src/USER/ReuseableComponents/Success/Success";
import Profile from "./USER/ReuseableComponents/Profile/Profile";
import Load from "./USER/ReuseableComponents/Loaders/Load";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Landing />} />
        <Route path="/test" element={<Chat />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/callback/:token/:role" element={<Callback />} />
        <Route path="/client/*" element={<ClientLayout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/company/*" element={<CompanyLayout />} />
        <Route path="/freelancer/*" element={<CompanyLayout />} />
        <Route path="/success" element={<Sec />} />
        <Route path="/load" element={<Load />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
