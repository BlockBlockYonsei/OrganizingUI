import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useExecutiveMemberTicket } from "@/hooks/tickets";

export default function ExecutiveMemberTicketPage() {
  const { tickets, sendBackExecutiveMemberTicket } = useExecutiveMemberTicket();

  return (
    <div>
      <div className="text-3xl font-bold">Executive Member Ticket</div>

      <br />

      {tickets ? (
        <div className="grid grid-cols-2">
          {tickets.map((ticket) => (
            <Card className="w-120 py-15">
              <CardContent className="flex justify-center items-center flex-col space-y-10">
                <div>
                  <div className="flex justify-center items-center gap-4">
                    <span className="text-2xl">Invited as </span>
                    <span className="p-2 text-2xl border-2 rounded-md text-center">
                      {`Blockblock ${ticket.member_type}`}
                    </span>
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
