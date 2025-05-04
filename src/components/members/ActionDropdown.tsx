import React, { useState } from "react";
import { ChevronDown, Crown, Plus, Star } from "lucide-react";
import { User } from "../../types";

interface ActionDropdownProps {
  user: User;
  onPromote: (id: string) => void;
  onDesignateStaff: (id: string) => void;
  onAppointPresident: (id: string) => void;
}

const ActionDropdown = ({
  user,
  onPromote,
  onDesignateStaff,
  onAppointPresident,
}: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-[#334155] shadow-sm px-4 py-2 bg-[#1e293b] text-sm font-medium text-gray-200 hover:bg-[#334155] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1e293b] focus:ring-[#8b5cf6]"
        onClick={() => setIsOpen(!isOpen)}
      >
        Actions
        <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#1e293b] ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-[#334155]"
          onBlur={() => setIsOpen(false)}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {user.role === "non-member" && (
              <>
                <button
                  onClick={() => {
                    onPromote(user.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#334155]"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4 text-[#10b981]" />
                    Promote to Member
                  </div>
                </button>
                <button
                  onClick={() => {
                    onDesignateStaff(user.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#334155]"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-[#2563eb]" />
                    Designate as Staff
                  </div>
                </button>
                <button
                  onClick={() => {
                    onAppointPresident(user.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#334155]"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <Crown className="mr-2 h-4 w-4 text-[#6d28d9]" />
                    Appoint as President
                  </div>
                </button>
              </>
            )}

            {user.role === "member" && (
              <>
                <button
                  onClick={() => {
                    onDesignateStaff(user.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#334155]"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-[#2563eb]" />
                    Designate as Staff
                  </div>
                </button>
                <button
                  onClick={() => {
                    onAppointPresident(user.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#334155]"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <Crown className="mr-2 h-4 w-4 text-[#6d28d9]" />
                    Appoint as President
                  </div>
                </button>
              </>
            )}

            {user.role === "staff" && (
              <button
                onClick={() => {
                  onAppointPresident(user.id);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#334155]"
                role="menuitem"
              >
                <div className="flex items-center">
                  <Crown className="mr-2 h-4 w-4 text-[#6d28d9]" />
                  Appoint as President
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
