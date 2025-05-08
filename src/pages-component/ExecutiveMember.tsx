import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePresident } from "@/hooks/president";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useState } from "react";

export default function ExecutiveMember() {
  const [vice, setVice] = useState("");
  const [treasurer, setTreasurer] = useState("");

  const accout = useCurrentAccount();

  const { sendExecutiveMemberTicket } = usePresident({
    owner: accout ? accout.address : "",
  });

  return (
    <div>
      <div>
        <h2>VicePresident</h2>
        <div className="grid grid-cols-6">
          <Input
            value={vice}
            onChange={(e) => {
              setVice(e.target.value);
            }}
            className="col-span-4"
            placeholder="VicePresident"
          />
          <Button
            onClick={() => {
              sendExecutiveMemberTicket({
                recipient: vice,
                excutiveMemberType: "VicePresident",
              });
            }}
            className="col-span-1 cursor-pointer"
          >
            Send
          </Button>
          <Button className="col-span-1 cursor-pointer">Confirm</Button>
        </div>
      </div>
      <div>
        <h2>Treasurer</h2>
        <div className="grid grid-cols-6">
          <Input
            value={treasurer}
            onChange={(e) => {
              setTreasurer(e.target.value);
            }}
            className="col-span-4"
            placeholder="Treasurer"
          />
          <Button className="col-span-1 cursor-pointer">Send</Button>
          <Button className="col-span-1 cursor-pointer">Confirm</Button>
        </div>
      </div>
    </div>
  );
}
