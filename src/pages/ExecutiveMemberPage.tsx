import CurrentClubRecruiting from "@/pages-component/CurrentClubRecruiting";
import NextClubVoting from "@/pages-component/NextClubVoting";
import ExecutiveMemberInvitation from "@/pages-component/ExecutiveMemberInvitation";
import { useGetExecutiveMemberCap } from "@/hooks/member-caps";
import { useCurrentAccount } from "@mysten/dapp-kit";
import PresidentInvitation from "@/pages-component/PresidentInvitation";
import WalletButton from "@/components/layout/WalletButton";

export default function ExecutiveMemberPage() {
  const account = useCurrentAccount();
  const { caps } = useGetExecutiveMemberCap({
    owner: account ? account.address : "",
  });

  if (!account)
    return (
      <div className="w-45">
        <p>Please Connect Wallet</p>
        <WalletButton />
      </div>
    );

  return (
    <section>
      {caps &&
        caps.map((cap) => (
          <div>
            <h1 className="text-3xl font-bold text-white">
              운영진 페이지 {`(${cap ? cap.member_type : "Loading..."})`}
            </h1>

            <hr className="my-2" />
            <br />

            {cap && cap.member_type === "President" && (
              <div>
                <ExecutiveMemberInvitation />
                <br />
                <CurrentClubRecruiting />
                <br />
                <NextClubVoting memberCap={cap} />
                <br />
                <PresidentInvitation />
              </div>
            )}

            {cap &&
              ["VicePresident", "Treasurer"].includes(cap.member_type) && (
                <NextClubVoting memberCap={cap} />
              )}
            <br />
          </div>
        ))}
    </section>
  );
}
