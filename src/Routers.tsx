import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Layout from "./Layout";
import ExecutiveMemberPage from "./pages/ExecutiveMemberPage";
import ExecutiveMemberTicketPage from "./pages/ExecutiveMemberTicketPage";
import OverviewPage from "./pages/OverviewPage";

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
          <Route path="/" element={<OverviewPage />}></Route>
          <Route path="/exe-member" element={<ExecutiveMemberPage />}></Route>
          <Route
            path="/exe-member-ticket"
            element={<ExecutiveMemberTicketPage />}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}
