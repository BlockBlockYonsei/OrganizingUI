import WalletButton from "@/components/layout/WalletButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCurrentClub } from "@/hooks/club";
import { useGetMemberCap } from "@/hooks/member-caps";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function OverviewPage() {
  const account = useCurrentAccount();
  const { currentClub, applyToJoinClub } = useCurrentClub();
  const { currentMemberCap } = useGetMemberCap({
    owner: account ? account.address : "",
  });

  return (
    <div>
      {currentClub && (
        <Card className="w-150">
          <CardHeader>
            <CardTitle>Current Blockblock Class: {currentClub.class}</CardTitle>
            <CardDescription className="truncate">
              ID: {currentClub.id}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 rounded-md p-2">
              <CardTitle>Blockblock Executive Members: </CardTitle>
              {currentClub.executive_members.map((member) => (
                <CardDescription className="truncate">
                  {member.member_type}: {member.address}
                </CardDescription>
              ))}
            </div>
            <div className="border-2 rounded-md p-2">
              <CardTitle>Blockblock Members: </CardTitle>
              {currentClub.members.map((member) => (
                <CardDescription className="truncate">{member}</CardDescription>
              ))}
            </div>
            <div className="border-2 rounded-md p-2">
              {currentClub.recruitment ? (
                <div>
                  <CardTitle>Recruitment: Registration Open</CardTitle>
                  <h3>Applicant Addresses: </h3>
                  {currentClub.recruitment.addresses.map((address) => (
                    <CardDescription>{address}</CardDescription>
                  ))}
                </div>
              ) : (
                <CardTitle>Recruitment: Registration Closed</CardTitle>
              )}
            </div>
            <div className="border-2 rounded-md p-2">
              {
                <div>
                  <CardTitle>Is Current Club Finalized?</CardTitle>
                  {Object.entries(currentClub.is_finalized).map(
                    ([type, isDone]) => (
                      <CardDescription>
                        {type}: {isDone ? "Finalized Done" : "Not Yet"}
                      </CardDescription>
                    )
                  )}
                </div>
              }
            </div>
          </CardContent>
        </Card>
      )}
      <br />

      {account && currentClub ? (
        currentMemberCap ? (
          <div>You're Already Blockblock Member</div>
        ) : currentClub.recruitment ? (
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
          <p>Please Connect Wallet</p>
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
