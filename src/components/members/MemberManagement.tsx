import MemberSearch from "./MemberSearch";
import MemberTable from "./MemberTable";

const MemberManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Club Members</h2>
        <MemberSearch />
      </div>
      <MemberTable />
    </div>
  );
};

export default MemberManagement;
