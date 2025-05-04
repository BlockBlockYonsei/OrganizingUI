import React from "react";
import { Crown, Star, User, Users } from "lucide-react";
import { UserRole } from "../../types";

interface RoleBadgeProps {
  role: UserRole;
}

const RoleBadge = ({ role }: RoleBadgeProps) => {
  switch (role) {
    case "president":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#6d28d9] text-white">
          <Crown className="mr-1 h-3 w-3" />
          President
        </span>
      );
    case "staff":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2563eb] text-white">
          <Star className="mr-1 h-3 w-3" />
          Staff
        </span>
      );
    case "member":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#10b981] text-white">
          <Users className="mr-1 h-3 w-3" />
          Member
        </span>
      );
    case "non-member":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#334155] text-gray-300">
          <User className="mr-1 h-3 w-3" />
          Non-Member
        </span>
      );
    default:
      return null;
  }
};

export default RoleBadge;
