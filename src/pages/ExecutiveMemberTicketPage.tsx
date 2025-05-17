import WalletButton from "@/components/layout/WalletButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useExecutiveMemberTicket } from "@/hooks/tickets";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function ExecutiveMemberTicketPage() {
  const { tickets, sendBackExecutiveMemberTicket } = useExecutiveMemberTicket();
  const account = useCurrentAccount();

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
                    sendBackExecutiveMemberTicket({ ticket });
                  }}
                  className="text-2xl border-2 rounded-md py-5 active:bg-gray-700 cursor-pointer"
                >
                  Accept
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
