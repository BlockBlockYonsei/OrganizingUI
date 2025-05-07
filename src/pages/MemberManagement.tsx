import MemberSearch from "../components/members/MemberSearch";
import MemberTable from "../components/members/MemberTable";

const MemberManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          Club Members 123123
        </h2>
        <MemberSearch />
      </div>
      <MemberTable />
    </div>
  );
};

export default MemberManagement;
