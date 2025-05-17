import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExecutiveMember } from "@/types/members";
import { useCurrentClub } from "@/hooks/club";

export default function NextClubVoting({
  memberCap,
}: {
  memberCap: ExecutiveMember;
}) {
  const [roles, setRoles] = useState({
    president: false,
    vpresident: false,
    treasurer: false,
  });

  const allDone = Object.values(roles).every(Boolean);

  const { finalizeCurrentClass } = useCurrentClub();

  const toggleRole = (key: keyof typeof roles) => {
    setRoles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-6">
      <h2 className="text-2xl font-bold">Next Club Voting</h2>

      <div className="flex gap-10 items-center h-20">
        {/* 왼쪽: 배터리 버튼 */}
        <div className="">
          <Button
            onClick={() => {
              finalizeCurrentClass({ cap: memberCap });
            }}
            size={"lg"}
            disabled={memberCap.member_type !== "President"}
            className={`${
              roles.president
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-900 text-white hover:bg-gray-800"
            } rounded-l-full border-l-2 border-y-2 cursor-pointer`}
          >
            President
          </Button>
          <Button
            onClick={() => toggleRole("vpresident")}
            size={"lg"}
            disabled={memberCap.member_type !== "VicePresident"}
            className={`${
              roles.vpresident
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-900 text-white hover:bg-gray-800"
            } rounded-none border-y-2 cursor-pointer`}
          >
            V. President
          </Button>
          <Button
            onClick={() => toggleRole("treasurer")}
            size={"lg"}
            disabled={memberCap.member_type !== "Treasurer"}
            className={`${
              roles.treasurer
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-900 text-white hover:bg-gray-800"
            } rounded-r-full border-y-2 border-r-2 cursor-pointer`}
          >
            Treasurer
          </Button>
        </div>

        {/* 오른쪽: 화살표 버튼 */}
        {allDone && (
          <button
            onClick={() => {
              console.log("Arrow Clicked!");
            }}
            className="w-14 h-14 bg-white z-10 cursor-pointer active:bg-gray-300 focus:outline-none"
            style={{
              clipPath:
                "polygon(0% 40%, 65% 40%, 65% 25%, 100% 50%, 65% 75%, 65% 60%, 0% 60%)",
              border: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}
