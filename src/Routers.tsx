import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import MemberManagement from "./pages/MemberManagement";
import ExecutiveMemberPage from "./pages/ExecutiveMemberPage";
import ExecutiveMemberTicketPage from "./pages/ExecutiveMemberTicketPage";
import LandingPage from "./pages/LandingPage";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/exe-member" element={<ExecutiveMemberPage />}></Route>
          <Route
            path="/exe-member-ticket"
            element={<ExecutiveMemberTicketPage />}
          ></Route>
          <Route path="/test" element={<MemberManagement />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
