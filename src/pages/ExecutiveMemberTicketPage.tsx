import WalletButton from "@/components/layout/WalletButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useExecutiveMemberTicket } from "@/hooks/tickets";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";

export default function ExecutiveMemberTicketPage() {
  const { tickets, sendBackExecutiveMemberTicket, sendBackPresidentTicket } =
    useExecutiveMemberTicket();
  const account = useCurrentAccount();

  useEffect(() => {
    console.log("myticket", tickets);
  }, [tickets]);

  if (!account)
    return (
      <div className="w-45">
        <p>Please Connect Wallet</p>
        <WalletButton />
      </div>
    );

  return (
    <div>
      <div className="text-3xl font-bold">Executive Member Ticket</div>

      <br />

      {tickets && tickets.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 min-w-200 w-full">
          {tickets.map((ticket) => (
            <Card className="col-span-1 py-15">
              <CardContent className="flex justify-center items-center flex-col space-y-10">
                <div>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-2xl">Invited as </div>
                    <div className="p-2 text-2xl border-2 rounded-md text-center">
                      <p>BlockBlock</p>
                      <p>{ticket.member_type}</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    if (ticket.member_type === "President") {
                      sendBackPresidentTicket({ ticket });
                    } else {
                      sendBackExecutiveMemberTicket({ ticket });
                    }
                  }}
                  className={`text-2xl border-2 rounded-md py-5 active:bg-gray-700  ${
                    ticket.member_address
                      ? "pointer-events-none border-red-300"
                      : "cursor-pointer"
                  }`}
                >
                  {ticket.member_address ? "Sent Back" : "Accept"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="w-120 py-15">
          <CardContent className="flex justify-center items-center flex-col space-y-10">
            You're not invited yet
          </CardContent>
        </Card>
      )}
    </div>
  );
}
