import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExecutiveMemberType } from "@/types/members";
import { usePresident } from "@/hooks/president";
import { useExecutiveMemberTicket } from "@/hooks/tickets";
export default function ExecutiveMemberInvitation() {
  const [memberAddress, setMemberAddress] = useState<Record<string, string>>(
    {}
  );
  const accout = useCurrentAccount();

  const { inviteExecutiveMember, confirmExecutiveMemberTicket } = usePresident({
    owner: accout ? accout.address : "",
  });
  const { tickets } = useExecutiveMemberTicket();
  return (
    <div>
      <h2 className="text-2xl font-bold">Executive Member Invitation</h2>

      <br />

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
          <h2>{member} Ticket</h2>
          <div className="grid grid-cols-8 gap-4">
            <Input
              value={memberAddress[member]}
              onChange={(e) => {
                setMemberAddress((prev) => ({
                  ...prev,
                  [member]: e.target.value,
                }));
              }}
              className="col-span-4"
              placeholder={`${member} Address`}
            />
            <Button
              onClick={() => {
                inviteExecutiveMember({
                  recipient: memberAddress[member],
                  excutiveMemberType: member,
                });
                setMemberAddress((prev) => ({
                  ...prev,
                  [member]: "",
                }));
              }}
              className="col-span-1 cursor-pointer border-2 rounded-md active:bg-gray-300"
            >
              Send
            </Button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {tickets &&
              tickets
                .filter(
                  (ticket) =>
                    ticket.member_address !== null &&
                    (ticket.member_type as ExecutiveMemberType) === member
                )
                .map((ticket) => (
                  <Button
                    onClick={() => {
                      confirmExecutiveMemberTicket({
                        ticket,
                      });
                    }}
                    className="col-span-1 cursor-pointer border-2 rounded-md active:bg-gray-300 truncate "
                  >
                    Confirm {ticket.member_address?.slice(0, 10)}...
                  </Button>
                ))}
          </div>
        </div>
      ))}
    </div>
  );
}
