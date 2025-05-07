import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function NextClubClass(){
    const [roles, setRoles] = useState({
        president: false,
        vpresident: false,
        treasurer: false,
      });
    
      const allDone = Object.values(roles).every(Boolean);
    
      const toggleRole = (key: keyof typeof roles) => {
        setRoles((prev) => ({ ...prev, [key]: !prev[key] }));
      };
    
      const handleArrowClick = () => {
        console.log("화살표 클릭됨");
      };
    
    return(<div>
        <Card className="relative flex flex-row justify-between items-center p-10 border border-border rounded-3xl shadow-2xl bg-background min-h-[200px]">
        {/* 왼쪽: 배터리 버튼 */}
        <div className="flex items-center overflow-hidden rounded-full border-2 border-white bg-gray-900">
          <RoleButton
            label="President"
            active={roles.president}
            onClick={() => toggleRole("president")}
            className="rounded-l-full"
          />
          <RoleButton
            label="V. President"
            active={roles.vpresident}
            onClick={() => toggleRole("vpresident")}
            className="rounded-none"
          />
          <RoleButton
            label="Treasurer"
            active={roles.treasurer}
            onClick={() => toggleRole("treasurer")}
            className="rounded-r-full"
          />
        </div>

        {/* 오른쪽: 화살표 버튼 */}
        {allDone && (
          <button
            onClick={handleArrowClick}
            className="w-14 h-14 bg-white z-10 ml-[-16px] focus:outline-none"
            style={{
              clipPath: 'polygon(0% 40%, 65% 40%, 65% 25%, 100% 50%, 65% 75%, 65% 60%, 0% 60%)',
              border: 'none'
            }}
          />
        )}
      </Card>


    </div>)
}

function RoleButton({
    label,
    active,
    onClick,
    className = ""
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
    className?: string;
  }) {
    return (
      <button
        onClick={onClick}
        className={`px-8 py-5 text-lg font-semibold tracking-wide focus:outline-none border-none ${
          active ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-900 text-white hover:bg-gray-800"
        } ${className}`}
        style={{
          margin: 0,
          boxShadow: "none",
          border: "none",
        }}
      >
        {label}
      </button>
    );
  }


