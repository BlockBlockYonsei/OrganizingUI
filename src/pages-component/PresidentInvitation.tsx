import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePresident } from "@/hooks/president";
import { useExecutiveMemberTicket } from "@/hooks/tickets";
import { ExecutiveMemberType } from "@/types/members";
export default function PresidentInvitation() {
  const [memberAddress, setMemberAddress] = useState<string>("");

  const { appointPresident, confirmPresidentTicket } = usePresident();
  const { tickets } = useExecutiveMemberTicket();

  return (
    <div>
      <h2 className="text-2xl font-bold">President Invitation</h2>

      <br />

      <div>
        <h2>President Ticket</h2>
        <div className="grid grid-cols-8 gap-4">
          <Input
            value={memberAddress}
            onChange={(e) => {
              setMemberAddress(e.target.value);
            }}
            className="col-span-4"
            placeholder={`Next President Address`}
          />
          <Button
            onClick={() => {
              appointPresident({ recipient: memberAddress });
              setMemberAddress("");
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
                  (ticket.member_type as ExecutiveMemberType) ===
                    ("President" as ExecutiveMemberType)
              )
              .map((ticket) => (
                <Button
                  onClick={() => {
                    confirmPresidentTicket({
                      ticket,
                    });
                  }}
                  className="col-span-2 cursor-pointer border-2 rounded-md active:bg-gray-300 truncate "
                >
                  Confirm {ticket.member_address?.slice(0, 30)}...
                </Button>
              ))}
        </div>
      </div>
    </div>
  );
}
