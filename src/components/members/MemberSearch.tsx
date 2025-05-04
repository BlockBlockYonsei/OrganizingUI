import React from "react";
import { Search } from "lucide-react";
import Input from "../ui/Input";
// import { useClubContext } from "../../context/ClubContext";

const MemberSearch = () => {
  // const { searchQuery, setSearchQuery } = useClubContext();

  return (
    <div className="relative">
      <input placeholder="Search members..." />
      {/* <Input
        placeholder="Search members..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        icon={<Search className="h-5 w-5" />}
        iconPosition="left"
      /> */}
    </div>
  );
};

export default MemberSearch;
