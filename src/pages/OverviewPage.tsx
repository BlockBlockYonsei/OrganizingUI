import WalletButton from "@/components/layout/WalletButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useClubRecruiting, useCurrentClass } from "@/hooks/club";
import { useGetMemberCap } from "@/hooks/members";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function OverviewPage() {
  const account = useCurrentAccount();
  const { currentClass } = useCurrentClass();
  const { currentClassMemberCap } = useGetMemberCap({
    owner: account ? account.address : "",
  });
  const { applyToJoinClub } = useClubRecruiting();

  return (
    <div>
      {currentClass && (
        <Card className="w-150">
          <CardHeader>
            <CardTitle>
              Current Blockblock Class: {currentClass.class}
            </CardTitle>
            <CardDescription className="truncate">
              ID: {currentClass.id}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 rounded-md p-2">
              <CardTitle>Blockblock Members: </CardTitle>
              {currentClass.members.map((member) => (
                <CardDescription className="truncate">{member}</CardDescription>
              ))}
            </div>
            <div className="border-2 rounded-md p-2">
              {currentClass.recruitment ? (
                <div>
                  <CardTitle>Recruitment: Registration Open</CardTitle>
                  <h3>Applicant Addresses: </h3>
                  {currentClass.recruitment.addresses.map((address) => (
                    <CardDescription>{address}</CardDescription>
                  ))}
                </div>
              ) : (
                <CardTitle>Recruitment: Registration Closed</CardTitle>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      <br />

      {account && currentClass ? (
        currentClassMemberCap ? (
          <div>You're Already Blockblock Member</div>
        ) : currentClass.recruitment ? (
          <div className="">
            <div>Blockblock is recruiting now</div>
            <Button
              size={"lg"}
              className="w-45 border-2 cursor-pointer active:bg-gray-300"
              onClick={() => {
                applyToJoinClub();
              }}
            >
              Apply To Join
            </Button>
          </div>
        ) : (
          <div>Blockblock is not recruiting now</div>
        )
      ) : (
        <div className="w-45">
          <WalletButton />
        </div>
      )}

      <br />
      <Button
        size={"lg"}
        className="p-2 border-2 cursor-pointer active:bg-gray-300"
        onClick={() => {
          applyToJoinClub();
        }}
      >
        Apply To Join(Testing Button)
      </Button>
    </div>
  );
}
