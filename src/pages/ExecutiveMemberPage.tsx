import { usePresident } from "@/hooks/president";
import NextRecuritingClass from "@/pages-component/NextRecuritingClass";
import NextClubClass from "@/pages-component/NextClubClass";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { useCurrentAccount } from "@mysten/dapp-kit";

export default function ExecutiveMemberPage() {
  const account = useCurrentAccount();
  const [vice, setVice] = useState("");
  const [treasurer, setTreasurer] = useState("");

  const accout = useCurrentAccount();

  const { sendExecutiveMemberTicket } = usePresident({
    owner: accout ? accout.address : "",
  });
  return (
    <section className="p-12">
      <h2 className="text-3xl font-bold mb-10 text-white">President Page</h2>
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

      <NextClubClass></NextClubClass>
    </section>
  );
}
