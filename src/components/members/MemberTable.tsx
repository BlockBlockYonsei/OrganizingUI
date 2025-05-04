import React from "react";
// import { useClubContext } from "../../context/ClubContext";
import RoleBadge from "./RoleBadge";
import ActionDropdown from "./ActionDropdown";

const MemberTable = () => {
  // const { filteredUsers, promoteToMember, designateStaff, appointPresident } =
  //   useClubContext();

  return (
    <div className="bg-[#1e293b] rounded-lg border border-[#334155] overflow-hidden">
      <table className="min-w-full divide-y divide-[#334155]">
        <thead className="bg-[#1e293b]">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Member
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Wallet Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Join Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#334155]">
          {/* {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-[#272f3d]">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {user.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {user.walletAddress}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {user.joinDate || "-"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <ActionDropdown
                  user={user}
                  onPromote={promoteToMember}
                  onDesignateStaff={designateStaff}
                  onAppointPresident={appointPresident}
                />
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
