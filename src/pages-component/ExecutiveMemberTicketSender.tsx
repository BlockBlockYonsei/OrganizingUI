import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExecutiveMemberType } from "@/types/executive-member";
import { usePresident } from "@/hooks/president";
export default function ExecutiveMemberTicketSender() {
  const [memberAddress, setMemberAddress] = useState<Record<string, string>>(
    {}
  );
  const accout = useCurrentAccount();

  const { sendExecutiveMemberTicket } = usePresident({
    owner: accout ? accout.address : "",
  });
  return (
    <div>
      <h2 className="text-xl mb-5">운영진 티켓 전송</h2>
      {(
        [
          "VicePresident",
          "Treasurer",
          "PlanningTeamLeader",
          "PlanningTeamMember",
          "MarketingTeamLeader",
          "MarketingTeamMember",
        ] as ExecutiveMemberType[]
      ).map((member) => (
        <div>
          <h2>{member}</h2>
          <div className="grid grid-cols-6">
            <Input
              value={memberAddress[member]}
              onChange={(e) => {
                setMemberAddress((prev) => ({
                  ...prev,
                  [member]: e.target.value,
                }));
              }}
              className="col-span-4"
              placeholder={member}
            />
            <Button
              onClick={() => {
                sendExecutiveMemberTicket({
                  recipient: memberAddress[member],
                  excutiveMemberType: member,
                });
                setMemberAddress((prev) => ({
                  ...prev,
                  [member]: "",
                }));
              }}
              className="col-span-1 cursor-pointer"
            >
              Send
            </Button>
            <Button className="col-span-1 cursor-pointer">Confirm</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
