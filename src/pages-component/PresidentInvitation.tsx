import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePresident } from "@/hooks/president";
export default function PresidentInvitation() {
  const [memberAddress, setMemberAddress] = useState<string>("");
  const { appointPresident } = usePresident();

  return (
    <div>
      <h2 className="text-2xl font-bold">President Invitation</h2>

      <br />

      <div>
        <h2>President Ticket</h2>
        <div className="grid grid-cols-7 gap-4">
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
          <Button className="col-span-1 cursor-pointer border-2 rounded-md active:bg-gray-300">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
