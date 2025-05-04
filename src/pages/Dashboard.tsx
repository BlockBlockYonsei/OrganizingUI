// import React from "react";
import MainLayout from "../components/layout/MainLayout";
import MemberManagement from "../components/members/MemberManagement";
// import TicketingSystem from "../components/tickets/TicketingSystem";
// import { useClubContext } from "../context/ClubContext";

const Dashboard = () => {
  // const { activeTab } = useClubContext();

  return (
    <MainLayout>
      {/* {activeTab === "members" ? <MemberManagement /> : <TicketingSystem />} */}
      <MemberManagement />
      {/* <div>sdfsdfd</div> */}
    </MainLayout>
  );
};

export default Dashboard;
