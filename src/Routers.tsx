import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import MemberManagement from "./pages/MemberManagement";
import PresidentPage from "./pages/PresidentPage";
import NonMemberPage from "./pages/NonMemberPage";

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
          <Route path="/" element={<PresidentPage />}></Route>
          <Route path="/non" element={<NonMemberPage />}></Route>
          <Route path="/test" element={<MemberManagement />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
